import { useState, useEffect } from 'react';
import './Button.css';

const Button = ({ onClick, children, customcss, buttonType = "primary", disabled }) => {
  const [uniqueClassName, setUniqueClassName] = useState('');

  useEffect(() => {
    const uniqueClass = `button-${Math.random().toString(36).substr(2, 9)}`;
    setUniqueClassName(uniqueClass);

    if (customcss) {
      generateCustomClass(customcss, uniqueClass);
    }
  }, [customcss]);

  const baseClass = "button";
  
  const buttonClass = `${baseClass} ${baseClass}-${buttonType}`;
  
  const finalClass = disabled ? `${buttonClass} ${baseClass}-disabled` : buttonClass;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${finalClass} ${uniqueClassName}`}
    >
      {children}
    </button>
  );
};

const generateCustomClass = (customcss, className) => {
  let styleTag = document.getElementById('dynamic-button-styles');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamic-button-styles';
    document.head.appendChild(styleTag);
  }

  const customClassName = `.${className} {${Object.entries(customcss).map(([key, value]) => {
    return `${key}: ${value};`;
  }).join(" ")}}`;

  styleTag.appendChild(document.createTextNode(customClassName));
};

export default Button;
