import { useState, ChangeEvent } from 'react';
import './Input.css';
import { InputProps } from '../../types/types';

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  validate,
  name,
  errorMessage,
  customcss,
  buttonType,
  disabled = false,
}) => {
  const [error, setError] = useState<string>(errorMessage ?? '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const validateInput = (val: string) => {
    if (validate) {
      setError(validate(val));
    }
  };

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validateInput(e.target.value);
  };

  const baseClass = 'input';
  const inputClass = `${baseClass} ${baseClass}-${buttonType} ${isFocused ? `${baseClass}-focus` : ''} ${isHovered ? `${baseClass}-hover` : ''} ${error ? `${baseClass}-error` : ''} ${disabled ? `${baseClass}-disabled` : ''} ${customcss ?? ''}`.trim();


  return (
    <div className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${inputClass}`}
        disabled={disabled}
        name={name}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
