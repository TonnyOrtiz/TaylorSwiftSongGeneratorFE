'use strict';
const appconfig = async () => {
  return await import('../config/constants.js');
};
const { USERNAMELENGTH } = appconfig;
const { PASSWORDLENGTH } = appconfig;
const { EMAILLENGTH } = appconfig;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36) // UUID
      },
      username: {
        type: Sequelize.STRING(USERNAMELENGTH),
        allowNull: false,
        unique: true,
        collate: 'utf8_bin'
      },
      legalName: {
        type: Sequelize.STRING(100)
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      email: {
        type: Sequelize.STRING(EMAILLENGTH),
        unique: true,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(PASSWORDLENGTH),
        collate: 'utf8_bin'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};
