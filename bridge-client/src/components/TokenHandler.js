import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const TokenHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Store token in localStorage
      localStorage.setItem('notionToken', token);
      
      // Remove token from URL and navigate to home
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
};

export default TokenHandler; 