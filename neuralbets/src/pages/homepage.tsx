import React from 'react';
import Header from '../components/Header';
import WelcomeBanner from '../components/WelcomeBanner';
// import LiveOdds from '../components/LiveOdds';

const HomePage = () => {
    return (
        <div className='bg-mainblue h-screen'>
            <Header/>
            <WelcomeBanner/>
        </div>
    );
}
export default HomePage;