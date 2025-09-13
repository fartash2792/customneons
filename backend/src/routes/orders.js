import express from 'express'
import { Order, OrderItem, Product, User } from '../models/index.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { nanoid } from 'nanoid'
const router = express.Router()
// place order (customer)
router.post('/', async (req,res)=>{
  try {
    const { customer, items, amount } = req.body
    // create simple guest user if no userId provided
    let user = null
    if(customer?.email){
      user = await User.findOne({ where: { email: customer.email } })
      if(!user){
        user = await User.create({ name: customer.name || 'Guest', email: customer.email, passwordHash: 'guest' })
      }
    }
    const orderNumber = nanoid(8)
    const order = await Order.create({ orderNumber, amount, shippingAddress: customer, userId: user?.id })
    for(const it of items){
      await OrderItem.create({ orderId: order.id, productId: it.productId || null, quantity: it.qty || it.quantity || 1, price: it.price })
    }
    res.json({ ok:true, orderId: order.id, orderNumber })
  } catch(e){
    console.error(e)
    res.status(500).json({ error: 'server error' })
  }
})
// get order by id or admin list
router.get('/:id', requireAuth, async (req,res)=>{
  const o = await Order.findByPk(req.params.id, { include: [OrderItem] })
  if(!o) return res.status(404).json({ error:'Not found' })
  // only owner or admin can view
  if(req.user.role !== 'admin' && req.user.id !== o.userId) return res.status(403).json({ error:'Forbidden' })
  res.json(o)
})
router.get('/', requireAuth, requireAdmin, async (req,res)=>{
  const list = await Order.findAll({ order: [['createdAt','DESC']] })
  res.json(list)
})
export default router