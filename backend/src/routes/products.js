import express from 'express'
import { Product } from '../models/index.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
const router = express.Router()
router.get('/', async (req,res)=>{
  const items = await Product.findAll()
  res.json(items)
})
router.get('/:id', async (req,res)=>{
  const p = await Product.findByPk(req.params.id)
  if(!p) return res.status(404).json({ error:'Not found' })
  res.json(p)
})
// admin create/update/delete
router.post('/', requireAuth, requireAdmin, async (req,res)=>{
  const { title, description, price, image } = req.body
  const p = await Product.create({ title, description, price, image })
  res.json(p)
})
router.put('/:id', requireAuth, requireAdmin, async (req,res)=>{
  const p = await Product.findByPk(req.params.id)
  if(!p) return res.status(404).json({ error:'Not found' })
  await p.update(req.body)
  res.json(p)
})
router.delete('/:id', requireAuth, requireAdmin, async (req,res)=>{
  const p = await Product.findByPk(req.params.id)
  if(!p) return res.status(404).json({ error:'Not found' })
  await p.destroy()
  res.json({ ok:true })
})
export default router