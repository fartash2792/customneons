import { DataTypes } from 'sequelize'
export function defineOrderItem(sequelize){
  return sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    price: { type: DataTypes.INTEGER, allowNull: false }
  })
}