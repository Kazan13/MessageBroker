import React, {Component} from 'react';
import SignUp from "./components/auth/sign_up/sign_up";
import SignIn from "./components/auth/sign_in/sign_in";
import Content from "./components/content/content";
import Header from "./components/content/header/header";
import Footer from "./components/content/footer/footer";
import CreateChannelWindow from "./components/content/channels/createChannelWindow/createChannelWindow";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let messengerVisibleStyle = this.props.fetchState().isVisible ? {display: 'block'} : {display: 'none'};
        return (
            <div className="App">
                <SignUp/>
                <SignIn/>
                <div style={messengerVisibleStyle}>
                    <CreateChannelWindow/>
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </div>
        );
    }
}


export default connect(
    store => {
        if (store.modalWindow)
            return {
                messenger: store.modalWindow.messenger.isVisible
            }
        else
            return {messenger: false}
    },
    dispatch => ({
        fetchState: () => {
            dispatch({type: 'FETCH_STATE'})
        }
    })
)
(App);
