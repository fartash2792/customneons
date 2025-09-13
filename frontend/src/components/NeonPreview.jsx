import React from 'react'
export default function NeonPreview({ text, color, size }){
  const px = Math.max(24, Math.min(140, size))
  return (
    <div className="rounded bg-neutral-800 p-6 text-center">
      <div className="neon" style={{ color, fontSize: px }}>{text || 'Your Neon'}</div>
    </div>
  )
}