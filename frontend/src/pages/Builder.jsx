import React, { useState } from 'react'
import NeonPreview from '../components/NeonPreview.jsx'
import axios from 'axios'
export default function Builder(){
  const [text, setText] = useState('Hello Neon')
  const [color, setColor] = useState('#ff66cc')
  const [size, setSize] = useState(72)
  const [qty, setQty] = useState(1)
  const price = Math.max(1000, 200 + text.length*100 + Math.round(size*10))
  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push({ id: Date.now(), title: text, options:{ color, size }, price, qty })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }
  return (
    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <NeonPreview text={text} color={color} size={size} />
        <div className="mt-4 space-y-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="w-full p-2 rounded bg-neutral-800" />
          <div className="flex gap-2">
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
            <input type="range" min="24" max="140" value={size} onChange={e=>setSize(+e.target.value)} />
            <input type="number" min="1" value={qty} onChange={e=>setQty(+e.target.value)} className="w-20 p-2 rounded bg-neutral-800" />
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 border rounded bg-neutral-800">
          <div className="text-sm">Price</div>
          <div className="text-2xl font-bold">PKR {price.toLocaleString()}</div>
          <button onClick={addToCart} className="mt-4 w-full bg-pink-600 py-2 rounded text-white">Add to cart</button>
        </div>
      </div>
    </div>
  )
}