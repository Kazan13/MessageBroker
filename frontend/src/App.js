import React from 'react';
import SignUp from "./components/auth/sign_up/sign_up";
import SignIn from "./components/auth/sign_in/sign_in";
import SplashScreen from "./components/loading-window/splash-screen/splash-screen";
import Messenger from "./components/messenger/messenger";
import styles from "./App.module.css";

const App = (props) => {

    return (
        <div className={styles}>
            <SplashScreen/>
            <SignUp/>
            <SignIn/>
            <Messenger/>
        </div>
    );
};

export default App;



