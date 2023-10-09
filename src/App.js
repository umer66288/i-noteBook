import './App.css';
import React, { useState } from 'react';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/Navbar';
import { HashRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteStates';
import Aleart from './components/Aleart';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const [mode, setmode] = useState('light')
  const togglemode = () => {
    if (mode === 'light') {
      setmode('dark')
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      setmode('light')
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  };
  const [aleart, setaleart] = useState(null);
  let showaleart = (message, type) => {
    setaleart({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setaleart(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <HashRouter>
          <NavBar togglemode={togglemode} mode={mode} />
          <Aleart aleart={aleart} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showaleart={showaleart} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/Login" element={<Login showaleart={showaleart}/>}></Route>
              <Route exact path="/Signup" element={<Signup showaleart={showaleart}/>}></Route>
            </Routes>
          </div>
        </HashRouter>
      </NoteState>
    </>
  );
}
export default App;