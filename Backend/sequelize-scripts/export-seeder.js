import fs from 'fs';
import sequelize from '../config/database.js'; // Importa correctamente la instancia de sequelize
import models from '../models/index.js'; // Ajusta según la estructura de tus modelos
const { Comment } = models; // Ajusta según tus modelos

(async () => {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate(); // Cambié .sync() por .authenticate() para verificar la conexión
    console.log('Conexión establecida correctamente.');

    // Obtener todos los datos de la tabla
    const data = await Comment.findAll({ raw: true }); // Reemplaza 'Post' con tu modelo si es necesario
    console.log(data); // Muestra los datos obtenidos de la tabla

    // Guardar el seeder como un archivo
    const seederFileContent = `
    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Comments', ${JSON.stringify(data, null, 2)}, {});
      },
      down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Comments', null, {});
      },
    };
    `;

    fs.writeFileSync('./seeders/your-seeder-file.js', seederFileContent);

    console.log('Seeder exportado correctamente.');
  } catch (error) {
    console.error('Error al exportar el seeder:', error);
  } finally {
    // Cerrar conexión
    await sequelize.close(); // Asegúrate de cerrar correctamente la conexión
    console.log('Conexión cerrada.');
  }
})();
