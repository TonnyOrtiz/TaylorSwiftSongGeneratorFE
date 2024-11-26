'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Música'
      },
      {
        name: 'Anime'
      },
      {
        name: 'Libros'
      },
      {
        name: 'Películas'
      },
      {
        name: ''
      },
      {
        name: 'A'
      },
      {
        name: 'B'
      },
      {
        name: 'C'
      },
      {
        name: 'D'
      },
      {
        name: 'E'
      },
      {
        name: 'F'
      },
      {
        name: 'G'
      },
      {
        name: 'H'
      },
      {
        name: 'I'
      },
      {
        name: 'J'
      },
      {
        name: 'K'
      },
      {
        name: 'L'
      },
      {
        name: 'M'
      },
      {
        name: 'N'
      },
      {
        name: 'O'
      },
      {
        name: 'P'
      },
      {
        name: 'Q'
      },
      {
        name: 'R'
      },
      {
        name: 'S'
      },
      {
        name: 'T'
      },
      {
        name: 'U'
      },
      {
        name: 'V'
      },
      {
        name: 'W'
      },
      {
        name: 'X'
      },
      {
        name: 'Y'
      },
      {
        name: 'Z'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', [
      {
        name: 'A'
      },
      {
        name: 'B'
      },
      {
        name: 'C'
      },
      {
        name: 'D'
      },
      {
        name: 'E'
      },
      {
        name: 'F'
      },
      {
        name: 'G'
      },
      {
        name: 'H'
      },
      {
        name: 'I'
      },
      {
        name: 'J'
      },
      {
        name: 'K'
      },
      {
        name: 'L'
      },
      {
        name: 'M'
      },
      {
        name: 'N'
      },
      {
        name: 'O'
      },
      {
        name: 'P'
      },
      {
        name: 'Q'
      },
      {
        name: 'R'
      },
      {
        name: 'S'
      },
      {
        name: 'T'
      },
      {
        name: 'U'
      },
      {
        name: 'V'
      },
      {
        name: 'W'
      },
      {
        name: 'X'
      },
      {
        name: 'Y'
      },
      {
        name: 'Z'
      }
    ], {});
  }
};
