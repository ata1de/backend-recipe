'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Atualiza receitas com authorId NULL para um valor padrão (1)
    await queryInterface.sequelize.query(
      `UPDATE Recipes SET authorId = 1 WHERE authorId IS NULL;`
    );
  },

  async down (queryInterface, Sequelize) {
    // Se não há um valor original para reverter, você pode limpar ou definir para NULL novamente
    await queryInterface.sequelize.query(
      `UPDATE Recipes SET authorId = NULL WHERE authorId = 1;`
    );
  }
};
