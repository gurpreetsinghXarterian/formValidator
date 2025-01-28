
import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import "./login.css"
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
    if (!value) return 'Email is required';
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(value)) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleLogin = () => {
    if (email !== '' && password !== '') {
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
    else {
      setError("Pls fill all the details first")
    }
  };

  return (
    <div className={"container"}>
      <div style={{ width: "65%", height: "80vh", display: "flex", paddingTop: "150px", alignItems: "center", flexDirection: "column" }}>
        <h1 style={{ color: "#000a", marginBottom: "15px", textAlign: "center", }}>Welcome to Website</h1>
        <p style={{ color: "#0008", height: "100%", textAlign: "center", paddingLeft: "50px", paddingRight: "50px" }}>
          To access your personalized content and features, please log in. If you don’t have an account yet, register now to get started and unlock all the great tools we offer. It’s quick and easy!
        </p>
      </div>
      <div className={"formContainer"}>
        <div className={"form"}>
          <h2>{isLoggedIn ? 'Welcome Back!' : form.login ? 'Login' : 'Register'}</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            validate={validateEmail}
            customcss={{
              // width: '300px',
              // padding: '15px',
              // borderRadius: '10px'
            }}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            validate={validatePassword}
            customcss={{
              // width: '300px',
              // padding: '15px',
              // borderRadius: '10px'
            }}
          />

          {error && (<p className={"error"}>{error}</p>)}
          <Button
            onClick={handleLogin}
            // buttonType="secondary"
            // disabled={true}
            customcss={{
              // width: '30px',
              // backgroundColor: '#6c757d',
              // color: '#333',
              // border: '1px solid #ccc'
            }}
          >
            Login
          </Button>

          <p>
            Don't have an account?{' '}
            <span
              className={"formChange"}
              onClick={() => { setForm({ login: false, register: true });  }}
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


