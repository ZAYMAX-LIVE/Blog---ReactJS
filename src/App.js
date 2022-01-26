import "./css/App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import About from "./pages/About";
import {Profile} from "./pages/Profile";
import React, {useState} from "react";


function App(){
  const [logIn, setLogIn] = useState(()=>{
    if(localStorage.getItem('logIn') === 'true') return true
    return false
  }); //переключатель авторизации пользователя
  const [userName, setUserName] = useState(``)
    return (
      <BrowserRouter>
        <div className="App">
          <Header userName={userName} logIn={logIn} setLogIn={setLogIn}/>
          <main>
           
            <Routes>
              <Route exact path="/" element={<Main />}/>
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/profile" element={<Profile setLogIn={setLogIn} setUserName={setUserName}/>}
              />
            </Routes>
     
          </main>
          <Footer year={new Date().getFullYear()} />
        </div>
      </BrowserRouter>
    );
}
export default App

