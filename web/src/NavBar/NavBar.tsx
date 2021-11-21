import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import './navBar.css'

export const NavBar = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Adonis
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="small" color="inherit">
              <NavLink activeStyle={{ textDecoration: 'underline' }} className="navBarButton" to="/home">Home</NavLink>
            </IconButton>
            <IconButton size="small" color="inherit">
              <NavLink activeStyle={{ textDecoration: 'underline' }} className="navBarButton" to="/workout">Workout</NavLink>
            </IconButton>
            <IconButton size="small" color="inherit">
              <NavLink activeStyle={{ textDecoration: 'underline' }} className="navBarButton" to="/programs">Programs</NavLink>
            </IconButton>
            <IconButton size="small" color="inherit">
              <NavLink activeStyle={{ textDecoration: 'underline' }} className="navBarButton" to="/calendar">Calendar</NavLink>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
