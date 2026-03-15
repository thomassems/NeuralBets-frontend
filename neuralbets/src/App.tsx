import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage';
import BettingPortal from './pages/BettingPortal';
import MyBets from './pages/MyBets';
import Models from './pages/Models';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portal" element={<BettingPortal />} />
            <Route path="/my-bets" element={<MyBets />} />
            <Route path="/models" element={<Models />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;