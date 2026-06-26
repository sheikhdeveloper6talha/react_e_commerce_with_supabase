import React, { useEffect, useRef, useState } from 'react';
import './Products.css';
import { ProductHit } from '../ApiCaling/Users';
import Loader from '../loader/Loader';
import { connectSupabase } from "../../../commponents/supabase/supabase"

const ProductGrid = () => {
  // Fake Products Mock Data
  const [initialProducts, setInitialProducts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const ProductData = async () => {
    let productItems = await ProductHit()
    if (!productItems) return alert('Kuch Masla Hua hai Developer Ko Call Karo')
    setInitialProducts(productItems)
    const outOfStock = productItems.filter((e) => Number(e.stock) < 1)

    if (outOfStock.length > 0) {
      alert(`${outOfStock.length} items out of stock hain!`)
    }

    setLoading(false)
  }
  useEffect(() => {
    ProductData()
    const channel = connectSupabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',        // 👈 INSERT, UPDATE, DELETE sab ek saath
          schema: 'public',
          table: 'ProductitemsAdd'
        },
        (payload) => {

          if (payload.eventType === 'UPDATE') {
            setInitialProducts(prev => prev.map(order => order.id === payload.new.id ? payload.new : order))
            ProductData()
          }
        }
      )
      .subscribe()

    return () => connectSupabase.removeChannel(channel)
  }, [])

  const deleteItems = async (id) => {
    const response = await connectSupabase
      .from('ProductitemsAdd')
      .delete()
      .eq('id', id)
    ProductData()
    alert('delete Items')
  }

  // stock add 

  const AddStock = async (reciveId) => {
    console.log(reciveId.stock);
    let newData = Number(reciveId.stock)
    console.log(newData + 1);
    const { error } = await connectSupabase
      .from('ProductitemsAdd')
      .update({ 'stock': newData + 1 })
      .eq('id', reciveId.id)
    ProductData()
  }

  if (Loading) return <Loader />
  return (
    <div className="products-container">
      <div className="products-title-bar">
        <h2>Trending Products</h2>
        <p>Explore our best-selling fake products catalog</p>
      </div>

      <div className="products-grid-layout">
        {initialProducts.map((product) => (
          <div key={product.id} className="fake-product-card">

            {/* Top Badge/Ribbon */}
            {product.type && (
              <span className={`product-badge ${product.type.toLowerCase()}`}>
                {product.type}
                <br />
                <span className='product-stock' >Stocks {product.stock}</span>
              </span>
            )}

            {/* Image Wrapper */}
            <div className="product-image-frame">
              <img className="product-emoji" src={product.image_url} />
            </div>

            {/* Content Details */}
            <div className="product-body">
              <span className="product-cat">{product.category}</span>
              <h2 className="product-title" title={product.name}>
                {product.name}
              </h2>
              <h3 className="product-title" title={product.description}>
                {product.description}
              </h3>

              {/* Rating */}


              {/* Price Row */}
              <div className="product-price-row">
                <div className="price-tag">
                  <span className="current-price">${product.price}</span>
                  {product.price && (
                    <span className="old-price">${(((+product.price) / 4) * 5).toFixed()}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Footer Button */}
            <div className="product-footer">
              <button className="add-cart-btn" onClick={() => deleteItems(product.id)}>
                Delete Items
              </button>
              <button className="add-cart-btn" onClick={() => AddStock(product)}>
                Add Stock
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;