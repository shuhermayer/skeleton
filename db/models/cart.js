const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cards, {
        foreignKey: 'cardId',
      })
    }
  }
  Cart.init(
    {
      cardId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  )
  return Cart
}
