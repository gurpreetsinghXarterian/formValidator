"use client"
import { useState } from 'react';
import Register from '../Components/Register';
import Login from '../Components/Login';
import "./global.css"
function Home() {
  const [form, setForm] = useState({ login: true, register: false });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={"outer-container"}>

      {!isLoggedIn && form.login && (
        <Login setIsLoggedIn={setIsLoggedIn} setForm={setForm} isLoggedIn={isLoggedIn} form={form}/>
      )}

      {!isLoggedIn && form.register && (
        <Register setForm={setForm} />
      )}

      {isLoggedIn && (
        <div className={"outer-success"}>
          <h3 style={{color:"white"}}>Welcome!</h3>
        </div>
      )}
    </div>
  );
}

export default Home;
