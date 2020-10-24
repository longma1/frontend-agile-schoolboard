import { AppBar, Tabs, Tab } from '@material-ui/core';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './UserAuthenticationComponent.scss'

type UserAuthenticationProps = {
    handleLogin: Function,
    handleSignup: Function
};

function UserAuthenticationComponent(props: UserAuthenticationProps) {
    const [value, setValue] = useState(0);

    const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const generateForm = () => {
        if (value === 0) {
            return (<LoginForm handleLogin={props.handleLogin} />)
        }
        else {
            return (<SignupForm handleSignup={props.handleSignup} />)
        }
    }

    return (
        <div className="authenticate-component">
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Log In" />
                    <Tab label="Sign Up" />
                </Tabs>
            </AppBar>
            {generateForm()}
        </div >
    );
}

export default UserAuthenticationComponent;
