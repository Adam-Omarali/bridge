import logo from "./logo.svg";
import "./App.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { Testing } from "./Testing";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

function App() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      mediaRecorderOptions: {
        mimeType: "audio/webm",
      },
      video: false,
    });

  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [method, setMethod] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    console.log("mediaBlobUrl: ", mediaBlobUrl);
    async function getTranscript() {
      if (mediaBlobUrl) {
        const res = await uploadAudio();
        console.log("res: ", res);
        setTranscript(res.transcript);
        setConfidence(res.confidence);
        setMethod(res.method);
      }
    }
    getTranscript();
  }, [mediaBlobUrl]);

  function createCommand() {
    let cmd = { cmd: "create a new page in thinking" };
    const res = fetch("http://localhost:3000/cmd", {
      method: "POST",
      body: JSON.stringify(cmd),
    })
      .then((promise) => promise.json())
      .then((data) => data);
    console.log(res);
  }

  async function uploadAudio() {
    const body = new FormData();
    body.append("file", await fetch(mediaBlobUrl).then((r) => r.blob()));
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body,
    });
    return await res.json();
  }

  // createCommand()

  return (
    <div className="App">
      <header className="App-header">
        <p>{"Microphone status: " + status}</p>
        <Button
          shadow
          color="gradient"
          auto
          rounded
          onPress={() => {
            if (!isRecording) startRecording();
            else stopRecording();
            setIsRecording(!isRecording);
          }}
        >
          Record
        </Button>
        {mediaBlobUrl && <video src={mediaBlobUrl} controls autoPlay />}
        <p>{"Transcription: " + transcript}</p>
        <p>{confidence * 100 + "% confidence in transcription"}</p>
        <p>{"Command: " + method}</p>
      </header>
    </div>
  );
}

export default App;
