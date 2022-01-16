import React, { useState, useCallback,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;
const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setuserId] = useState(null)
  const [tokenExpirationDate, settokenExpirationDate] = useState()
  const login = useCallback((userid,token,expiration) => {
    setToken(token);
    setuserId(userid);
    const tokenExpirationDate1=expiration || new Date(new Date().getTime()+60*60*1000);
    settokenExpirationDate(tokenExpirationDate1)
    localStorage.setItem('userData',JSON.stringify({userId:userid,token:token,expiration:tokenExpirationDate1.toISOString()}));

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    settokenExpirationDate(null);
    setuserId(null)
    localStorage.removeItem('userData')

  }, []);
  useEffect(() => {
    const storedData=JSON.parse(localStorage.getItem('userData'));
    if(storedData&&storedData.token && new Date(storedData.expiration)>new Date()){
      login(storedData.userId,storedData.token,new Date(storedData.expiration))
    }
    
  }, [login])

  useEffect(() => {
    if(token&&tokenExpirationDate){
      const remainingTime=tokenExpirationDate.getTime()-new Date().getTime()
      logoutTimer=setTimeout(logout,remainingTime)
    }
    else{
      clearTimeout(logoutTimer)
    }
  }, [token,tokenExpirationDate,logout])



  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token,token:token, login: login, logout: logout,userId:userId }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
