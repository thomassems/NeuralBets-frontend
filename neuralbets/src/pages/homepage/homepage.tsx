import React from 'react';
import Header from '../../components/Header/Header';
import WelcomeBanner from '../../components/WelcomeBanner/WelcomeBanner';
import styles from './homepage.module.css';

const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <Header/>
            <WelcomeBanner/>
             <h1 className="text-3xl font-bold underline text-red-500">
      Hello world!
    </h1>
        </div>
    );
}
export default HomePage;

// can you design me the login page of a paper trading sports betting platform. 
// i want the home page to be a darker theme. it should maybe display some sports 
// + odds, and it should have a sign up login button in the top right