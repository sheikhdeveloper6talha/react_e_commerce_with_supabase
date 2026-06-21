import { useContext, useEffect, useState } from "react";
import "./AddCart.css";
import { userContext } from "../contextApi/Context";
import {connectSupabase} from '../supabase/supabase'
import Loader from "../loader/Loader";
import PaymentCard from "../Payment/PaymentCard";
const CartDrawer = () => {
    let {OpendCart , DobaraChala , setDobaraChala , SendProduct , setSendProduct , order , GoToLogin} = useContext(userContext)
    let [Loaders , setLoaders]  = useState(true)
    let [OrderCompo , setOrderCompo]  = useState(false)
    let [CurruentUsers , setCurruentUsers]  = useState(null)
    
    // loader start 
    
    let AddQty = SendProduct.map(e => ({
      ...e,
      qty : e.qty || 1
    }))
    let [RenderCart , setRenderCart]  = useState(AddQty)
    
    
useEffect(() => {
  const timer = setTimeout(() => setLoaders(false), 2000)
  return () => clearTimeout(timer)
}, [])
    const getCurrentUser = async () => {
       try {
         const {
           data: { user }
         } = await connectSupabase.auth.getUser();
setCurruentUsers(user)
       } catch (error) {
         console.log(error);
       }
     };
   
     useEffect(() => {
       getCurrentUser();
     }, [RenderCart]);
   
const DeleteCart = (id)=>{
console.log(id);
let Dete = RenderCart.filter((e)=>e.id !== id)
setRenderCart( Dete)
setSendProduct( Dete)
}

const Increases = (id) => {
  let updatedCart = RenderCart.map(val => {
  if (val.id === id) {
    
    if (val.qty >= val.stock) {
      alert("Stock khatam ho gaya");
    } 

    return {
      ...val,
      qty: val.qty < val.stock ? (val.qty || 0) + 1 : val.stock
    };
  }

  return val;
});
  
  
  setRenderCart( updatedCart)
}
const Decrease = (id , qty) => {
  let updatedCart = RenderCart.map(val => 
    val.id === id 
      ? { ...val, qty: Math.max((val.qty || 0)-1 , 1)} // qty 1 barhao
      : val // baqi items same
  )
  
  
  setRenderCart(updatedCart)
}


   if(CurruentUsers){

    
    
  return (
    <div className="cart-drawer" style={{paddingBottom : window.innerHeight+`px`}}>
      <div className="cart-header">
        <h2>
          CART <span>{RenderCart.length}</span>
        </h2>
        <button className="close-btn" style={{color: 'black'}} onClick={()=> OpendCart()}>✕</button>
      </div>
{RenderCart.map((valueProduct)=>{
  
return(
     <div className="cart-item">
        <img
          src={valueProduct.image_url}
          alt="product"
        />

        <div className="cart-item-info">
          <h3>{valueProduct.name}</h3>
          <p>{valueProduct.type}</p>
          <p>Size : {valueProduct.sizes}</p>
          <p className="discount">20% off</p>

          <div className="price-box">
            <span className="current-price">
              {valueProduct.price   }
            </span>

            <span className="old-price">
              Rs.5,290.00
            </span>
          </div>

          <div className="quantity-box">
            <button onClick={()=> Decrease(valueProduct.id , valueProduct.qty)}>-</button>
            <span>{valueProduct.qty}</span>
            <button onClick={()=> Increases(valueProduct.id , valueProduct.qty)}>+</button>
          </div>
        </div>

        <div className="item-right">
          <p>{(valueProduct.price* valueProduct.qty).toLocaleString()}</p>
          <button className="delete-btn" onClick={()=> DeleteCart(valueProduct.id)}>🗑</button>
        </div>
      </div>
)
})}
   

      <div className="cart-summary">
        {SendProduct.length > 0 && <div className="summary-row">
          <span>Delivery Charges</span>
          <span>Rs300.00</span>
        </div>}
{SendProduct.length > 0 &&
        <div className="summary-row total">
          <span>Estimated total</span>
<span>{RenderCart.reduce((totleEsti, item) => {
  return totleEsti + Number(item.price) * item.qty
},0).toLocaleString()}</span>    
      </div>}

        <p className="tax-note">
          Taxes and shipping calculated at checkout.
        </p>
        
{SendProduct.length > 0 &&
        <div className="summary-row total">
          <span>Grand total</span>
<span>{RenderCart.reduce((total, item) => {
  return total + Number(item.price) * item.qty
}, 300).toLocaleString()}</span>    
      </div>}

{SendProduct.length > 0  ?   <button className="checkout-btn" onClick={()=> {order(RenderCart) ; setOrderCompo(true) } }>CHECKOUT
        </button>  :  <button className="checkout-btn" onClick={()=> OpendCart()}>
          Continue Shop
        </button>}

      {OrderCompo &&    <userContext.Provider value={{setOrderCompo , RenderCart , setRenderCart , setSendProduct , OpendCart}}> <PaymentCard/></userContext.Provider>}
      </div>
    </div>

  )}else{

  

  return(
    <div className="cart-drawer">
      <div className="cart-header">
       
        <button className="close-btn" style={{color: 'black'}} onClick={()=> OpendCart()}>✕</button>
      </div>

      <div className="cart-item set">
        

        <p className="tax-note">
Your cart is empty
Have an account? Log in to check out faster.
        </p>

        <button className="checkout-btn" onClick={()=> {GoToLogin() ; OpendCart()}}>
          Login 
        </button>
      </div>

    </div>
  
)}
   
};


export default CartDrawer;