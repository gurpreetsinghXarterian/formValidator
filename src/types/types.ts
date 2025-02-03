import { ChangeEvent, ReactNode } from 'react';

// Input Component Props
export interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validate: (value: string) => string;
  name?: string;
  errorMessage?: string;
  customcss?: string;
  buttonType?: 'primary' | 'secondary' | 'danger' | 'focus' | 'hover' | 'error' | 'disabled';
  disabled?: boolean;
}

// Button Component Props
export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  customcss?: string;
  buttonType?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'disabled';
  disabled?: boolean;
}

// Login Component Props
export interface LoginProps {
  setIsLoggedIn: (status: boolean) => void;
  setForm: (formState: { login: boolean; register: boolean }) => void;
  isLoggedIn: boolean;
  form: { login: boolean; register: boolean };
}

// Register Component Props
export interface RegisterProps {
  setForm: React.Dispatch<React.SetStateAction<{ login: boolean; register: boolean }>>;
}

export interface RootLayoutProps {
    children: ReactNode;
  }

export interface FormState {
  login: boolean;
  register: boolean;
}
