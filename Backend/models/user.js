const express = require('express');
const tf = require('@tensorflow/tfjs-node'); // TensorFlow.js para Node.js

const app = express();
const PORT = 3000;

// Variables globales
let model; // El modelo TensorFlow.js cargado
let char2idx, idx2char; // Mapas para convertir entre caracteres e índices

// Middleware para procesar JSON
app.use(express.json());

// Función para cargar el modelo y los mapeos
async function loadModelAndData () {
  console.log('Cargando modelo y datos...');
  model = await tf.loadLayersModel('file://./ruta_al_modelo_js/modelo.json');
  console.log('Modelo cargado.');

  // Cargar char2idx e idx2char (deberían estar guardados en archivos JSON)
  char2idx = require('./ruta_al_modelo_js/char2idx.json');
  idx2char = require('./ruta_al_modelo_js/idx2char.json');
  console.log('Mapeos cargados.');
}

// Generar texto usando el modelo
async function generateText (startString, temperature = 0.3) {
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

// Ruta principal del servicio
app.post('/generate', async (req, res) => {
  if (!model || !char2idx || !idx2char) {
    return res.status(500).send('Modelo o datos no cargados todavía.');
  }

  const { model: requestedModel, messages, temperature } = req.body;

  if (requestedModel !== 'taylor_swift') {
    return res.status(400).send('Modelo no soportado.');
  }

  const startString = messages[0].start_string;
  const temp = temperature || 0.3;

  try {
    const generatedText = await generateText(startString, temp);
    res.json({ generated_text: generatedText });
  } catch (error) {
    console.error('Error generando texto:', error);
    res.status(500).send('Error generando texto.');
  }
});

// Iniciar el servidor
app.listen(PORT, async () => {
  await loadModelAndData(); // Cargar modelo y datos antes de iniciar el servidor
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
