import React from 'react';
import { Routes as Switch, Route } from "react-router-dom"
import Users from './users/pages/Users';
import Places from './places/pages/Places';
import MainNavigation from './shared/Navigation/MainNavigation/MainNavigation';
function App() {
  return (
    <>
      <MainNavigation/>

    <Switch>
      <Route path="/" exact element={<Users/>}/>
       
      <Route path="/places" exact element={<Places/>}/>
    </Switch>
    </>
  );
}

export default App;
