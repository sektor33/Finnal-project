'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Products.module.css';
import { useCart } from '../../context/CartContext';

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        if (!cancelled) setItems(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1 className={styles.h1}>Products</h1>
        {loading && <span className={styles.note}>Loading…</span>}
        {error && <span className={styles.note} style={{ color: '#dc2626' }}>{error}</span>}
      </div>

      
      <button
  className={`${styles.btn} ${styles.btnPrimary}`}
  onClick={() => {
    addItem({ id: p.id, title: p.title, price: p.price, image: p.image }, 1);
    alert('✅ Added to cart');    
  }}
>
  Add to cart
</button>


      <div className={styles.grid}>
        {items.map(p => (
          <article key={p.id} className={styles.card}>
            <img className={styles.thumb} src={p.image} alt={p.title} />
            <div className={styles.ship}>Ships to Ukraine</div>
            <h3 className={styles.title}>{p.title}</h3>

            <div className={styles.price}>${Number(p.price).toFixed(2)}</div>

            <div className={styles.actions}>
              <Link href={`/products/details/${p.id}`} className={styles.btn}>Details</Link>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => {
                  console.log('ADD', p.id);
                  addItem({ id: p.id, title: p.title, price: p.price, image: p.image }, 1);
                }}
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

