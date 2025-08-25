import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color={'secondary'} position="static">
        <Toolbar>
           <Grid container justifyContent={'flex-end'}>
            {user ? 
             <Button onClick={() => auth.signOut()} color="inherit">Exit</Button>
              :
               <NavLink to={LOGIN_ROUTE } >
              <Button color="inherit">Login</Button>
              </NavLink>
            }
           </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
