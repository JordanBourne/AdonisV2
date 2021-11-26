import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Alert } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { confirmRegistration } from './actions';
import * as styles from './styles';
import { getCurrentUsername } from '../selectors';
const LockOutlinedIcon = LockOutlined;

const theme = createTheme();

export const EnterConfirmationCode = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [confirmationCodeErrorText, setConfirmationCodeErrorText] = useState('');
    const username = useSelector(getCurrentUsername);
    const validateConfirmationCode = (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const confirmationCode = data.get('confirmationCode');
        if (confirmationCode === '') {
            setConfirmationCodeErrorText('Confirmation Code is a required field');
            return false;
        }
        setConfirmationCodeErrorText('');
        return true;
    };
    const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
        const usernameValid = validateConfirmationCode(event);
        return usernameValid;
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validity = validateForm(event);
        if (!validity) {
            return false;
        }
        const data = new FormData(event.currentTarget);
        const confirmationCode = data.get('confirmationCode');
        confirmRegistration({
            confirmationCode: confirmationCode as string,
            username: username as string,
        }).then(() => {
            setIsSuccess(true);
        });
        return false;
    };

    const ConfirmationCodeField = ({errorText}:{errorText:string}) => {
        return (
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id='confirmationCode'
                    label='confirmationCode'
                    name='confirmationCode'
                    autoComplete='confirmationCode'
                    error={errorText !== ''}
                    helperText={errorText}
                />
            </Grid>
        );
    };

    const SuccessMessage = () => {
        return ( <Alert severity="success">Success! Click <a href='/home'>here</a>.</Alert> );
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
                        Hello {username},
                        <br /> Please confirm your registration
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <ConfirmationCodeField errorText={confirmationCodeErrorText} />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirm Registration
                        </Button>
                        {isSuccess && ( <SuccessMessage /> )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};