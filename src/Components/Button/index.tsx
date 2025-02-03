import './Button.css';
import { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({ onClick, children, customcss, buttonType = 'primary', disabled = false }) => {
  const baseClass = 'button';
  const buttonClass = `${baseClass} ${baseClass}-${buttonType}`;
  const finalClass = disabled ? `${buttonClass} ${baseClass}-disabled` : buttonClass;
  
  const customClass = customcss ?? '';
  
  const dynamicClass = `${finalClass} ${customClass}`.trim();
  console.log(dynamicClass);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${dynamicClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
