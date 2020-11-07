import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';

import './LoginForm.scss'

export type LoginState = {
    username: string
    password: string
    incorrectCredentials: boolean
}

type LoginProps = {
    //TODO: Bad practice, fix later
    handleLogin: Function;
    signUp: Function;
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
            this.setState({ password: value });
        }
        else if (name === 'username') {
            this.setState({ username: value });
        }
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.handleLogin(this.state.username, this.state.password, this.passwordCallback);
    }


    passwordCallback = () => {
        this.setState({ incorrectCredentials: true });
    }

    handleSignUp = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.signUp(1);
    }


    render() {
        return (
            <div className="LoginFormComponent">
                <Avatar className="LoginFormComponentAvatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className="LoginForm" onSubmit={e => this.props.handleLogin(e, this.state.username, this.state.password, this.passwordCallback)}>
                    <FormGroup>

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
                            className="LoginFormButton"
                            onClick={this.handleSubmit}
                        >
                            Sign In
                        </Button>
                        {this.state.incorrectCredentials ? <div> unable to authenticate, check password</div> : null}
                    </FormGroup>
                    <div className="LoginFormOptionsBar">
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" onClick={this.handleSignUp}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div >
        );
    }
}

export default LoginForm;
