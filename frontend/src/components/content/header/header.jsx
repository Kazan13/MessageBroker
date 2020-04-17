import React, {Component} from "react";
import styles from './header.module.css'
import {connect} from "react-redux";

class Header extends Component{
    render() {
        return (
            <header className={styles.header}>
                <div>
                    <div className={styles.addChannelButton} onClick={
                        this.props.onShowCreateChannelWindow
                    }>
                        Creat new channel
                    </div>
                </div>

                <div>
                    <h2>Header</h2>
                </div>
            </header>
        );
    }


}

export default connect(
    state => ({state: state.createNewChannelWindow}),
    dispatch => ({
        onShowCreateChannelWindow: () => {
            dispatch({type: 'SHOW_CREATE_CHANNEL_WINDOW', payload: true})
        },
    })
)(Header);