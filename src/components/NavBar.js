import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
          <Typography variant="h4" color="inherit">
              Gist Explorer
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;