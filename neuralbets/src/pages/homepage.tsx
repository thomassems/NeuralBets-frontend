import React from 'react';
import Header from '../components/Header';
import WelcomeBanner from '../components/WelcomeBanner';
import Footer from '../components/Footer';
import LiveOdds from '../components/LiveOdds';

const HomePage = () => {
    return (
        <div className='bg-mainblue'>
            <Header/>
            <WelcomeBanner/>
            <LiveOdds/>
            <Footer/>
        </div>
    );
}
export default HomePage;