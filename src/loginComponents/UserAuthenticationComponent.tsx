import Container from '@material-ui/core/Container/Container';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './UserAuthenticationComponent.scss'

export const SIGN_UP_AUTHENTICATION = 1;

export const LOG_IN_AUTHENTICATION = 0;

type UserAuthenticationProps = {
    handleLogin: Function,
    handleSignup: Function
};

function UserAuthenticationComponent(props: UserAuthenticationProps) {
    const [value, setValue] = useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const generateForm = () => {
        if (value === LOG_IN_AUTHENTICATION) {
            return (<LoginForm handleLogin={props.handleLogin} changeDisplayedForm={handleChange} />)
        }
        else {
            return (<SignupForm handleSignup={props.handleSignup} changeDisplayedForm={handleChange} />)
        }
    }

    return (
        <div className="AuthenticateComponent">
            <Container maxWidth="xs">
                {generateForm()}
            </Container>
        </div >
    );
}

export default UserAuthenticationComponent;
