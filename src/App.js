import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import PanelPrincipal from './components/PanelPrincipal';
function App() {
  return (
    <Fragment>
      <Router>
          <Switch>
            <Route path="/" exact render={props=>(<Login{...props}/>)}></Route>
            <Route path="/panel" exact render={props=>(<PanelPrincipal{...props}/>)}></Route>
          </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
