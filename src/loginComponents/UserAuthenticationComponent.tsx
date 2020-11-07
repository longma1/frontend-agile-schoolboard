import Container from '@material-ui/core/Container/Container';
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

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const generateForm = () => {
        if (value === 0) {
            return (<LoginForm handleLogin={props.handleLogin} signUp={handleChange} />)
        }
        else {
            return (<SignupForm handleSignup={props.handleSignup} />)
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
