// src/app/products/details/[id]/page.jsx
import React from 'react';

export default async function ProductDetails({ params }) {
  const { id }=params;

  // Server-side fetch (async component)
  const res=await fetch(`https://fakestoreapi.com/products/${id}`);
  const product=await res.json();

  return (
    <section style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={200} />
      <p>{product.description}</p>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Rating:</b> {product.rating.rate} / 5 ({product.rating.count} reviews)</p>
    </section>
  );
}
