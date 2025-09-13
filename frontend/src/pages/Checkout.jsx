import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Checkout(){
  const [form,setForm] = useState({ name:'', email:'', phone:'', address:'' })
  const nav = useNavigate()
  async function placeOrder(){
    const items = JSON.parse(localStorage.getItem('cart')||'[]')
    const amount = items.reduce((s,i)=> s + (i.price||0)*(i.qty||1), 0)
    const res = await axios.post(import.meta.env.VITE_API_URL + '/orders', { customer: form, items, amount })
    if(res.data?.orderId){
      localStorage.removeItem('cart')
      nav('/confirmation?orderId='+res.data.orderId)
    } else alert('Error placing order')
  }
  function onChange(e){ setForm({...form, [e.target.name]: e.target.value}) }
  return (
    <div className="max-w-4xl mx-auto p-8 grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl mb-4">Shipping Details</h2>
        {['name','email','phone','address'].map(f=>(
          <input key={f} name={f} value={form[f]} onChange={onChange} placeholder={f} className="w-full p-2 rounded mb-2 bg-neutral-800" />
        ))}
      </div>
      <div>
        <h2 className="text-2xl mb-4">Order Summary</h2>
        <div className="p-4 border rounded bg-neutral-800">
          <div className="text-sm">Items: </div>
          <div className="mt-2">Total will be calculated at checkout</div>
        </div>
        <button onClick={placeOrder} className="mt-4 w-full bg-pink-600 py-2 rounded text-white">Place Order (COD)</button>
      </div>
    </div>
  )
}