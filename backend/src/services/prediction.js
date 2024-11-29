const tf = require('@tensorflow/tfjs-node');
const ImageSizeException = require('../exceptions/ImageSizeException');

async function prediction(model, image) {
  try {
    if (image.length > 1024 * 1024) {
      throw new ImageSizeException('Ukuran gambar terlalu besar. Maksimum 1MB.');
    }

    const tensor = tf.node.decodeJpeg(image).
      resizeNearestNeighbor([224, 224]).
      expandDims().
      toFloat();
    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    let result = {
      confidenceScore,
      label: 'Cancer',
      suggestion: 'Segera periksa ke dokter!',
    };
    if (confidenceScore < 1) {
      result.label = 'Non-cancer';
      result.suggestion = 'Penyakit kanker tidak terdeteksi.';
    }

    return result;
  } catch (error) {
    throw new ImageSizeException('Terjadi kesalahan dalam melakukan prediksi');
  }
}

module.exports = prediction;
