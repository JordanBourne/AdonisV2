import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Alert } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as styles from './styles';
import { signUp } from './actions';
const LockOutlinedIcon = LockOutlined;

const theme = createTheme();

export const SignUp = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const validateUsername = (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        if (username === '') {
            setUsernameErrorText('Username is a required field');
            return false;
        }
        setUsernameErrorText('');
        return true;
    };
    const validateEmail = (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        if (email === '') {
            setEmailErrorText('Email is a required field');
            return false;
        }
        setEmailErrorText('');
        return true;
    };
    const validatePassword = (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const password = data.get('password');
        if (password === '') {
            setPasswordErrorText('Password is a required field');
            return false;
        }
        setPasswordErrorText('');
        return true;
    };
    const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
        const usernameValid = validateUsername(event);
        const emailValid = validateEmail(event);
        const passwordValid = validatePassword(event);
        return usernameValid && emailValid && passwordValid;
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validity = validateForm(event);
        if (!validity) {
            return false;
        }
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');
        signUp({
            username: username as string,
            email: email as string,
            password: password as string
        }).then(() => {
            setIsSuccess(true);
        });
        return false;
    };

    const UsernameField = ({errorText}:{errorText:string}) => {
        return (
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    name='username'
                    autoComplete='username'
                    error={errorText !== ''}
                    helperText={errorText}
                />
            </Grid>
        );
    };

    const EmailField = ({errorText}:{errorText:string}) => {
        return (
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    error={errorText !== ''}
                    helperText={errorText}
                />
            </Grid>
        );
    };

    const PasswordField = ({errorText}:{errorText:string}) => {
        return (
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    error={errorText !== ''}
                    helperText={errorText}
                />
            </Grid>
        );
    };

    const SuccessMessage = () => {
        return ( <Alert severity="success">Signup successful! <br /> A verification email was sent to you. <br /> But really you need to ask Dan to confirm your user for now.</Alert> );
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={styles.SignupBox} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <UsernameField errorText={usernameErrorText} />
                            <EmailField errorText={emailErrorText} />
                            <PasswordField errorText={passwordErrorText} />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        {isSuccess && ( <SuccessMessage /> )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};