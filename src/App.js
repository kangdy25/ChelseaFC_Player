import React from 'react';
import './App.css';
import Card from './UI/Card';
import Header from './UI/Header';
import Navbar from './UI/Navbar';
import player2324 from './Database/2324_player.js'

function App(props) {
  return (
    <div className="App">
      <Header/>
      <Navbar/>
      <Card player2324={player2324}/>
    </div>
  );
}

export default App;
