import * as tf from '@tensorflow/tfjs-node';
let model;
let char2idx, idx2char; // Mapas para convertir entre caracteres e índices

class TaylorSwift {
  static async loadModelAndData () {
    model = await tf.loadLayersModel('file://./taylor_swift_js/model.json');
    console.log('Modelo cargado.');

    // Cargar char2idx e idx2char (deberían estar guardados en archivos JSON)
    char2idx = require('../taylor_swift_js/char2idx.json');
    idx2char = require('../taylor_swift_js/idx2char.json');
    console.log('Mapeos cargados.');
  }

  // Generar texto usando el modelo
  static async generateSong (startString, temperature = 0.3) {
    await this.loadModelAndData();
    const numGenerate = 300; // Número de caracteres a generar
    let inputEval = startString.split('').map(char => char2idx[char]);
    inputEval = tf.expandDims(inputEval, 0); // Vectorizar la entrada

    const textGenerated = [];
    model.resetStates(); // Reiniciar el estado del modelo

    for (let i = 0; i < numGenerate; i++) {
      const predictions = model.predict(inputEval); // Realizar la predicción
      const squeezedPredictions = tf.squeeze(predictions, 0); // Eliminar la dimensión de batch
      const adjustedPredictions = squeezedPredictions.div(temperature); // Ajustar temperatura

      // Usar una distribución categórica para elegir el próximo carácter
      const predictedId = tf.multinomial(adjustedPredictions, 1).dataSync()[0];

      textGenerated.push(idx2char[predictedId]); // Convertir índice a carácter
      inputEval = tf.expandDims([predictedId], 0); // Actualizar la entrada
    }

    return startString + textGenerated.join('');
  }
}

export default TaylorSwift;
