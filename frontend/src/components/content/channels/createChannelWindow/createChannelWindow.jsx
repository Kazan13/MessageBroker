import React, {Component} from "react";
import styles from "./createChannelWindow.module.css"
import {connect} from "react-redux";

class CreateChannelWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            name: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.name.length) {
            return;
        }
        const message = {
            token: this.props.token,
            command: 'CREATE_NEW_CHANNEL',
            data: JSON.stringify({channelName: this.state.name})
        };

        this.props.dataController.createChannel(message);

        this.setState(state => ({
            ...this.state,
            name: ''
        }));
    }

    render() {
        console.log(this.props.state)
        let windowVisibleStile = this.props.createChannelWindow ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={windowVisibleStile}
                 className={styles.layer}>
                <div className={styles.window}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Create new channel</div>
                        <div className={styles.closeButton}
                             onClick={
                                 this.props.onCreateChannelWindow
                             }>X
                        </div>
                    </div>

                    <div className={styles.form}>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.name}/>
                            <button>create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({createChannelWindow: state.createChannelWindow}),
    dispatch => ({
        onCreateChannelWindow: () => {
            dispatch({type: 'HIDE_CREATE_CHANNEL_WINDOW', payload: false})
        },
    })
)(CreateChannelWindow);