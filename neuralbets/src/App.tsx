import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage';
import BettingPortal from './pages/BettingPortal';
import MyBets from './pages/MyBets';
import Models from './pages/Models';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ResponsibleGaming from './pages/ResponsibleGaming';
import Contact from './pages/Contact';
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
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;