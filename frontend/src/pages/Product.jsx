import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function Product(){
  const { id } = useParams()
  const [p,setP] = useState(null)
  useEffect(()=>{ axios.get(import.meta.env.VITE_API_URL + '/products/'+id).then(r=>setP(r.data)).catch(()=>setP(null)) },[id])
  if(!p) return <div className="p-8">Loading...</div>
  function addToCart(){ const cart = JSON.parse(localStorage.getItem('cart')||'[]'); cart.push({ id: 'p-'+p.id, title:p.title, price:p.price, qty:1 }); localStorage.setItem('cart', JSON.stringify(cart)); alert('Added') }
  return (
    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-6">
      <img src={p.image} alt={p.title} className="w-full rounded" />
      <div>
        <h1 className="text-2xl mb-2">{p.title}</h1>
        <div className="text-neutral-400 mb-4">PKR {p.price?.toLocaleString()}</div>
        <button onClick={addToCart} className="bg-pink-600 px-4 py-2 rounded text-white">Add to cart</button>
        <p className="mt-4 text-neutral-300">{p.description}</p>
      </div>
    </div>
  )
}