import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Shop(){
  const [items,setItems] = useState([])
  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_URL + '/products').then(r=>setItems(r.data)).catch(()=>setItems([]))
  },[])
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl mb-4">Shop</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(p=>(
          <Link to={'/product/'+p.id} key={p.id} className="border rounded p-4 bg-neutral-800">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover mb-2 rounded" />
            <div className="text-lg">{p.title}</div>
            <div className="text-sm text-neutral-400">PKR {p.price?.toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}