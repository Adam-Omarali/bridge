import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

function Microphone(){

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

    async function uploadAudio() {
        const body = new FormData();
        body.append("file", await fetch(mediaBlobUrl).then((r) => r.blob()));
        const res = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body,
        });
        return await res.json();
      }

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>{"Microphone status: " + status}</p>
            <Button color="gradient" auto rounded
              onPress={() => {
                if (!isRecording) startRecording();
                else stopRecording();
                setIsRecording(!isRecording);
              }}
              style={{width: "25%"}}
            >
              Record
            </Button>
            {mediaBlobUrl && <video src={mediaBlobUrl} controls autoPlay />}
            <p>{"Transcription: " + transcript}</p>
            <p>{confidence * 100 + "% confidence in transcription"}</p>
            <p>{"Command: " + method}</p>
        </div>
    )
}

export default Microphone