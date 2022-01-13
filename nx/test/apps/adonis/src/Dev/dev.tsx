import React, { SetStateAction, useState } from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, Container, CssBaseline, Box, Avatar, Typography, Card, CardContent, Button, CardActions } from '@mui/material';
import { BallotOutlined } from '@mui/icons-material';

import { latestOrmMigration } from './component-actions';

import { SetDb } from '../Sets/types';
import { OrmDb } from '../Orms/types';

export const Dev = () => {
    return (
        <Grid container sx={{ padding: '20px'}}>
            <Button variant="contained" onClick={() => latestOrmMigration()}>Latest Orms Migration</Button>
        </Grid>
    )
};