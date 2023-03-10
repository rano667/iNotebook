import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
