import { DataTypes } from 'sequelize'
export function defineProduct(sequelize){
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING }
  })
}