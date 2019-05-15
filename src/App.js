import React, {Component} from "react";
import {View} from "react-native";
import fireBase from 'firebase';
import {Button, CardSection, Header, Spinner} from "./components/common";
import LoginForm from './components/LoginForm';

export default class App extends Component {
    state = {
        loggedIn: null
    };

    componentWillMount() {
        fireBase.initializeApp({
            apiKey: "AIzaSyCcTYzRNDuy7R5cyuipla4sJPxWLkgMN_w",
            authDomain: "auth-ecde6.firebaseapp.com",
            databaseURL: "https://auth-ecde6.firebaseio.com",
            projectId: "auth-ecde6",
            storageBucket: "auth-ecde6.appspot.com",
            messagingSenderId: "1068653381734",
            appId: "1:1068653381734:web:2831b6a63ebc0f91"
        });

        fireBase.auth().onAuthStateChanged(user => {
            if (user) {
                return this.setState({loggedIn: true})
            } else {
                return this.setState({loggedIn: false})
            }
        });
    };

    get renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (<CardSection>
                    <Button onPress={() => fireBase.auth().signOut()}>
                        Log Out
                    </Button>
                </CardSection>);
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size="large"/>
        }
    };

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent}
            </View>
        )
    }
};