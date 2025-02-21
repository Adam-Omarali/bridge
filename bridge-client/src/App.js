import logo from "./logo.svg";
import "./App.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { Testing } from "./Testing";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Header from "./components/Header";
import Microphone from "./components/Microphone";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TokenHandler from './components/TokenHandler';

function App() {

  const [page, setPage] = useState('user')

  // createCommand()

  let content = <Microphone />
  if (page !== "user"){
    content = <Testing />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <TokenHandler />
            <div className="App">
              <Header setPage={setPage} />
              <div style={{paddingTop: '10px'}}>
                {content}
              </div>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
