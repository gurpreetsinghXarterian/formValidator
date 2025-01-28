import { useState, useEffect, ReactNode } from 'react';
import './Button.css';

// Define types for the component props
interface ButtonProps {
  onClick: () => void;
  children: ReactNode; // This allows you to pass any type of content (strings, JSX, etc.) as the button label
  customcss?: React.CSSProperties; // Custom inline styles for the button
  buttonType?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'disabled' // Possible button types
  disabled?: boolean; // Optional disabled state for the button
}

const Button: React.FC<ButtonProps> = ({ onClick, children, customcss, buttonType = 'primary', disabled = false }) => {
  const [uniqueClassName, setUniqueClassName] = useState<string>('');

  useEffect(() => {
    const uniqueClass = `button-${Math.random().toString(36).substr(2, 9)}`;
    setUniqueClassName(uniqueClass);

    if (customcss) {
      generateCustomClass(customcss, uniqueClass);
    }
  }, [customcss]);

  const baseClass = 'button';
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

// Helper function to generate dynamic custom CSS
const generateCustomClass = (customcss: React.CSSProperties, className: string): void => {
  let styleTag = document.getElementById('dynamic-button-styles') as HTMLStyleElement;
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamic-button-styles';
    document.head.appendChild(styleTag);
  }

  const customClassName = `.${className} {${Object.entries(customcss)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')}}`;

  styleTag.appendChild(document.createTextNode(customClassName));
};

export default Button;
