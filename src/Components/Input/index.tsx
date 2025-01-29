import { useState, useEffect, useRef, ChangeEvent } from 'react';
import './Input.css';

// Define the types for the component props
interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validate: (value: string) => string;
  name?: string;
  errorMessage?: string;
  customcss?: React.CSSProperties;
  buttonType?: 'primary' | 'secondary' | 'danger' | 'focus' | 'hover' | 'error' | 'disabled';
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  validate,
  name,
  errorMessage,
  customcss,
  buttonType ,
  disabled = false,
}) => {
  const [error, setError] = useState<string>(errorMessage || '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value && validate) {
      const validationError = validate(value);
      setError(validationError);
    } else {
      setError('');
    }
  }, [value, validate]);

  const handleBlur = () => {
    setIsFocused(false);
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseClass = 'input';

  // Stable class name (no randomization)
  const inputClass = `${baseClass} ${baseClass}-${buttonType} ${isFocused ? `${baseClass}-focus` : ''} ${isHovered ? `${baseClass}-hover` : ''} ${error ? `${baseClass}-error` : ''} ${disabled ? `${baseClass}-disabled` : ''}`;

  const customClass = customcss ? generateCustomClass(customcss) : '';

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${inputClass} ${customClass}`}
        disabled={disabled}
        name={name} // Ensure 'name' is passed to the input element
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

// Helper function to dynamically inject CSS styles for custom styling
const generateCustomClass = (customcss: React.CSSProperties): string => {
  // Ensure this code runs only on the client-side (in the browser)
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    let styleTag = document.getElementById('dynamic-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-styles';
      document.head.appendChild(styleTag);
    }

    const customClassName = `.${styleTag.id} {${Object.entries(customcss).map(([key, value]) => {
      return `${key}: ${value};`;
    }).join(' ')}}`;

    styleTag.appendChild(document.createTextNode(customClassName));
  }

  return '';
};

export default Input;
