import React, { Component } from 'react'
import Counter from './Counter'
import CounterCounterCounter from './CounterCounterCounter'
import TypeAhead from './TypeAhead'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Stuff I Learned</h1>
        </header>
        <div className='app-container'>
          <Counter />
          <CounterCounterCounter />
          <TypeAhead />
        </div>
      </div>
    );
  }
}

export default App
