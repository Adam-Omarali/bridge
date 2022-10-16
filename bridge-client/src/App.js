import logo from "./logo.svg";
import "./App.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { Testing } from "./Testing";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Header from "./components/Header";
import Microphone from "./components/Microphone";

function App() {

  const [page, setPage] = useState('user')

  // createCommand()

  let content = <Microphone />

  if (page !== "user"){
    content = <Testing />
  }

  return (
    <div className="App">
      <Header setPage={setPage}/>
      <div style={{paddingTop: '10px'}}>
        {content}
      </div>
    </div>
  );
}

export default App;
