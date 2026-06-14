import React, { useContext, useEffect, useState } from 'react';
import './ShalwarKameez.css';
import { userContext } from '../contextApi/Context';
import Loader from '../loader/Loader';
import Popup from '../poup/Poup';
import initialProducts from '../ProductsItems/ProductsItems';
import OrderCard from '../OrderCard/OrderCard';
const ShalwarKameezCatalog = () => {
  let {getIndexData , checkCondition} = useContext(userContext)

  // Traditional Ethnic Dataset
  let [loader , setLoader] = useState(true)
  let [Open , setOpen] = useState(false)
  let [sendProducts , setsendProducts] = useState('')

   
  

useEffect(()=>{
  setTimeout(() => {
      setLoader(false)
    }, 2000);
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
  console.log(reciveProducts);
  
  setsendProducts(reciveProducts)
  setOpen(true)
window.scrollTo({
  top : 0,
  behavior : 'smooth'
})  
}

if(!loader){
if(checkCondition === 'Order') return <OrderCard/>
  return (
    <div className="catalog-container">
   {Open &&
      <userContext.Provider value={{sendProducts  , setOpen , getIndexData}}>
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
                <img src={product.image} alt={product.name} className="item-img" />
                <span className="type-badge">{product.type}</span>
              </div>
              <div className="item-details">
                <span className="item-tag">{product.category}’s Collection</span>
                <h3 className="item-title">{product.name}</h3>
                <div className="price-row">
                  <p className="item-price">{product.price}</p>
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