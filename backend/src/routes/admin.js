import express from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { Product, Order } from '../models/index.js'
const router = express.Router()
router.get('/stats', requireAuth, requireAdmin, async (req,res)=>{
  const products = await Product.count()
  const orders = await Order.count()
  res.json({ products, orders })
})
export default router