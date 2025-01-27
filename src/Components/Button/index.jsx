const Button = ({ onClick, children, dynamicStyle }) => {
    const defaultStyles = {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    };
  
    const buttonStyles = dynamicStyle
      ? { ...defaultStyles, ...dynamicStyle }
      : defaultStyles;
  
    return (
      <button
        type="button"
        onClick={onClick}
        style={buttonStyles}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  