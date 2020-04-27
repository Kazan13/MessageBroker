import React from "react";
import styles from './header.module.css'
import {connect} from "react-redux";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div>
                <div className={styles.addChannelButton} onClick={() => {
                    props.onCreateChannelWindow()
                }}>
                    Creat new channel
                </div>
            </div>

            <div>
                <h2>Header</h2>
            </div>
        </header>
    );
}

export default connect(
    state => (
        {}
    ),
    dispatch => ({
        onCreateChannelWindow: () => {
            dispatch({type: 'SHOW_CREATE_CHANNEL_WINDOW'})
        },
    })
)(Header);