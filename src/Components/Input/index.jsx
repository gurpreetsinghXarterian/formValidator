import { useState, useEffect } from 'react';

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  dynamicStyle,
  validate,
  name,
  errorMessage
}) => {
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultStyles = {
    padding: '10px',
    fontSize: '16px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const inputStyles = dynamicStyle
    ? { ...defaultStyles, ...dynamicStyle }
    : defaultStyles;

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

  return (
    <div style={styles.inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...inputStyles,
          borderColor: error
            ? '#e74c3c'
            : isFocused
              ? '#6452ec'
              : isHovered
                ? '#aaa'
                : '#ccc',
          boxShadow: error
            ? '0 0 5px rgba(231, 76, 60, 0.6)'
            : isFocused
              ? '0 0 5px rgba(100, 82, 236, 0.6)'
              : isHovered
                ? '0 0 5px rgba(100, 82, 236, 0.3)'
                : 'none',
        }}
      />
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  inputContainer: {
    width: '100%',
    margin: '10px 0',
  },
  error: {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '5px',
  },
};

export default Input;
