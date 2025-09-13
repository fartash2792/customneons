import React, { useState } from 'react'
import axios from 'axios'
export default function AdminLogin(){
  const [form,setForm] = useState({ email:'', password:'' })
  async function login(){
    const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', form)
    if(res.data?.token){ localStorage.setItem('admin_token', res.data.token); alert('Logged in') }
    else alert('Login failed')
  }
  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <input placeholder="email" className="w-full p-2 rounded mb-2 bg-neutral-800" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input placeholder="password" type="password" className="w-full p-2 rounded mb-2 bg-neutral-800" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      <button onClick={login} className="w-full bg-pink-600 py-2 rounded text-white">Login</button>
    </div>
  )
}