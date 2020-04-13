import React, {Component} from "react";
import styles from './header.module.css'

class Header extends Component{
    render() {
        return (
            <header className={styles.header}>
                <div>
                    <div className={styles.addChannelButton} onClick={() => {
                        this.props.dataController.showNewChannelWindow();
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


}

export default Header;