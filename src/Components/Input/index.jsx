import { useState, useEffect, useRef } from 'react';
import './Input.css';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  validate,
  name,
  errorMessage,
  customcss,
  buttonType = "primary",
  disabled
}) => {
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null); 

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

  const baseClass = "input";

  const uniqueClassName = `${baseClass}-${Math.random().toString(36).substr(2, 9)}`;

  const inputClass = `${baseClass} ${baseClass}-${buttonType} ${isFocused ? `${baseClass}-focus` : ''} ${isHovered ? `${baseClass}-hover` : ''} ${error ? `${baseClass}-error` : ''} ${disabled ? `${baseClass}-disabled` : ''} ${uniqueClassName}`;

  const customClass = customcss ? generateCustomClass(customcss, uniqueClassName) : '';

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
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const generateCustomClass = (customcss, className) => {
  let styleTag = document.getElementById('dynamic-styles');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamic-styles';
    document.head.appendChild(styleTag);
  }

  const customClassName = `.${className} {${Object.entries(customcss).map(([key, value]) => {
    return `${key}: ${value};`;
  }).join(" ")}}`;

  styleTag.appendChild(document.createTextNode(customClassName));

  return className;
};

export default Input;
