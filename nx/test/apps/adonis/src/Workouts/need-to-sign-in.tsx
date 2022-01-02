import { Grid, FormControl, InputLabel, MenuItem, Select, Container, CssBaseline, Box, Avatar, Typography, Card, CardContent, Button, CardActions } from '@mui/material';
import { BallotOutlined } from '@mui/icons-material';
export const NeedToSignIn = () => {
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
                    <BallotOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Workout
                </Typography>
                <Box sx={{ mt: 1 }}>
                    You need to sign in or sign up.
                </Box>
            </Box>
        </Container>
    );
};