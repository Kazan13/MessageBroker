import React, {Component} from "react";
import styles from "./createChannelWindow.module.css"

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
        let windowVisibleStile = this.props.window ? {display: 'flex'} : {display: 'none'};
        return (
            <div style={windowVisibleStile}
                 className={styles.layer}>
                <div className={styles.window}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>Create new channel</div>
                        <div className={styles.closeButton}
                             onClick={() => {
                                 this.props.dataController.hideNewChannelWindow();
                             }}>X
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

export default CreateChannelWindow;