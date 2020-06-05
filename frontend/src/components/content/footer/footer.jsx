import React from "react";
import classes from './footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div>Developed by <a href="https://github.com/ceasar13m">ceasar13m</a></div>
            <div>2019 - {(new Date()).getFullYear()}</div>
        </footer>
    );
}

export default Footer;