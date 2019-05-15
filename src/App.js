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
          //intentionally left blank
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
