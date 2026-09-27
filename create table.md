# Supabase SQL — SMLibas (all tables + RLS + storage)

Project ref: `ytksduvdebzjrrrdxycp`

Ye poora script **ek baar** Supabase → **SQL Editor** → **New query** → paste → **Run** karo.
Script idempotent hai, isliye dobara chalane se koi error nahi aayega.

## Tables jo is project me use ho rahi hain

| Table | Kaam | Code me kahan |
| --- | --- | --- |
| `public."UsersIfo"` | user profile + role | `SignUp.js`, `Login.js`, `navbar.js`, `CurrentUsres.js`, `PaymentCard.js` |
| `public."ProductitemsAdd"` | products catalog | `AddProducts.js`, `Products.js`, `ProductsItems.js`, `ShalwarKameez.js` |
| `public."Order"` | order header (1 per user) | `PaymentCard.js`, `OrderCard.js` |
| `public."orderItems"` | order line items | `PaymentCard.js`, `OrderCard.js`, `Admin/Order.js` |
| storage bucket `product-images` | product image upload | `AddProducts.js` |

> `"UsersIfo"` aur `"Order"` aur `"Adress"` — ye names code me isi tarah (capital letters) use hote hain,
> isliye SQL me inhe **double quotes** me likkna zaroori hai.

---

## 1. Helper function (admin check)

```sql
create or replace function public.is_admin_user(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public."UsersIfo" where id = uid and type = 'admin'
  );
$$;
```

`security definer` ki wajah se ye function RLS se nahi marega, isliye policies me use karne se
infinite recursion nahi hota.

---

## 2. Table: `UsersIfo`

```sql
create table if not exists public."UsersIfo" (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text,
  createAt    text,
  agreeTerms  boolean not null default false,
  type        text not null default 'user' check (type in ('user', 'admin')),
  created_at  timestamptz not null default now()
);
```

### Insert guard trigger

`SignUp.js` auth ke baad khud row insert karta hai. Ye trigger:

- duplicate insert ko **silently skip** kar deta hai (error nahi aata),
- `email` aur `name` ko `auth.users` se sync karta hai,
- `type` ko hamesha `'user'` set karta hai (koi apne aap ko admin nahi ban sakta),
- jiska `auth.users` me account hi nahi hai uska insert reject kar deta hai.

```sql
create or replace function public.users_ifo_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_name  text;
begin
  if exists (select 1 from public."UsersIfo" where id = new.id) then
    return null;
  end if;

  select u.email, coalesce(u.raw_user_meta_data ->> 'name', '')
    into v_email, v_name
  from auth.users u
  where u.id = new.id;

  if v_email is null then
    raise exception 'No auth.users row for id %', new.id;
  end if;

  new.email := v_email;
  new.name  := coalesce(nullif(new.name, ''), v_name);
  new.type  := 'user';
  return new;
end;
$$;

drop trigger if exists trg_users_ifo_guard on public."UsersIfo";
create trigger trg_users_ifo_guard
  before insert on public."UsersIfo"
  for each row execute function public.users_ifo_guard();
```

---

## 3. Table: `ProductitemsAdd`

`id` app khud banata hai (`Math.random`), isliye default nahi lagaya.

```sql
create table if not exists public."ProductitemsAdd" (
  id           integer primary key,
  name         text not null,
  type         text,
  description  text,
  price        numeric(10,2) not null default 0,
  stock        integer not null default 0,
  category     text,
  sizes        text,
  image_url    text,
  created_at   timestamptz not null default now()
);
```

---

## 4. Table: `Order`

`id` yahan `auth.users.id` hai aur primary key hai (code ek user ka ek hi order rakhta hai).

```sql
create table if not exists public."Order" (
  id            uuid primary key references auth.users(id) on delete cascade,
  "phoneNumber" text,
  "Adress"      text,
  status        boolean not null default false,
  total_amount  numeric(12,2) not null default 0,
  created_at    timestamptz not null default now()
);
```

---

## 5. Table: `orderItems`

```sql
create table if not exists public."orderItems" (
  id          integer primary key,
  uuid        uuid not null references auth.users(id) on delete cascade,
  name        text,
  users       text,
  type        text,
  price       numeric(12,2) not null default 0,
  image       text,
  qty         integer not null default 1,
  size        text,
  "itemID"    integer references public."ProductitemsAdd"(id) on delete set null,
  status      text not null default 'pending',
  created_at  timestamptz not null default now()
);

create index if not exists idx_orderitems_uuid    on public."orderItems" (uuid);
create index if not exists idx_orderitems_itemid  on public."orderItems" ("itemID");
create index if not exists idx_productitems_stock on public."ProductitemsAdd" (stock);
```

---

## 6. RLS enable + policies

> `UsersIfo` me insert anon ke liye bhi open hai (SignUp ke waqt email-confirmation off hone par
> session nahi hota). Safety trigger upar hai, jo `type` ko hamesha `'user'` par force karta hai.

```sql
alter table public."UsersIfo"        enable row level security;
alter table public."ProductitemsAdd" enable row level security;
alter table public."Order"           enable row level security;
alter table public."orderItems"      enable row level security;

-- ---------- UsersIfo ----------
drop policy if exists p_usersifo_select  on public."UsersIfo";
drop policy if exists p_usersifo_insert  on public."UsersIfo";
drop policy if exists p_usersifo_update  on public."UsersIfo";
drop policy if exists p_usersifo_delete  on public."UsersIfo";

create policy p_usersifo_select on public."UsersIfo"
  for select to anon, authenticated
  using (id = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_usersifo_insert on public."UsersIfo"
  for insert to anon, authenticated
  with check (true);   -- safety trigger id + type validate karta hai

create policy p_usersifo_update on public."UsersIfo"
  for update to authenticated
  using (id = auth.uid() or public.is_admin_user(auth.uid()))
  with check (id = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_usersifo_delete on public."UsersIfo"
  for delete to authenticated
  using (public.is_admin_user(auth.uid()));

-- ---------- ProductitemsAdd ----------
drop policy if exists p_products_select on public."ProductitemsAdd";
drop policy if exists p_products_insert on public."ProductitemsAdd";
drop policy if exists p_products_update on public."ProductitemsAdd";
drop policy if exists p_products_delete on public."ProductitemsAdd";

create policy p_products_select on public."ProductitemsAdd"
  for select to anon, authenticated using (true);

create policy p_products_insert on public."ProductitemsAdd"
  for insert to authenticated
  with check (public.is_admin_user(auth.uid()));

create policy p_products_update on public."ProductitemsAdd"
  for update to authenticated
  using (true)         
  with check (true);

create policy p_products_delete on public."ProductitemsAdd"
  for delete to authenticated
  using (public.is_admin_user(auth.uid()));

-- ---------- Order ----------
drop policy if exists p_order_select on public."Order";
drop policy if exists p_order_insert on public."Order";
drop policy if exists p_order_update on public."Order";
drop policy if exists p_order_delete on public."Order";

create policy p_order_select on public."Order"
  for select to authenticated
  using (id = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_order_insert on public."Order"
  for insert to authenticated
  with check (id = auth.uid());

create policy p_order_update on public."Order"
  for update to authenticated
  using (id = auth.uid() or public.is_admin_user(auth.uid()))
  with check (id = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_order_delete on public."Order"
  for delete to authenticated
  using (id = auth.uid() or public.is_admin_user(auth.uid()));

-- ---------- orderItems ----------
drop policy if exists p_orderitems_select on public."orderItems";
drop policy if exists p_orderitems_insert on public."orderItems";
drop policy if exists p_orderitems_update on public."orderItems";
drop policy if exists p_orderitems_delete on public."orderItems";

create policy p_orderitems_select on public."orderItems"
  for select to authenticated
  using (uuid = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_orderitems_insert on public."orderItems"
  for insert to authenticated
  with check (uuid = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_orderitems_update on public."orderItems"
  for update to authenticated
  using (uuid = auth.uid() or public.is_admin_user(auth.uid()))
  with check (uuid = auth.uid() or public.is_admin_user(auth.uid()));

create policy p_orderitems_delete on public."orderItems"
  for delete to authenticated
  using (uuid = auth.uid() or public.is_admin_user(auth.uid()));
```

---

## 7. Realtime (admin panels live update use karte hain)

`Admin/Products.js`, `Admin/Order.js` aur `Admin/Users.js` `postgres_changes` subscribe karte hain.

```sql
do $$
declare
  t text;
begin
  foreach t in array array['UsersIfo', 'ProductitemsAdd', 'Order', 'orderItems'] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
```

---

## 8. Storage bucket `product-images` (public)

`AddProducts.js` `getPublicUrl()` use karta hai, isliye bucket public hona zaroori hai.

```sql
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists p_productimages_read   on storage.objects;
drop policy if exists p_productimages_upload on storage.objects;
drop policy if exists p_productimages_delete on storage.objects;

create policy p_productimages_read on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-images');

create policy p_productimages_upload on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images');

create policy p_productimages_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.is_admin_user(auth.uid()));
```

---

## 9. Script ke baad ye 2 kaam karo (manual)

**a) Email confirmation off karo** — SignUp ke foran baad code `UsersIfo` me row insert karta hai,
isliye `auth.signUp()` ko session return karna chahiye:

`Authentication → Sign In / Providers → Email → Confirm Email = OFF`

(RLS insert policy session ke baghair bhi chalega, lekin admin tab tak login nahi kar payega
kyun ke `UsersIfo` select policy `auth.uid()` par depend karti hai. Isliye ye setting zaroori hai.)

**b) Admin user banao** — signup ke baad dashboard se chalayein:

```sql
update public."UsersIfo" set type = 'admin' where email = 'admin@gmail.com';
```

---

## Code me maujood masle (SQL se solve nahi hote)

1. `Order.id` primary key hai, isliye **ek user dobara order kar sake to insert fail** hoga
   (`PaymentCard.js:95`). Fix ke liye `id` ko `uuid default gen_random_uuid()` aur ek alag
   `user_id` column (auth uid) chahiye.
2. `ProductitemsAdd.id` aur `orderItems.id` app `Math.random()` se banata hai
   → duplicate id ka chance hai. DB se generate karwana behtar hai.
3. `Admin/Order.js` `orderItems.status` ko **text** dikhata hai, jabke `Order.status` **boolean**
   hai. `orderItems.status` default `'pending'` rakha gaya hai (UI me `pending` dikhega).
