import TaylorSwift from '../models/taylorSwift.js';

class GenerateHandler {
  static async createSong (req, res, next) {
    if (req.method === 'GET') {
      try {
        // Asumiendo que los datos de entrada se reciben como arreglo JSON
        const inputData = req.params;
        const generatedSong = await TaylorSwift.generateSong(inputData.startString, inputData.temperature);
        res.json(generatedSong);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.render('post/createPost', { title: 'Crear Publicación', error: error.message });
      }
    }
  }
}

export default GenerateHandler;
