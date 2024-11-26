'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        id: 1,
        comment: 'Comentario 1',
        postId: 1,
        author: 'ad8bc584-9652-46e6-9d1e-565868b23fb7',
        createdAt: '2024-11-18T09:24:20.000Z',
        updatedAt: '2024-11-18T09:24:20.000Z'
      },
      {
        id: 2,
        comment: 'Comentario 2. Este es un comentario más largo',
        postId: 3,
        author: '0b16b291-242a-4b67-93cd-62b2b666138b',
        createdAt: '2024-11-18T09:25:08.000Z',
        updatedAt: '2024-11-18T09:25:08.000Z'
      },
      {
        id: 3,
        comment: 'Comentario 3',
        postId: 2,
        author: 'ad8bc584-9652-46e6-9d1e-565868b23fb7',
        createdAt: '2024-11-18T09:25:34.000Z',
        updatedAt: '2024-11-18T09:25:34.000Z'
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
