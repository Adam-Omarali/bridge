let credentials = require("../credentials");

const cohere = require("cohere-ai");
cohere.init(credentials.COHERE_APIKEY, "2021-11-08");

async function methodPrediction(transcript) {
  console.log(transcript);
  if (transcript == "") data = "";
  else {
    const response = await cohere.classify({
      model: "3e788b5c-7923-42df-8e74-1a542f5e63cd-ft",
      inputs: [transcript],
      examples: []
    });
    data = response.body;
  }

  console.log(data);
  return data;
}

exports.methodPrediction = methodPrediction;
