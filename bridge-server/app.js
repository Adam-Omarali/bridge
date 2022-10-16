let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
let fs = require("fs");
const multer = require("multer");
const upload = multer({
  dest: "uploads",
});
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let cmdRouter = require("./routes/cmd");
const { methodPrediction } = require("./lib/ai");

const app = express();

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: "M2FfrCLfOqawS8J7R_SRih-uPT7aI2sJaRkEA4KSY8FG",
  }),
  serviceUrl: "https://api.us-east.speech-to-text.watson.cloud.ibm.com",
  disableSslVerification: true,
});

// create the stream

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cmd", cmdRouter);
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);

  const owo = await speechToText.recognize({
    contentType: "audio/webm",
    audio: fs.readFileSync(req.file.path),
  });

  fs.unlinkSync(req.file.path);

  console.log("owo: " + owo);

  let transcript = "";
  let confidence = 0;
  let confidences = 0;
  let prediction = "";
  let method = null;

  if (owo.result.results.length > 0)
    transcript = owo.result.results[0].alternatives[0].transcript;
  if (owo.result.results.length > 0)
    confidence = owo.result.results[0].alternatives[0].confidence;

  if (transcript && confidence) method = methodPrediction(transcript);
  console.log("method: " + method);

  if (method) {
    confidences = (await method).classifications[0].confidences[0].confidence;

    for (let index = 0; index < 3; index++) {
      console.log(
        (await method).classifications[0].confidences[index].option +
          " " +
          (await method).classifications[0].confidences[index].confidence
      );
    }
    prediction = (await method).classifications[0].prediction;
  }

  res.status(200).json({
    transcript: transcript,
    confidence: confidence,
    method: prediction,
    methodConfidence: confidences,
  });
});

app.get("/upload/:id", (req, res) => {
  req.file.mimetype.res.sendFile(
    path.join(__dirname, `./uploads/${req.params.id}`)
  );
});

app.listen(3000, () => {
  console.log(`Running on port 3000`);
});

module.exports = app;
