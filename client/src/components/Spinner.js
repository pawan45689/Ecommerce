import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, { state: { from: location.pathname } });
    }

    return () => clearInterval(interval);
  }, [count, navigate, path, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Redirecting in {count} seconds...</h1>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mt-4"></div>
    </div>
  );
};

export default Spinner;
