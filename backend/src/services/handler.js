const predictClassification = require('./prediction');
const { storeData, getData } = require('./firestore');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(
    model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    confidenceScore: confidenceScore,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 0
      ? 'Model is predicted successfully'
      : 'Please use the correct picture',
    data,
  });
  response.code(201);
  return response;
}

async function getPredictHandler(request, h) {
  const { id } = request.params;

  const data = await getData(id);

  if (!data) {
    const response = h.response({
      status: 'fail',
      message: 'Prediction not found',
    });
    return response.code(404);
  }

  const response = h.response({
    status: 'success',
    data,
  });
  return response.code(200);
}

module.exports = { postPredictHandler, getPredictHandler };
