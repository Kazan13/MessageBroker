import React from "react";
import styles from "./channel.module.css"
import {connect} from "react-redux";
import {Types} from "../../../../redux/action-types/action-types";

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
            <div className={styles.img}>
                <img src="https://i.ibb.co/YywFDHg/2020-05-04-22-39-01.jpg" alt="2020-05-04-22-39-01" border="0"/>
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
