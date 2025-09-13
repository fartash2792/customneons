import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Cart(){
  const [cart,setCart] = useState([])
  const nav = useNavigate()
  useEffect(()=> setCart(JSON.parse(localStorage.getItem('cart')||'[]')), [])
  function remove(idx){ const c = [...cart]; c.splice(idx,1); setCart(c); localStorage.setItem('cart', JSON.stringify(c)) }
  const total = cart.reduce((s,i)=> s + (i.price||0)*(i.qty||1), 0)
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl mb-4">Cart</h2>
      <div className="space-y-4">
        {cart.map((it,idx)=>(
          <div key={idx} className="flex justify-between p-4 border rounded bg-neutral-800">
            <div>
              <div>{it.title}</div>
              <div className="text-sm text-neutral-400">{JSON.stringify(it.options||{})}</div>
            </div>
            <div className="text-right">
              <div>Qty: {it.qty||1}</div>
              <div>PKR {(it.price*(it.qty||1)).toLocaleString()}</div>
              <button onClick={()=>remove(idx)} className="text-red-400 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg">Total: PKR {total.toLocaleString()}</div>
        <Link to="/checkout" className="bg-pink-600 px-4 py-2 rounded text-white">Checkout</Link>
      </div>
    </div>
  )
}