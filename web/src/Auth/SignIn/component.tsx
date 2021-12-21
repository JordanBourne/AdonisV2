import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { signIn } from './actions';
import { useHistory } from 'react-router-dom';
import { fetchMyProfile, createProfile } from '../../Profile/actions';
const LockOutlinedIcon = LockOutlined;

export const SignIn = () => {
  const history = useHistory();
  const [usernameErrorText, setUsernameErrorText] = useState('');
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
    const usernameIsValid = validateUsername(event);
    const passwordValid = validatePassword(event);
    return usernameIsValid && passwordValid;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validity = validateForm(event);
    if (!validity) {
      return false;
    }
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    signIn({
      username: username as string,
      password: password as string
    }).then(() => {
      return fetchMyProfile()
       .catch((error : any) => {
        if (error?.code === 'PROFILE_NOT_FOUND') {
          return createProfile();
        }
        throw(error);
       })
    }).then(() => {
      return fetchMyProfile();
    }).then(() => {
      history.push('/home');
    });
    return false;
  };

  const UsernameField = ({ errorText }: { errorText: string }) => {
    return (
      <TextField
        margin='normal'
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
        autoComplete='username'
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
          <UsernameField errorText={usernameErrorText} />
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
