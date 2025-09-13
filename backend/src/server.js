import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sequelize } from './models/index.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import adminRoutes from './routes/admin.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.get('/api/health', (req,res)=> res.json({ok:true}))
async function start(){
  await sequelize.sync({ alter: true })
  app.listen(PORT, ()=> console.log(`API listening on :${PORT}`))
}
start().catch(err=>{ console.error(err); process.exit(1) })