'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        title: 'Test',
        image: null,
        summary: 'Test',
        author: 'ad8bc584-9652-46e6-9d1e-565868b23fb7',
        categoryId: 1,
        body: 'Test',
        createdAt: '2024-11-18T13:59:45.000Z',
        updatedAt: '2024-11-18T13:59:45.000Z'
      },
      {
        id: 2,
        title: 'Test de post 2',
        image: null,
        summary: 'Test de post 2',
        author: '0b16b291-242a-4b67-93cd-62b2b666138b',
        categoryId: 32,
        body: 'Test de post 2',
        createdAt: '2024-11-18T14:23:01.000Z',
        updatedAt: '2024-11-18T14:23:01.000Z'
      },
      {
        id: 3,
        title: 'Otro post más',
        image: null,
        summary: 'Un post más completo con más palabras',
        author: '0b16b291-242a-4b67-93cd-62b2b666138b',
        categoryId: 33,
        body: 'Este es el cuerpo del post más largo que contiene multiples palabras para probar que todo esté bien',
        createdAt: '2024-11-18T14:23:37.000Z',
        updatedAt: '2024-11-18T14:23:37.000Z'
      },
      {
        id: 4,
        title: 'Test 4',
        image: null,
        summary: 'Test 4',
        author: '0b16b291-242a-4b67-93cd-62b2b666138b',
        categoryId: 33,
        body: 'Test 4',
        createdAt: '2024-11-18T14:25:23.000Z',
        updatedAt: '2024-11-18T14:25:23.000Z'
      },
      {
        id: 5,
        title: 'Test 5',
        image: null,
        summary: 'Test 5',
        author: '0b16b291-242a-4b67-93cd-62b2b666138b',
        categoryId: 33,
        body: 'Test 5',
        createdAt: '2024-11-18T14:25:36.000Z',
        updatedAt: '2024-11-18T14:25:36.000Z'
      },
      {
        id: 6,
        title: 'Test 6',
        image: null,
        summary: 'Test 6',
        author: '0b16b291-242a-4b67-93cd-62b2b666138b',
        categoryId: 33,
        body: 'Test 6',
        createdAt: '2024-11-18T14:25:49.000Z',
        updatedAt: '2024-11-18T14:25:49.000Z'
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
