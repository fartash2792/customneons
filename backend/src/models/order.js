import { DataTypes } from 'sequelize'
export function defineOrder(sequelize){
  return sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'received' },
    shippingAddress: { type: DataTypes.JSON }
  })
}