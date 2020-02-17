import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Gists from './components/Gists';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="content">
          <Route exact path="/" component={ Home } />
          <Route path="/gists/:user_id" component={ Gists } />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
