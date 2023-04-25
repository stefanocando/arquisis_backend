'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Request, {
        foreignKey: 'event_id'
      })
    }
  }
  Event.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    price: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT,
    location: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    event_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};