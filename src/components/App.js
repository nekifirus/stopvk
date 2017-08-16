import React, { Component } from 'react';
import '../stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          
          <h2>StopVK</h2>
        </div>
        <p className="App-intro">
          Эта программа поможет Вам удалиться из социальной сети Вконтакте. 
        </p>
        <p>Все что Вам нужно сделать для начала работы:</p>
        <button className="loginbtn">ВОЙТИ</button>
        <div>тест</div>
      </div>
    );
  }
}

export default App;
