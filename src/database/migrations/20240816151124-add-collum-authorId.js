'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('recipes', 'authorId', {
      type: Sequelize.INTEGER,  // Use Sequelize.INTEGER para inteiros
      allowNull: true,          // Permitir NULL, se aplicável
      references: {
        model: 'Users',         // Nome da tabela referenciada (deve estar em plural se sua tabela é 'Users')
        key: 'id'               // Coluna na tabela referenciada
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipes', 'authorId');
  }
};
