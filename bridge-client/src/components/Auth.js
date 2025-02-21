import React from 'react';

const Auth = () => {
  const handleNotionAuth = async () => {
    // Redirect to backend auth endpoint
    window.location.href = 'http://localhost:3005';
  };

  const isAuthenticated = !!localStorage.getItem('notionToken');

  return (
    <button 
      onClick={handleNotionAuth}
      className="notion-auth-button"
      style={{
        padding: '10px 20px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
        alt="Notion Logo" 
        style={{ width: '20px', height: '20px' }}
      />
      {isAuthenticated ? 'Connected to Notion' : 'Sign in with Notion'}
    </button>
  );
};

export default Auth;
