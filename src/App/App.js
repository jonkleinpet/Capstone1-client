import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPostList from '../components/Main/MainPostList';
import config from '../config';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/Main/SideBar';
import LoginForm from '../components/LoginForm/LoginForm';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  getAllPosts = () => {
    fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.API_KEY
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('something went wrong')
        }
        return res.json()
      })
      .then(posts => {
      this.setState({ posts })
    }).catch(err => console.log(err))
    
  }

  componentDidMount() {
    this.getAllPosts()
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="page-container">
          <div className="sidebar-container">
            <SideBar />
          </div>
          <div className="main-container">
            <Route exact path={ '/' } render={ () => {
              return <MainPostList
                posts={ posts }
              />
            } } />
            <Route exact path={ '/login' } render={ () => {
              return <LoginForm
                
              />
            } } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
