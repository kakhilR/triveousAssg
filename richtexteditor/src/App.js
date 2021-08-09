import React from 'react';
import Editor from './components/TextEditor';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import IndexPage from './IndexPage';

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <Route path="/" exact component={IndexPage} />
          <Route path="/texteditor" component={Editor} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
