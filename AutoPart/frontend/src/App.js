import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/header';

class App extends React.Component {

  render() {
    return (
      <>
       <Header/>
        <div className="container">
          <h1>Hello --++</h1>
          <h2>Вона зможе</h2>
        </div>
      </>
    );
  }
}

export default App;
