
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import ViewRecipes from './pages/ViewRecipes/ViewRecipes';
import { AuthContext } from "./context/auth";

const App = (props) => {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    console.log('Setting tokens on local storage');
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
            <li>
              <Link to="/add-recipe">Add Recipe</Link>
            </li>
            <li>
              <Link to="/view-recipes">View Recipes</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/add-recipe" component={AddRecipe} />
          <PrivateRoute path="/view-recipes" component={ViewRecipes} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
