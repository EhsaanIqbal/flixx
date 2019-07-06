import React,{useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PlaylistPlay from '@material-ui/icons/PlaylistPlay';
import Tv from '@material-ui/icons/Tv';
import LocalMovies from '@material-ui/icons/LocalMovies';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'

import Search from './Search'
import {
 List, ListItem, Grid, SwipeableDrawer
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color:'red',
    fontFamily:'Roboto',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));
const styles = {
  paper: {
    background: "black",
    color:"white"
  }
}
const Navbar=(props)=> {
const classes = useStyles();
const {isAuthenticated,user} = props.auth;
const [drawerActivate, setDrawerActivate] = useState(false);
const [drawer, setDrawer] = useState(false);
const [anchorEl, setAnchorEl] = useState(null);

useEffect(()=>{
  if(window.innerWidth <= 600){
    setDrawerActivate(true)
  }
  window.addEventListener('resize',()=>{
    if(window.innerWidth <= 600){
    setDrawerActivate(true)
    }
    else{
    setDrawerActivate(false)
    }
  })
  });



  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);

  }
  function handleLogout(e) {
    setAnchorEl(null);
    e.preventDefault();
    props.logoutUser();

  }

const authLinks =(
  <div>


     <Button style={{color:'#FF0000'}} href="/tv"><Tv/>TV</Button>
     <Button style={{color:'#FF0000'}} href="/"><LocalMovies/>Movies</Button>
     <Button  style={{color:'#FF0000'}} href="/watchlist"><PlaylistPlay/>Watch List</Button>
   <Button
       aria-owns={anchorEl ? 'simple-menu' : undefined}
       aria-haspopup="true"
       onClick={handleClick}
       color="secondary"
     >
     <AccountCircle style={{color:'#FF0000'}}/>
     {props.auth.user.username}
     </Button>
     <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
         <MenuItem onClick={handleLogout}>Logout</MenuItem>
     </Menu>
   </div>

);
const guestLinks =(
  <div>
    <Button style={{color:'#FF0000'}} href="/tv"><Tv/>TV</Button>
    <Button style={{color:'#FF0000'}} href="/"><LocalMovies/>Movies</Button>

   <Button
       aria-owns={anchorEl ? 'simple-menu' : undefined}
       aria-haspopup="true"
       onClick={handleClick}
       color="secondary"
     >
     <AccountCircle style={{color:'#FF0000'}}/>
     </Button>
     <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
       <MenuItem><a style={{textDecoration:'none', color:'black'}} href="/register">Sign up</a></MenuItem>
       <MenuItem><a style={{textDecoration:'none', color:'black'}} href="/login">Login</a></MenuItem>
     </Menu>

   </div>

);



const bigscreen=()=>{
  return (
    <div className={classes.root}>
      <AppBar position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <div className={classes.title} >
        <Link to="/"><img style={{width:"100px",height:"41px"}} src="https://i.ibb.co/p1dnmyX/Capture4.png"/></Link>
        </div>
        {isAuthenticated ? authLinks : guestLinks}
        <div><Search/></div>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const smallscreen =() =>{
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar  position="static"  style={{ background: 'transparent', boxShadow: 'none'}} >
        <Toolbar>
          <Grid container
  direction="row"
  justify="space-between"
  alignItems="center">
            <Grid item>
              <MenuIcon fontSize="large" onClick={()=>{setDrawer(true)}} />
            </Grid>

            <Grid item >
            <Link to="/"><img style={{width:"95px",height:"38px"}} src="https://i.ibb.co/p1dnmyX/Capture4.png"/></Link>
            </Grid>

            <Grid item>
              <Typography></Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
       classes={{ paper: classes.paper }}
       open={drawer}
       onClose={()=>{setDrawer(false)}}
       onOpen={()=>{setDrawer(true)}} >

         <div tabIndex={0} role="button">

        <List>
              <ListItem key = {1}>
              <div><Search/></div>
                </ListItem>

              <ListItem key={5}>
               {isAuthenticated ?
                 <div>
                   <Button
             aria-owns={anchorEl ? 'simple-menu' : undefined}
             aria-haspopup="true"
             onClick={handleClick}
             color="secondary"
           >
           <AccountCircle style={{color:'#FF0000'}}/>
           {props.auth.user.username}
           </Button>
           <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
           </Menu>

                 </div>

               : <div>
               <Button
         aria-owns={anchorEl ? 'simple-menu' : undefined}
         aria-haspopup="true"
         onClick={handleClick}
         color="secondary"
       >
       <AccountCircle style={{color:'#FF0000'}}/>
       <span style={{color:'transparent'}}>USER</span>
       </Button>
       <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
         <MenuItem><a style={{textDecoration:'none', color:'black'}} href="/register">Sign up</a></MenuItem>
         <MenuItem><a style={{textDecoration:'none', color:'black'}} href="/login">Login</a></MenuItem>
       </Menu>
             </div>}
               </ListItem>

               <ListItem key = {2}>  <Button style={{color:'#FF0000'}} href="/tv"><Tv/>TV</Button> </ListItem>
               <ListItem key = {3}>  <Button style={{color:'#FF0000'}} href="/"><LocalMovies/>Movies</Button> </ListItem>
               <ListItem key={4}>
              {isAuthenticated ?
              <Button  style={{color:'#FF0000'}} href="/watchlist"><PlaylistPlay/>Watch List</Button>
              : null}
              </ListItem>
           </List>
       </div>
     </SwipeableDrawer>
    </div>
  );
}


return(
  <div>
    {drawerActivate ? smallscreen() : bigscreen()}
  </div>
);
}



const mapStateToProps =(state)=>({
  auth:state.auth
})
export default connect(mapStateToProps,{logoutUser})(withStyles(styles)(Navbar));
