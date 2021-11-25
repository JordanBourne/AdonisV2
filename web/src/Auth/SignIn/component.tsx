import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { signIn } from './actions';
const LockOutlinedIcon = LockOutlined;

export const SignIn = () => {
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
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
    const emailValid = validateEmail(event);
    const passwordValid = validatePassword(event);
    return emailValid && passwordValid;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validity = validateForm(event);
    if (!validity) {
      return false;
    }
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    signIn({
      email: email as string,
      password: password as string
    });
    return false;
  };

  const EmailAddressField = ({ errorText }: { errorText: string }) => {
    return (
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        autoFocus
        error={errorText !== ''}
        helperText={errorText}
      />
    );
  };

  const PasswordField = ({ errorText }: { errorText: string }) => {
    return (
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        error={errorText !== ''}
        helperText={errorText}
      />
    );
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <EmailAddressField errorText={emailErrorText} />
          <PasswordField errorText={passwordErrorText} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
