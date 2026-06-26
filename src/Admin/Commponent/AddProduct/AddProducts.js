import React, { useState } from 'react';
import './AddProducts.css';
import { connectSupabase } from "../../../commponents/supabase/supabase";
const AddProduct = () => {
  // FIX: Added 'sizes' array here to prevent undefined crashes if handled elsewhere
  const [product, setProduct] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    category: '',
    sizes: ['XXL' , 'XL' , 'L' , 'M' , 'S'] 
  });

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle Size Selection (S, M, L, XL)
  const handleSizeToggle = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter((s) => s !== size)
      : [...product.sizes, size];
    
    setProduct({ ...product, sizes: updatedSizes });
  };

  // Handle File/Image Upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
try {

    let imageUrl = null;

    // 1. Upload image to Supabase Storage (if image selected)
    if (product.image) {
      const fileExt = product.image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await connectSupabase.storage
        .from('product-images') // your bucket name
        .upload(filePath, product.image);

      if (uploadError) {
        console.error('Image upload error:', uploadError);
        alert('Image upload failed!');
        return;
      }

      // Get public URL of uploaded image
      const { data: urlData } = connectSupabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
    }

    // 2. Insert product data into database table
    const { data, error } = await connectSupabase
      .from('ProductitemsAdd') // your table name
      .insert([
        {
          id : Math.round(Math.random()*100000),
          name: product.name,
          type: product.type,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          sizes: 'size',
          image_url: imageUrl,
        },
      ]);

    if (error) {
      console.error('Insert error:', error);
      alert('Failed to add product!');
      return;
    }

    
    alert('Product Added Successfully!');

    // 3. Reset form
    setProduct({
      name: '',
      type: '',
      description: '',
      price: '',
      stock: '',
      image: null,
      category: '',
      sizes: ['XXL', 'XL', 'L', 'M', 'S'],
    });
  } catch (err) {
    console.log('Unexpected error:', err);
    alert('Something went wrong!');
  }  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add New Product</h2>
        <p>Fill out the details below to add a new product to your inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        
        {/* Product Name */}
        <div className="form-group full-width">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., Premium Cotton Hoodie"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Type / Category */}
        <div className="form-group">
          <label htmlFor="type">Product Type</label>
          <select
            id="type"
            name="type"
            value={product.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            {/* FIX: Value changed from 'clothing' to 'unstitched' */}
            <option value="unstitched">Unstitched</option> 
          </select>
        </div>

        {/* Product Price & Stock in one row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="e.g., 50"
              min="0"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="form-group full-width">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {/* FIX: Value changed from 'clothing' to 'women' */}
            <option value="women">Women</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group full-width">
          <label htmlFor="image">Product Image</label>
          <div className="file-dropzone">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <span className="file-dummy">
              {product.image ? `Selected: ${product.image.name}` : '📁 Click to upload product image'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Write a detailed description of the product features..."
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-actions full-width">
          <button type="submit" className="submit-btn">Publish Product</button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;