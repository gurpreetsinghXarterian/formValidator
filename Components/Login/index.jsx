
import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

function Login({ setIsLoggedIn, setForm, isLoggedIn, form }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (value) => {
    setError("")
    if (!value) return 'Email is required';
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(value)) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (value) => {
    setError("")
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleLogin = () => {
    if(email !== '' && password !== ''){
      setError("")

      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
  
      if (emailError || passwordError) {
        setError(emailError || passwordError);
        return;
      }

      
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedUser = storedUsers.find((user) => user.email === email && user.password === password);

    if (storedUser) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  }
  else{
    setError("Pls fill all the details first")

  }
  };

  return (
    <div style={styles.container}>
      <div style={{ width: "65%", height: "80vh", display: "flex", paddingTop: "150px", alignItems: "center", flexDirection: "column" }}>
        <h1 style={{ color: "#000a", marginBottom: "15px", textAlign: "center", }}>Welcome to Website</h1>
        <p style={{ color: "#0008", height: "100%", textAlign: "center", paddingLeft: "50px", paddingRight: "50px" }}>
          To access your personalized content and features, please log in. If you don’t have an account yet, register now to get started and unlock all the great tools we offer. It’s quick and easy!
        </p>
      </div>
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <h2>{isLoggedIn ? 'Welcome Back!' : form.login ? 'Login' : 'Register'}</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            validate={validateEmail}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            validate={validatePassword}
          />
          {error && (<p style={styles.error}>{error}</p>)}
          <Button onClick={handleLogin}>Login</Button>

          <p>
            Don't have an account?{' '}
            <span
              style={styles.formChange}
              onClick={() => { setForm({ login: false, register: true }); setError("") }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    width: '80vw',
    margin: '0 auto',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #6452ec, #be68c7)',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
  },
  formContainer: {
    height: "80vh",
    width: "35%",
    background: "white",
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: "80%",
    height: "50%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  success: {
    color: 'green',
  },
  formChange: {
    color: 'blue',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};
