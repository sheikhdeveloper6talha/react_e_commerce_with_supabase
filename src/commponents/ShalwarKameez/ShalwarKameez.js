import React, { useContext, useEffect, useState } from 'react';
import './ShalwarKameez.css';
import { userContext } from '../contextApi/Context';
import Loader from '../loader/Loader';
import Popup from '../poup/Poup';
import getData from '../ProductsItems/ProductsItems';
import OrderCard from '../OrderCard/OrderCard';
import { connectSupabase } from '../supabase/supabase';
const ShalwarKameezCatalog = () => {
  let {getIndexData , checkCondition , 
    SendProduct , ReFreshProducts ,
   openPopup , ClosePopup , Open}  =
     useContext(userContext)


  // Traditional Ethnic Dataset
  let [loader , setLoader] = useState(true)
 
  let [sendProducts , setsendProducts] = useState('')
  let [initialProducts , setInitialProducts] = useState([])

   
  const fetchData = async () => {
    let data = await getData()
    setInitialProducts(data || [])
    setLoader(false)
  }  
useEffect(()=>{
fetchData()
 const channel = connectSupabase
    .channel('admin-orders-realtime')
    .on(
      'postgres_changes',
      { 
        event: '*',       
        schema: 'public', 
        table: 'ProductitemsAdd'  
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setInitialProducts(prev => [payload.new, ...prev])
        }
        if (payload.eventType === 'DELETE') {
          setInitialProducts(prev => prev.filter(order => order.id !== payload.old.id))
        }
        if (payload.eventType === 'UPDATE') {
          setInitialProducts(prev => prev.map(order => order.id === payload.new.id ? payload.new : order))
        }
      }
    )
    .subscribe()

  return () => connectSupabase.removeChannel(channel)

},[])
useEffect(()=>{
  fetchData()

},[ReFreshProducts])
useEffect(()=>{
  return ClosePopup()
},[])
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pipeline: Checks search query AND category tabs
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase());
    


    return matchesSearch 
  });

const opendModleHandlar = (reciveProducts)=>{
  
  setsendProducts(reciveProducts)
  
window.scrollTo({
  top : 0,
  behavior : 'smooth'
})
openPopup()  


}

if(!loader){
if(checkCondition === 'Order') return <OrderCard/>
  return (
    <div className="catalog-container">
   {Open &&
      <userContext.Provider value={{sendProducts  , 
       getIndexData , SendProduct,
         ClosePopup , ReFreshProducts }}>
       <Popup/>
       </userContext.Provider>
   }
      <header className="catalog-header">
        <h2>Traditionals {checkCondition} Collection</h2>
        <p>Explore luxury unstitched fabrics and premium ready-to-wear designs</p>
      </header>
      
      {/* Search and Navigation Bar Area */}
      <div className="filter-wrapper">
      
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by fabric, style, or type (e.g., Unstitched)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="catalog-search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length > 0 ? (
        <div className="items-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="item-card" onClick={()=>  opendModleHandlar(product)}>
              <div className="image-frame">
                <img src={product.image_url} alt={product.name} className="item-img" />
                <span className="type-badge">{product.type}</span>
                <br/>
                <span className="type-badge1">{`${product.stock < 1 ? `SOLD OUT` : `Stock ${product.stock}`}`}</span>
              </div>
              <div className="item-details">
                <span className="item-tag">{product.category}’s Collection</span>
                <h3 className="item-title">{product.name}</h3>
                <div className="price-row">
                  <p className="item-price">PKR : {product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No Items Match Your Search</h3>
          <p>Try resetting your category filters or looking up another fabric variant.</p>
        </div>
      )}
    </div>
  )
  }else{
    return(
      <Loader/>
    )
  }
};

export default ShalwarKameezCatalog;