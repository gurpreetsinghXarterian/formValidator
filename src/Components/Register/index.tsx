import { useState, useCallback } from 'react';
import Button from '../Button/index';
import Input from '../Input/index';
import './register.css';
import { RegisterProps } from '../../types/types'; 
import { buttonVarients } from '../Button/varients';

const Register: React.FC<RegisterProps> = ({ setForm }) => {
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');

  const handleRegisterEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterPassword(e.target.value);
  };

  const validateEmail = (value: string): string => {
    if (!value) {
      return 'Email is required';
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(value)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const validatePassword = (value: string): string => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleRegister = useCallback(() => {
    if (registerEmail !== '' && registerPassword !== '') {
      setRegisterError('');

      const emailError = validateEmail(registerEmail);
      const passwordError = validatePassword(registerPassword);

      if (emailError ?? passwordError) {
        setRegisterError(emailError ?? passwordError);
        return;
      }

      const storedUsers = JSON.parse(localStorage.getItem('users') ?? '[]');

      const userExists = storedUsers.some((user: { email: string }) => user.email === registerEmail);
      if (userExists) {
        setRegisterError('Email is already registered');
        return;
      }

      const newUser = { email: registerEmail, password: registerPassword };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterError('');
      setForm({ login: true, register: false });
    } else {
      setRegisterError('Please fill all the details first');
    }
  }, [registerEmail, registerPassword, setForm]);

  return (
    <div className={'container'}>
      <div
        style={{
          width: '65%',
          height: '80vh',
          display: 'flex',
          paddingTop: '150px',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ color: '#000a', marginBottom: '15px', textAlign: 'center' }}>
          Welcome to Website
        </h1>
        <p
          style={{
            color: '#0008',
            height: '100%',
            textAlign: 'center',
            paddingLeft: '50px',
            paddingRight: '50px',
          }}
        >
          Join us today to enjoy exclusive features and personalized content. It only takes a few
          minutes to sign up, and you’ll be ready to start exploring everything we offer!
        </p>
      </div>
      <div className={'formContainer'}>
        <div className={'form'}>
          <h2>Register</h2>
          <Input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={handleRegisterEmailChange}
            validate={validateEmail}
          />
          <Input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={handleRegisterPasswordChange}
            validate={validatePassword}
          />
          {registerError && <p className={'error'}>{registerError}</p>}
          <Button onClick={handleRegister} customcss={buttonVarients.buttonBlue}>Register</Button>

          <p>
            Already have an account?{' '}
            <span
              className={'formChange'}
              onClick={() => setForm({ login: true, register: false })}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
