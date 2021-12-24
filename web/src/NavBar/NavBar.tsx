import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Button, Toolbar, IconButton, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './navBar.css'

import { selectMyUsername } from '../Auth/selectors';
import { logOut } from '../Auth/actions';

export const SignInButton = () => {
  const username = useSelector(selectMyUsername);
  if (username) {
    return (
      <IconButton size="small" color="inherit" onClick={logOut}>
        Logout
      </IconButton>
    );
  }
  return (
    <IconButton size="small" color="inherit">
      <NavLink style={isActive => isActive ? { textDecoration: 'underline' } : {}} className="navBarButton" to="/signin">Sign in</NavLink>
    </IconButton>
  );
};

export const NavBar = () => {
  const username = useSelector(selectMyUsername);
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
            <SignInButton />
            {username && (<IconButton size="small" color="inherit">
              <NavLink style={isActive => isActive ? { textDecoration: 'underline' } : {}} className="navBarButton" to="/home">Home</NavLink>
            </IconButton>)}
            {username && (<IconButton size="small" color="inherit">
              <NavLink style={isActive => isActive ? { textDecoration: 'underline' } : {}} className="navBarButton" to="/workout">Workout</NavLink>
            </IconButton>)}
            {username && (<IconButton size="small" color="inherit">
              <NavLink style={isActive => isActive ? { textDecoration: 'underline' } : {}} className="navBarButton" to="/programs">Programs</NavLink>
            </IconButton>)}
            {username && (<IconButton size="small" color="inherit">
              <NavLink style={isActive => isActive ? { textDecoration: 'underline' } : {}} className="navBarButton" to="/calendar">Calendar</NavLink>
            </IconButton>)}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
