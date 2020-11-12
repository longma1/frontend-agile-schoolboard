import React from 'react';
import connectionManager from './apiComponents/ConnectionManager'
import UserAuthenticationComponent from './loginComponents/UserAuthenticationComponent'
import { SignupState } from './loginComponents/SignupForm'
import MainApp from './coreAppComponents/MainApp';

type AppState = {
    signedOn: Boolean
}

class App extends React.Component<{}, AppState> {
    constructor(props = {}) {
        super(props);
        let signedin = connectionManager.checkTokenExpiration();

        this.state = { signedOn: signedin };
    }

    handleLogout = () => {
        //localStorage.removeItem('token');
        connectionManager.logout();
        this.setState({ signedOn: false });
    };

    /**
     * 
     * @param username username input
     * @param password password input
     */
    handleLogin = (username: string, password: string, incorrect_password_callback: Function) => {
        connectionManager.login(username, password, this.loginCallback.bind(this, incorrect_password_callback));
    }

    handleSignup = (e: Event, signupInfo: SignupState, incorrect_password_callback: Function) => {
        e.preventDefault();
        connectionManager.signUp(signupInfo, this.signupCallback.bind(this));
    }

    signupCallback(success: Boolean, username: string, password: string) {
        if (success) {
            connectionManager.login(username, password, this.signupLoginCallback.bind(this));
        }
    }

    signupLoginCallback(logged_in: boolean) {
        if (logged_in) {
            console.log(logged_in);
            this.setState({ signedOn: true });
        }
    }

    loginCallback(incorrect_password_callback: Function, logged_in: boolean) {
        if (logged_in) {
            this.setState({ signedOn: true });
        }
        else {
            incorrect_password_callback();
        }

    }

    render() {
        return (
            <div className='App'>
                {
                    this.state.signedOn ? <MainApp /> :
                        <UserAuthenticationComponent
                            handleLogin={this.handleLogin}
                            handleSignup={this.handleSignup}
                        />
                }
            </div >
        )
    }
}

export default App;
