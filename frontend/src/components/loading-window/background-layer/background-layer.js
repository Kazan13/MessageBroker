import React from "react";
import styles from "./background-layer.module.css"
import {connect} from "react-redux";

/**
 * BackgroundLayer для затемнения фона
 * во время открытия окна
 *
 * @param props
 * @returns {*}
 */

const BackgroundLayer = (props) => {
    let visibleStyle = props.isVisible ? {display: 'flex'} : {display: 'none'};

    return (
        <div style={visibleStyle} className={styles.bgLayer}/>
    )
};

export default connect(
    state => ({
        isVisible: state.modalWindow.backgroundLayer.isVisible
    }),
)(BackgroundLayer);