const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  const modelPath = process.env.MODEL_URL;
  console.log(`Model: ${modelPath}`);

  try {
    return await tf.loadGraphModel(modelPath);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = loadModel;
