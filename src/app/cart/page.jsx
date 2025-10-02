'use client';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <div style={{padding:20}}>
      <h1>Cart</h1>

      {!items.length && <p>Cart is empty</p>}

      {items.map(it => (
        <div key={it.id} style={{display:'flex',alignItems:'center',gap:10,margin:'10px 0'}}>
          <img src={it.image} alt="" width={50} height={50} />
          <div style={{flex:1}}>{it.title}</div>
          <button onClick={() => updateQuantity(it.id, it.quantity - 1)} disabled={it.quantity <= 1}>-</button>
          <span>{it.quantity}</span>
          <button onClick={() => updateQuantity(it.id, it.quantity + 1)} disabled={it.quantity >= 10}>+</button>
          <div>${(it.price * it.quantity).toFixed(2)}</div>
          <button onClick={() => removeItem(it.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}
