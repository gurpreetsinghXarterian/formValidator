import { useRef, useEffect } from 'react';
import './Button.css';
import { generateCustomClass } from '../../utils/genericCustomClass';
import { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({ onClick, children, customcss, buttonType = 'primary', disabled = false }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (customcss && buttonRef.current) {
      generateCustomClass(customcss, buttonRef);
    }
  }, [customcss]);

  const baseClass = 'button';
  const buttonClass = `${baseClass} ${baseClass}-${buttonType}`;
  const finalClass = disabled ? `${buttonClass} ${baseClass}-disabled` : buttonClass;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${finalClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
