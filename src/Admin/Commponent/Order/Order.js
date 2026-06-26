import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { OrderHit } from '../ApiCaling/Users';
import Loader from '../loader/Loader';
import { userContext } from '../../../commponents/contextApi/Context';
import { connectSupabase } from '../../../commponents/supabase/supabase';
const OrdersClient = () => {
  // Dummy Data for Orders
  const {ReFreshProducts} = useContext(userContext)
  const [orders , setOrders] = useState([]);
  const [Loading , setLoading] = useState(true);

  const getOrderData = async ()=>{
  let OrderData = await OrderHit()
if(!OrderData) return alert('Kuch Msala Hai developer kon call karo')
  setOrders(OrderData)
setLoading(false)
}

  useEffect( ()=>{
getOrderData()

 const channel = connectSupabase
    .channel('admin-orders-realtime')
    .on(
      'postgres_changes',
      { 
        event: '*',        // 👈 INSERT, UPDATE, DELETE sab ek saath
        schema: 'public', 
        table: 'orderItems'  
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders(prev => [payload.new, ...prev])
        }
        if (payload.eventType === 'DELETE') {
          setOrders(prev => prev.filter(order => order.id !== payload.old.id))
        }
        if (payload.eventType === 'UPDATE') {
          setOrders(prev => prev.map(order => order.id === payload.new.id ? payload.new : order))
        }
      }
    )
    .subscribe()

  return () => connectSupabase.removeChannel(channel)
},[])
useEffect(()=>{
getOrderData()
},[ReFreshProducts])

if(Loading) return <Loader/>
  return (
    <div className="orders-page">
      {/* Top Header Controls */}
      <div className="orders-header">
        <h2>Manage Orders</h2>
        <div className="orders-actions">
          <input type="text" placeholder="Search orders..." className="search-input" />
          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Order ID</th>
              <th >Customer</th>
              <th>Size</th>
              <th>QTY</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className='images'><img src={order.image}/></td>
                <td className="order-id">{order.id}</td>
                <td className="name">{order.users}</td>
                <td>{order.size}</td>
                <td>{order.qty}</td>
                <td>{order.type}</td>
                <td>{new Date( order.created_at).toLocaleString()}</td>
                <td>
                  {/* Dynamic status classes */}
                  <span style={{color : 'green'}} className={`status-badge ${order.status || 'Padding' }`}>
                    {order.status || 'Padding'}
                  </span>
                </td>
                <td className="order-price">{order.price}</td>
                <td>
                  <button className="btn-view">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersClient;