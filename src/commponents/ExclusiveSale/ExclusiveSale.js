import React, { useContext, useEffect, useState } from 'react';
import './ExclusiveSale.css';
import { userContext } from '../contextApi/Context';
import Loader from '../loader/Loader';

const ExclusiveSale = () => {
  let {DobaraChala,setDobaraChala , getIndexData} = useContext(userContext)
  let [loader , setLoader] = useState(true)
    setTimeout(() => {
      setLoader(false)
    }, 2000);
  // Traditional Ethnic Dataset
  const initialProducts = [
    { id: 1, name: 'Classic White Cotton Shalwar Kameez', category: 'Men', type: 'Ready-to-Wear', price: 'PKR 4,500',
         image: 'https://i.pinimg.com/736x/6f/60/cc/6f60ccffc2c9c5a698efc7adb63c6b35.jpg' },
    { id: 2, name: 'Embroidered Lawn 3-Piece Suit', category: 'Women', type: 'Unstitched', price: 'PKR 6,800', 
        image: 'https://i.pinimg.com/1200x/a6/c8/9e/a6c89ece707eed136b7215e2adcfbd66.jpg' },
    { id: 3, name: 'Midnight Black Premium Wash & Wear', category: 'Men', type: 'Ready-to-Wear', price: 'PKR 5,200',
         image: 'https://i.pinimg.com/736x/d5/09/21/d509212dba97e331bc1c1e887af3a35f.jpg' },
    { id: 4, name: 'Floral Printed Linen Kurta Set', category: 'Women', type: 'Ready-to-Wear', price: 'PKR 3,900', 
        image: 'https://i.pinimg.com/736x/99/a8/7e/99a87e6832638849e4d472dae3cc2e86.jpg' },
    { id: 5, name: 'Royal Blue Silk Festivity Attire', category: 'Men', type: 'Unstitched', price: 'PKR 8,500',
         image: 'https://i.pinimg.com/736x/99/77/50/99775017c766a9652f1147c14c4f50d5.jpg' },
    { id: 6, name: 'Pastel Mint Schiffli Luxury Collection', category: 'Women', type: 'Unstitched', price: 'PKR 9,200',
         image: 'https://i.pinimg.com/736x/2a/eb/5b/2aeb5be80cf8b951c0333253cbc59f59.jpg' },
  ];
useEffect(()=>{

},[])
  const [searchQuery, setSearchQuery] = useState('');


  // Filter pipeline: Checks search query AND category tabs
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    
    


    return matchesSearch 
  });
if(!loader){
  return (
    <div className="catalog-container">
      <header className="catalog-header">
        <h2>Traditional Exclusive Sale Collection</h2>
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
            <div key={product.id} className="item-card">
              <div className="image-frame">
                <img src={product.image} alt={product.name} className="item-img" />
                <span className="type-badge">{product.type}</span>
              </div>
              <div className="item-details">
                <span className="item-tag">{product.category}’s Collection</span>
                <h3 className="item-title">{product.name}</h3>
                <div className="price-row">
                  <p className="item-price">{product.price}</p>
                  <button className="view-details-btn" onClick={()=> getIndexData(product)}>Add cart</button>
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
  );
  }else{
    return(
      <Loader/>
    )
  }
};

export default ExclusiveSale;