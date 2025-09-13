import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()
const secret = process.env.JWT_SECRET || 'secret'
router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body
  if(!email || !password) return res.status(400).json({ error:'Missing fields' })
  const existing = await User.findOne({ where: { email } })
  if(existing) return res.status(400).json({ error:'Email exists' })
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash: hash })
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '30d' })
  res.json({ token })
})
router.post('/login', async (req,res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if(!user) return res.status(400).json({ error:'Invalid' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if(!ok) return res.status(400).json({ error:'Invalid' })
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '30d' })
  res.json({ token })
})
export default router