import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secret = process.env.JWT_SECRET || 'secret'
export function requireAuth(req,res,next){
  const auth = req.headers.authorization
  if(!auth) return res.status(401).json({ error:'No token' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, secret)
    req.user = payload
    next()
  } catch(e){
    return res.status(401).json({ error:'Invalid token' })
  }
}
export function requireAdmin(req,res,next){
  if(!req.user) return res.status(401).json({ error:'Unauthorized' })
  if(req.user.role !== 'admin') return res.status(403).json({ error:'Requires admin role' })
  next()
}