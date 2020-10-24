import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';

type SignupProps = {
    handleSignup: Function
};

export type SignupState = {
    username: string
    password: string
    email: string
    first_name: string
    last_name: string
    is_teacher: boolean
    is_student: boolean
};

class SignupForm extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
            is_teacher: false,
            is_student: false
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'username':
                this.setState({ username: value });
                break
            case 'password':
                this.setState({ password: value });
                break
            case 'email':
                this.setState({ email: value });
                break
            case 'firstName':
                this.setState({ first_name: value });
                break
            case 'lastName':
                this.setState({ last_name: value });
                break
        }
    }

    handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.checked;
        switch (name) {
            case 'isTeacher':
                this.setState({ is_teacher: value });
                break
            case 'isStudent':
                this.setState({ is_student: value });
                break
        }
    }

    render() {
        return (
            <form onSubmit={e => this.props.handleSignup(e, this.state)}>
                <FormGroup>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="isTeacher">I am a teacher</label>
                    <input
                        type="checkbox"
                        name="isTeacher"
                        value={this.state.last_name}
                        onChange={this.handleToggle}
                    />
                    <label htmlFor="isStudent">I am a student</label>
                    <input
                        type="checkbox"
                        name="isStudent"
                        value={this.state.last_name}
                        onChange={this.handleToggle}
                    />
                    <input type="submit" value="Sign Up" />
                </FormGroup>
            </form>)
    }
}

export default SignupForm