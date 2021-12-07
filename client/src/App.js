import React from "react";
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import ListSong from './components/ListSong';
import AddSongForm from './components/AddSongForm';
import NotFound from './components/NotFound';
import Index from './components/home/index'
import Transaction from './components/transaction/index';


function App() {
  return (
    <div className="App">
    <Switch>
    <Route path='/songs' exact component={ListSong}/>
      <Route path="/uploadSong" exact component={AddSongForm} />
      <Route path="/transactions" exact component={Transaction} />
      <Route path="/" exact component={ Index } />
      <Route path="**" component={ NotFound } />
    </Switch>
  </div>
  );
}

export default App;