"use client";
import { useState } from 'react';
import Register from '../Components/Register';
import Login from '../Components/Login';
import "./global.css";

interface FormState {
  login: boolean;
  register: boolean;
}
const Home: React.FC = () => {
  const [form, setForm] = useState<FormState>({ login: true, register: false });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="outer-container">
      {/* Login Form */}
      {!isLoggedIn && form.login && (
        <Login setIsLoggedIn={setIsLoggedIn} setForm={setForm} isLoggedIn={isLoggedIn} form={form} />
      )}

      {/* Register Form */}
      {!isLoggedIn && form.register && (
        <Register setForm={setForm} />
      )}

      {/* Welcome Message */}
      {isLoggedIn && (
        <div className="outer-success">
          <h3 style={{ color: "white" }}>Welcome!</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
