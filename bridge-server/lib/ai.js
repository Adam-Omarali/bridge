let credentials = require("../credentials");

const cohere = require("cohere-ai");
cohere.init(credentials.COHERE_APIKEY, "2021-11-08");

async function methodPrediction(transcript) {
  console.log(transcript);
  if (transcript == "") data = "";
  else {
    const response = await cohere.classify({
      inputs: [transcript],
      examples: [
        { text: "Create a page", label: "Create" },
        { text: "Make a new page", label: "Create" },
        { text: "Open a page", label: "Create" },
        { text: "Delete this page", label: "Delete" },
        { text: "Get rid of a page", label: "Delete" },
        { text: "Remove this page", label: "Delete" },
        { text: "Update the page", label: "Update" },
        { text: "Edit the page", label: "Update" },
        { text: "Change this part of the page", label: "Update" },
        { text: "Adjust that page", label: "Update" },
        { text: "Cancel the page", label: "Delete" },
        { text: "Form a new page", label: "Create" },
        { text: "Add a page", label: "Create" },
        { text: "Alter the page", label: "Update" },
        { text: "Add a title to the page", label: "Update" },
      ],
    });
    data = response.body;
  }

  console.log(data);
  return data;
}

exports.methodPrediction = methodPrediction;
