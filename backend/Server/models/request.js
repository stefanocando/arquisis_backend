'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Event, {
        as: 'eventid',
        foreignKey: 'event_id'
      })
    }
  }
  Request.init({
    group_id: DataTypes.STRING,
    deposit_token: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    seller: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    request_id: DataTypes.STRING,
    event_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};