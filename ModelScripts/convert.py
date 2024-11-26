import tensorflow as tf
import tensorflowjs as tfjs

# Carga el modelo TensorFlow.
model = tf.keras.models.load_model('taylor_swift.keras')
# Re-save the model in the native Keras format.
model.save('taylor_swift_reformatted.keras')

# Load the reformatted model.
model = tf.keras.models.load_model('taylor_swift_reformatted.keras')


# Check the Keras version from the model metadata
model.compile()

# Convierte el modelo a JavaScript.
tfjs.converters.save_keras_model(model, 'taylor_swift_js')

