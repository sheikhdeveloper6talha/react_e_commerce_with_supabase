import React, { useContext } from 'react';
import './Categories.css';
import { userContext } from '../contextApi/Context';

const categoryData = [
  { id: 1, name: "Premium Kurtis", count: "48 Items", class: "cat-kurti" , image : 'https://i.pinimg.com/1200x/f6/ef/36/f6ef36b0d9c002f8d4071eede85ab656.jpg' },
  { id: 2, name: "Shalwar Kameez", count: "36 Items", class: "cat-suits" ,  image : 'https://i.pinimg.com/736x/5f/8b/f2/5f8bf20240c82d4ac771e5b8564e6474.jpg' },
  { id: 3, name: "New Arrivals", count: "Fresh Drops", class: "cat-new" , image : 'https://i.pinimg.com/736x/1f/84/58/1f8458c1f43e96d75caa0d9966728886.jpg'},
  { id: 4, name: "Exclusive Sale", count: "Up to 40% Off", class: "cat-sale"  , image : 'https://i.pinimg.com/736x/4d/5b/3e/4d5b3e7a6b4b7ad3ccc3d82db7b7124a.jpg'}
];

const Categories = () => {
  let contextData = useContext(userContext)
  let setCheckClick = contextData.setCheckClick
  
  
   return (
    <section className="categories-section" id="collections">
      <div className="categories-container">
        <div className="section-header">
          <h2>SHOP BY CATEGORY</h2>
          <p>Explore smLibas exquisite tailoring and premium lawn collections</p>
        </div>

        <div className="categories-grid">
          {categoryData.map((category) => (
              <div key={category.id} className={`category-card ${category.class}`}>
                <img src={category.image}/>
              <div className="card-inner-overlay">
                <div className="card-info">
                  <h3>{category.name}</h3>
                  <span>{category.count}</span>
                </div>
                <button className="shop-now-btn" onClick={()=>{setCheckClick(category.name)}}>Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;