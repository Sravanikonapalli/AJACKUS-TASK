import { Component } from 'react';
import UserList from './components/UserList';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
          <h1>USER MANAGEMENT DASHBOARD</h1>
          <UserList/>
        </div>      
    );
  }  
}

export default App;
