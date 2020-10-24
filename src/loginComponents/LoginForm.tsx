import Button from '@material-ui/core/Button/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';

export type LoginState = {
    username: string
    password: string
    incorrectCredentials: boolean
}

type LoginProps = {
    //TODO: Bad practice, fix later
    handleLogin: Function;
}

class LoginForm extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            username: '',
            password: '',
            incorrectCredentials: false
        };
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'password') {
            this.setState({ password: value })
        }
        else if (name === 'username') {
            this.setState({ username: value })
        }
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        this.props.handleLogin(this.state.username, this.state.password, this.passwordCallback)
    }


    passwordCallback = () => {
        this.setState({ incorrectCredentials: true });
    }

    render() {
        return (
            <form onSubmit={e => this.props.handleLogin(e, this.state.username, this.state.password, this.passwordCallback)}>
                <FormGroup>

                    {this.state.incorrectCredentials ? <div> unable to authenticate, check password</div> : null}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        onChange={this.handleChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Sign In
            </Button>
                </FormGroup>
            </form>
        );
    }
}

export default LoginForm;
