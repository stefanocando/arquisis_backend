'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return Promise.all([
    //   queryInterface.addColumn(
    //     'Events',
    //     'event_id',
    //     {
    //       type: Sequelize.STRING,
    //       allowNull: true,
    //     }
    //   )
    // ]);
  },

  async down (queryInterface, Sequelize) {
    // return Promise.all([
    //   queryInterface.removeColumn('Events', 'event_id'),
    // ]);
  }
};
