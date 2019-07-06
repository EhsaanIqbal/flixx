import React, { Component } from "react";
import Home from "./header/Home";
import MovieInfo from "./movie/MovieInfo";
import Register from "./auth/Register"
import Login from "./auth/Login"
import "./style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions'
import Home_tv from './tv/Home_tv'
import ShowInfo from './tv/ShowInfo'


//check for token
if(localStorage.jwt_token){
  //set auth token to header
  setAuthToken(localStorage.jwt_token);
  //decode token
  const decoded = jwt_decode(localStorage.jwt_token);
  //call setCurrentUser
  store.dispatch(setCurrentUser(decoded));
}


class App extends Component {
  render() {
    return(
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/watch/:movie_id" component={MovieInfo} />
            <Route exact path="/tv" component={Home_tv} />
              <Route exact path="/tv/watch/:tv_id" component={ShowInfo} />
          </Switch>
        </div>
     </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
