import React from "react";
import styles from './header.module.css'
import {connect} from "react-redux";
import {Types} from "../../../redux/action-types/action-types";
import {logOutAction} from "../../../redux/actions/auth-actions";
import {getAllChannelsAction} from "../../../redux/actions/channels-actions";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Header = (props) => {
    return (
        <div className={styles.header}>
            <Box className={styles.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.searchChannelsButton}
                    onClick={() => {
                        props.onSearchChannelWindow(props.token.token)
                    }}><p>Search</p>
                </Button>


                <Button
                    variant="contained"
                    color="primary"
                    className={styles.addChannelButton}
                    onClick={() => {
                        props.onCreateChannelWindow()
                    }}><p>New Channel</p>
                </Button>


                <Button
                    variant="contained"
                    color="secondary"
                    className={styles.logOutButton}
                    onClick={() => {
                        props.onLogOut(props.token)
                    }}><p>Log Out</p>

                </Button>
            </Box>
        </div>
    );
}

export default connect(
    state => (
        {token: state.auth.token}
    ),
    dispatch => ({
        onCreateChannelWindow: () => {
            dispatch({type: Types.SHOW_CREATE_CHANNEL_WINDOW});
            dispatch({type: Types.SHOW_BG_LAYER});
        },
        onLogOut: (token) => {
            dispatch(logOutAction(token))
        },
        onSearchChannelWindow: (token) => {
            dispatch(getAllChannelsAction(token));
            dispatch({type: Types.SHOW_BG_LAYER});
        }
    })
)(Header);