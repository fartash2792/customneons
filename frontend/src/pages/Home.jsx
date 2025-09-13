import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div className="max-w-6xl mx-auto p-8 text-center">
      <h1 className="text-4xl mb-4">Design your custom neon</h1>
      <p className="mb-6">Fast shipping • Premium LEDs • 1 year warranty</p>
      <Link to="/builder" className="px-6 py-3 bg-pink-600 rounded text-white">Design Your Neon</Link>
    </div>
  )
}