import React from 'react'
import { useLocation, Link } from 'react-router-dom'
export default function Confirmation(){
  const query = new URLSearchParams(window.location.search)
  const orderId = query.get('orderId')
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-3xl mb-2">Thank you!</h1>
      <p>Your order id: <strong>{orderId}</strong></p>
      <Link to="/" className="mt-4 inline-block bg-pink-600 px-4 py-2 rounded text-white">Back to Home</Link>
    </div>
  )
}