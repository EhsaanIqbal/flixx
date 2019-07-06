import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../actions/authActions';
import {withRouter} from 'react-router-dom';

//styling
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,

    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },


}));



//Main
const Register = (props) => {

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
                const newUser={
                  username:inputs.username,
                  password:inputs.password,
                  email:inputs.email
            }
             //register user action
        props.registerUser(newUser,props.history);
      }
    }

    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

  const classes = useStyles();

  useEffect(()=>{
    if(props.auth.isAuthenticated) {
      props.history.push('/');
    }
    if(props.errors) {
      setErrors(props.errors)
    }

  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={inputs.username}
                autoFocus
                onChange={handleInputChange}


              />
              <p style={{color:'red'}}>{errors.name}</p>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputs.email}
              onChange={handleInputChange}
              />
              <p style={{color:'red'}}>{errors.email}</p>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                placeholder="Should be at least six characters long"
                type="password"
                id="password"
                value={inputs.password}
                onChange={handleInputChange}
                autoComplete="current-password"

              />
            </Grid>

          </Grid>
          <p style={{color:'red'}}>{errors.password}</p>
            <p style={{color:'red'}}>{errors.msg}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

        </form>
        <Grid container>
              <Grid item xs>
                <Link to="/">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" >
                  Have an account? Sign in
                </Link>
              </Grid>
            </Grid>
      </div>
    </Container>
  );
}
const mapStateToProps = (state)=>({
  auth: state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
