import { connectSupabase } from "../../../commponents/supabase/supabase"
// UsersHit Api call
const UsersHit = async ()=>{
    try{
        const {data , error} = await connectSupabase
        .from('UsersIfo')
        .select()
        if(error) return alert(error.message)
            return data
    }catch(errors){
        alert(errors)
        
    }

}

// end UsersHit Api 
// product Hit Call 

const ProductHit = async ()=>{
    try{

        const {data , error} = await connectSupabase
        .from('ProductitemsAdd')
        .select()
        if(error) return alert(error.message)
        return data
    }catch(error){
        alert(error.message)
        
    }
}
// end product end
const OrderHit = async ()=>{
    try{

        const {data , error} = await connectSupabase
        .from('orderItems')
        .select()
        if(error) return alert(error.message)
        return data
    }catch(error){
        alert(error.message)
        
    }
}
const Orderdetails = async ()=>{
    try{

        const {data , error} = await connectSupabase
        .from('Order')
        .select()
        if(error) return alert(error.message)
        return data
    }catch(error){
        alert(error.message)
        
    }
}
const OrderPlace = async (id) => {
  try {
    console.log(id);
    if(!id) return alert('msg');
    const { data, error } = await connectSupabase
      .from("orderItems")
      .update({ status: "place" })
      .eq("id", Number(id))
      .select();

    if (error) return alert(error.message);

    return data;

  } catch (error) {
    alert(error.message);
  }
};
export {
    UsersHit,
    ProductHit,
    OrderHit,
    Orderdetails,
    OrderPlace,

} 

