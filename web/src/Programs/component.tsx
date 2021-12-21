import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Typography, Box, Avatar, CssBaseline, Card, CardContent, CardActions, Button } from '@mui/material';
import { BallotOutlined } from '@mui/icons-material';

import { registerForProgram } from './component-actions';
import { selectAllPrograms } from './selectors';

const styles = {
    setCounter: {
        border: '1px solid #AAA',
        height: '40px',
        width: '40px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 5px 0 5px'
    },
    completedSet: {
        backgroundColor: '#0bdd0861'
    }
}

export const Programs = () => {
    const allPrograms = useSelector(selectAllPrograms);
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
                    Programs
                </Typography>
                <Box sx={{ mt: 1 }}>
                    {allPrograms.map(program => (
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {program.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {program.name}
                                </Typography>
                                <Typography variant="body2">
                                    {program.descriptions.map((description : string, idx : number) => {
                                        if (idx === 0) return description;
                                        return (
                                            <React.Fragment>
                                                <br /> {description}
                                            </React.Fragment>
                                        );
                                    })}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => registerForProgram(program)}>Register</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};