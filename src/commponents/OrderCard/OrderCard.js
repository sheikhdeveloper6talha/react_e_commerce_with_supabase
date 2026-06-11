import React, { useState }  from 'react';
import { useEffect } from 'react';
import './OrderCard.css';
import { connectSupabase } from '../supabase/supabase';
import Loader from '../loader/Loader';
const OrderCard = () => {

const [CurrentOrderUsers , setCurrentOrderUsers] = useState([])
const [OrderDetails , setOrderDetails] = useState([])
const [loader , setloader] = useState(true)



  const getCurrentUser = async () => {
    try {
      const {
        data: { user }} = await connectSupabase.auth.getUser();

if(user){
  
    const { data, error } = await connectSupabase
  .from('Order')
  .select()
  .match({ id: user.id})
  console.log(data);
  setCurrentOrderUsers(data)
if(data){
    const { data, error } = await connectSupabase
  .from('orderItems')
  .select()
  .match({ uuid: user.id})
  console.log(data);
  setOrderDetails(data)
}
setloader(false)  

  
}


    } catch (error) {
      console.log(error);
    }

console.log('chala hai');
};

  useEffect(() => {
    getCurrentUser();
  }, []);

  let status = CurrentOrderUsers.map((items)=>{
   return items.status
    
  })

//   OrderCancelled function

const OrderCancelled =  async(id , uuid)=>{
    console.log(id);
    const response = await connectSupabase
  .from('orderItems')
  .delete()
  .eq('id', id)

  getCurrentUser()
if(OrderDetails.length === 1){
 const response = await connectSupabase
  .from('Order')
  .delete()
  .eq('id', uuid)

};

}
if (!loader) {
  if (OrderDetails.length > 0) {
    return (
      <div className='container'>
        {OrderDetails.map((items) => {
          return (
            <div className="order-card" key={items.id}>
              <div className="order-header">
                <span className="order-id">
                  Order {items.id || "181717"}
                </span>

                <span className="order-status">
                  {status ? "Padding" : "Develiderd"}
                </span>
              </div>

              <div className="order-body">
                <img
                  src={items.image}
                  alt={items.image}
                  className="product-image"
                />

                <div className="product-info">
                  <h3 className="product-name">{items.name}</h3>
                  <p className="product-qty">Quantity: {items.qty}</p>
                  <p className="product-date">
                    Ordered on: {items.created_at}
                  </p>
                </div>

                <div className="product-price">
                  <span className="price-label">Total</span>
                  <span className="price-value">{items.price}</span>
                </div>
              </div>

              <div className="order-footer">
                <button className="btn-track" onClick={()=> OrderCancelled(items.id , items.uuid)}>Order cancelled</button>
              </div>
            </div>
          );
        })}
<div className='Grand-totle'>
    <h1> Items Totle Price</h1>
    
<h2> PKR :{OrderDetails.reduce(
      (prev, current) =>
        prev + Number(current.price.slice(4).replace(/,/g, "")),
      0
    )
  }
</h2></div>

      </div>
    );
  } else {
    return (
      <div className="Not-order">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Order Not Yet</h1>
      </div>
    );
  }
} else {
  return <Loader />;
}
};

export default OrderCard;