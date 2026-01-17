import React from 'react';

const NavigationLinks = () => {
  return (
    <nav className="links" style={{
      display: 'block',
      width: '480px',
      height: '25.5938px',
      margin: '40px 0px 0px',
      padding: '0px',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '16px',
      color: 'rgb(0, 0, 0)',
    }}>
      <a 
        href="/photography" 
        className="nav-link"
        style={{
          display: 'inline',
          color: 'rgb(68, 68, 170)',
          fontSize: '16px',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
      >
        Photography
      </a>
      <span 
        className="separator" 
        style={{
          margin: '0 0.5rem',
          color: 'rgb(187, 187, 187)',
          fontSize: '0.8em',
        }}
      >
        •
      </span>
      <a 
        href="/writings" 
        className="nav-link"
        style={{
          display: 'inline',
          color: 'rgb(68, 68, 170)',
          fontSize: '16px',
          textDecoration: 'none',
          transition: 'opacity 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
      >
        Writings
      </a>
    </nav>
  );
};

export default NavigationLinks;