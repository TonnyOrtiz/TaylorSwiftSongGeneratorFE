import * as tf from '@tensorflow/tfjs-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let model;
let char2idx, idx2char; // Mapas para convertir entre caracteres e índices

class TaylorSwift {
  static async loadModelAndData () {
    model = await tf.loadLayersModel('file://./taylor_swift_js/model.json');
    console.log('Modelo cargado.');

    // Cargar char2idx e idx2char (deberían estar guardados en archivos JSON)
    char2idx = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../taylor_swift_js/char2idx.json'), 'utf8'));
    idx2char = ['\n', '\r', ' ', '!', '"', "'", '(', ')', ',', '-', '.', '0', '1', '2', '3', '6', '9', ':',
      '?', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    console.log('Mapeos cargados.');
  }

  // Generar texto usando el modelo
  static async generateSong (startString, temperature = 0.3) {
    await this.loadModelAndData();
    const numGenerate = 600; // Número de caracteres a generar
    console.log('Start string:', startString);
    const startStr = startString + ' ';
    let inputEval = startStr.split('').map(char => {
      if (char2idx[char] === undefined) {
        throw new Error(`Character "${char}" not found in char2idx mapping.`);
      }
      return char2idx[char];
    });
    inputEval = tf.expandDims(inputEval, 0); // Vectorizar la entrada

    const textGenerated = [];
    model.resetStates(); // Reiniciar el estado del modelo

    for (let i = 0; i < numGenerate; i++) {
      const predictions = model.predict(inputEval); // Realizar la predicción
      const squeezedPredictions = tf.squeeze(predictions, 0); // Eliminar la dimensión de batch
      const adjustedPredictions = squeezedPredictions.div(temperature); // Ajustar temperatura

      // Usar una distribución categórica para elegir el próximo carácter
      const predictedId = tf.multinomial(adjustedPredictions, 1).dataSync()[0];
      console.log('Predicted ID:', predictedId);

      if (idx2char[predictedId] === undefined) {
        throw new Error(`Predicted ID "${predictedId}" not found in idx2char mapping.`);
      }

      textGenerated.push(idx2char[predictedId]); // Convertir índice a carácter
      inputEval = tf.expandDims([predictedId], 0); // Actualizar la entrada
    }

    return startStr + textGenerated.join('');
  }
}

export default TaylorSwift;
