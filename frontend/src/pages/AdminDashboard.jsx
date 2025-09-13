import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function AdminDashboard(){
  const [stats,setStats] = useState({ products:0, orders:0 })
  useEffect(()=>{
    const token = localStorage.getItem('admin_token')
    axios.get(import.meta.env.VITE_API_URL + '/admin/stats', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>setStats(r.data)).catch(()=>{})
  },[])
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded bg-neutral-800">Products: {stats.products}</div>
        <div className="p-4 border rounded bg-neutral-800">Orders: {stats.orders}</div>
      </div>
    </div>
  )
}