import React from 'react';
import AuthModal from './auth-modal';

const headerStyle = {
  backgroundColor: '#222',
  padding: '10px',
  display: 'flex',
};

const logoStyle = {
  color: 'white',
  margin: 0,
  marginTop: '-3px',
  marginLeft: '10px',
};

const Header = () => (
  <header style={headerStyle}>
    <h1 style={logoStyle}>cp</h1>
    <div style={{ flex: 1 }} />
    <AuthModal />
  </header>
);

export default Header;
