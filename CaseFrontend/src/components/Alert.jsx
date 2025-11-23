/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Alert = ({ message, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer); 
    }
  }, [message, duration]);

  return (
    isVisible && (
      <div id="custom-alert" className="bg-green-500 text-white p-4 rounded shadow-lg">
        <p id="alert-message">{message}</p>
      </div>
    )
  );
};

export default Alert;