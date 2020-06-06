import React from "react";
import styles from "./channel.module.css"
import {connect} from "react-redux";
import {Types} from "../../../../redux/action-types/action-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

/**
 * Канал для списка каналов
 * @param props
 * @returns {*}
 * @constructor
 */
const Channel = (props) => {
    return (
        <div className={styles.channel}
             onClick={() => props.onCurrentChannel(props.channel.id)}>
            <div className={styles.avatar}>
                <div >{props.channel.channelName.charAt(0)+props.channel.channelName.charAt(1)}</div>
            </div>
            <div className={styles.channelName}>
                {props.channel.channelName}
            </div>
        </div>
    )
};


export default connect(
    state => ({}),
    dispatch => ({
        onCurrentChannel: (id) => {
            dispatch({type: Types.SELECT_CURRENT_CHANNEL, payload: id})
        }
    })
)(Channel);
