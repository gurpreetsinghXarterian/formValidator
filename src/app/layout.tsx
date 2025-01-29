import React, { ReactNode } from "react";
import "./global.css";
import { RootLayoutProps } from '../types/types'; 

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
