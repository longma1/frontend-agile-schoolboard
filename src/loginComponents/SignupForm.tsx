import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid/Grid';
import Link from '@material-ui/core/Link/Link';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';

import { LOG_IN_AUTHENTICATION } from './UserAuthenticationComponent';

import './SignupForm.scss'

type SignupProps = {
    handleSignup: Function
    changeDisplayedForm: Function
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

    handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.changeDisplayedForm(LOG_IN_AUTHENTICATION);
    }

    handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.handleSignup(e, this.state)
    }


    handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let checked = e.target.checked;
        let name = e.target.name;
        switch (name) {
            case 'isTeacher':
                this.setState({ is_teacher: checked });
                break
            case 'isStudent':
                this.setState({ is_student: checked });
                break
        }
    }

    render() {
        return (
            <div className="SignupFormComponent">
                <Avatar className="SignupFormComponentAvatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className="SignupForm">
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            onChange={this.handleChange}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.is_student} onChange={this.handleCheckBoxChange} name="isStudent" />}
                                label="I am a student"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.is_teacher} onChange={this.handleCheckBoxChange} name="isTeacher" />}
                                label="I am a teacher"
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="SignupFormButton"
                            onClick={this.handleSubmit}
                        >
                            Sign In
                        </Button>
                    </FormGroup>
                </form>
                <Grid container justify="flex-end">
                    <div className='SignupFormOptionsBar'>
                        <Grid item>
                            <Link variant="body2" onClick={this.handleLogin}>
                                Already have an account? Sign in
                        </Link>
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default SignupForm