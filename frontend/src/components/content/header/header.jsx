import React from "react";
import styles from './header.module.css'
import {connect} from "react-redux";
import {Types} from "../../../redux/action-types/action-types";
import {logOutAction} from "../../../redux/actions/auth-actions";
import {getAllChannelsAction} from "../../../redux/actions/channels-actions";

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Header = (props) => {
    return (
        <header className={styles.header}>
            <div>
                <div className={styles.addChannelButton} onClick={() => {
                    props.onCreateChannelWindow()
                }}>Creat new channel</div>

                <div className={styles.logOutButton} onClick={() => {
                    props.onLogOut(props.token)
                }}>Log Out</div>

                <div className={styles.searchChannelsButton} onClick={() => {
                    props.onSearchChannelWindow(props.token.token)
                }}>Search Channels</div>
            </div>

            <div>
                <h2>Header</h2>
            </div>
        </header>
    );
}

export default connect(
    state => (
        {token: state.auth.token}
    ),
    dispatch => ({
        onCreateChannelWindow: () => {
            dispatch({type: Types.SHOW_CREATE_CHANNEL_WINDOW})
        },
        onLogOut: (token) => {
            dispatch(logOutAction(token))
        },
        onSearchChannelWindow: (token) => {
            dispatch(getAllChannelsAction(token))
        }
    })
)(Header);