import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import PokeList from './components/pokelist';
import NavBar from './components/layout/NavBar';
import Home from './components/Home';
import './App.css';

class App extends Component {



  
  render(){
    return (
      
      <BrowserRouter>
      <NavBar/>
      <div className="container">
        <br/>
        <br/>
      <Route exact path="/" component={Home}/>
  
      </div>

      
      
        
        <Route path="/components/pokelist" component={PokeList}/> 
        
        <br/>
        
      </BrowserRouter>
    );
  }
}

export default App;
