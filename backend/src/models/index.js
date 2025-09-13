import { Sequelize } from 'sequelize'
import path from 'path'
import url from 'url'
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const storage = process.env.DATABASE_STORAGE || path.join(__dirname, '../../data/dev.sqlite')
export const sequelize = new Sequelize({ dialect: 'sqlite', storage, logging: false })
// import models
import { defineUser } from './user.js'
import { defineProduct } from './product.js'
import { defineOrder } from './order.js'
import { defineOrderItem } from './orderItem.js'
export const User = defineUser(sequelize)
export const Product = defineProduct(sequelize)
export const Order = defineOrder(sequelize)
export const OrderItem = defineOrderItem(sequelize)
// relations
User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })
Order.hasMany(OrderItem, { foreignKey: 'orderId' })
OrderItem.belongsTo(Order, { foreignKey: 'orderId' })
Product.hasMany(OrderItem, { foreignKey: 'productId' })
OrderItem.belongsTo(Product, { foreignKey: 'productId' })