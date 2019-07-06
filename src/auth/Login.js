import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
//Styling
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//Main
const Login = (props) => {
const classes = useStyles();

//Form methods
  const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      const userData = {

        password: inputs.password,
        email: inputs.email
      }

      props.loginUser(userData);


    }
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  }

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
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleInputChange}
            autoFocus
          />
        <p style={{color:'red'}}>{errors.email}</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        <p style={{color:'red'}}>{errors.password}</p>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
                <Grid item xs>
                  <Link to="/">
                    Home
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" >
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
        </form>
      </div>
      </Container>
  );
}
const mapStateToProps = (state)=>({
  auth:state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser}) (Login);
