
# 🛒 React E-Commerce App

A full client-side E-Commerce web app built with React JS and Supabase as the backend.

## 🚀 Features

### 1. Home Page & Components
- Clean, modern UI built with separate React components
- Animated slider component - products slide left to right automatically
- Hero section component with featured products
- Individual component for product showcase section

### 2. Authentication & Access Control
- Supabase Auth integration
- If user is not logged in and clicks "Shop", they are redirected to the Login page
- Once logged in, user cannot access the Login page again
- After login, Logout button appears with user's email

### 3. Product Browsing
- All products are displayed on the Shop page after login
- Click any product to view details
- Add to Cart functionality with live cart count badge

### 4. Cart Management
- Add to Cart increases item count
- Cart page has full management:
    - Increase quantity
    - Decrease quantity  
    - Delete item
- Real-time billing calculation
- If not logged in and user clicks Add to Cart, they are redirected to Login

### 5. Checkout & Payment
- Checkout page with auto-filled Name & Email from logged-in user
- User only needs to enter Phone Number and Address
- Fake Payment Method: QR Code is displayed
- User completes payment via QR, takes screenshot and sends it for verification

### 6. Order History
- Dedicated "My Orders" component
- If no orders exist, shows: "You have no orders yet"
- After placing an order, only that user's ordered products are displayed
- If not logged in and user visits Orders page, redirected to Login

## 🛠️ Tech Stack
- **Frontend**: React JS
- **Backend**: Supabase - Database + Authentication + Storage
- **Styling**: CSS

## 📦 How to Run Locally
1. Clone the repo
2. `npm install`
3. Add your Supabase URL & Anon Key in `.env`
4. `npm start`

## 📝 Note
Payment is currently manual via QR Code. This is a demo/fake payment system for testing purposes only.

