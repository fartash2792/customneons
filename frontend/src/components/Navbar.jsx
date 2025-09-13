import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(){
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">CustomNeons.online</Link>
        <nav className="space-x-4">
          <Link to="/builder">Design</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/admin/login">Admin</Link>
        </nav>
      </div>
    </header>
  )
}