// src/components/ProductImage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/product-image', { responseType: 'blob' });
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(response);
        
        setImageUrl(imageObjectURL);
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Product" />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default ProductImage;