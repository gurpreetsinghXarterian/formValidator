"use client"
import { useState } from 'react';
import Register from '../../Components/Register';
import Login from '../../Components/Login';

function Home() {
  // States for Form Switch (Login / Register)
  const [form, setForm] = useState({ login: true, register: false });

  // States for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={styles.container}>

      {/* Login Form */}
      {!isLoggedIn && form.login && (
        <Login setIsLoggedIn={setIsLoggedIn} setForm={setForm} isLoggedIn={isLoggedIn} form={form}/>
      )}

      {/* Register Form */}
      {!isLoggedIn && form.register && (
        <Register setForm={setForm} />
      )}

      {/* Welcome Message */}
      {isLoggedIn && (
        <div style={styles.success}>
          <h3 style={{color:"white"}}>Welcome!</h3>
        </div>
      )}
    </div>
  );
}

export default Home;

const styles = {
  container: {
    width: '100vw',
    height: "100vh",
    margin: '0 auto',
    padding: '20px',
    display: "flex",
    justifyContent: 'center', // Vertically center the items
    alignItems: 'center', 
    background: 'linear-gradient(to right, #6452ec, #be68c7)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  success: {
    color: 'green',
  },
};
