import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainPostList from '../components/Main/MainPostList';
import config from '../config';
import AdminRoute from '../components/Routes/AdminRoute';
import PostsContext from '../context/context';
import Navbar from '../components/Navbar/Navbar';
import LoginForm from '../components/LoginForm/LoginForm';
import About from '../components/About/About';
import ErrorBoundary from '../components/Errors/ErrorBoundary';
import RegisterForm from '../components/Register/RegisterForm';
import PostForm from '../components/PostForm/PostForm';
import tokenService from '../services/token-service';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    comments: [],
    user: [],
    images: [],
    searchedPosts: [],
    currentPosts: [],
    isLoggedIn: false,
    isError: false,
    errorMessage: '',
    searchTitle: ''
  }

  // toggle login state
  toggleLogout = (loggedOut) => {
    this.setState({ isLoggedIn: loggedOut });
  }

  // update SearchBar title
  updateTitle = (e) => {
    this.setState({ searchTitle: e.target.value },
      () => this.filterPosts())
  }

  isSearchBarInUse = (posts) => {
    if (this.state.searchTitle.length === 0) {
      this.setState({ currentPosts: posts, searchedPosts: [] });
    }
  }

  // filter posts on search title
  filterPosts = () => {
    const posts = this.state.posts;
    const regex = new RegExp('^'+this.state.searchTitle, 'gi');
    const searchedPosts = posts.filter(p => (regex).test(p.title))
    this.setState({ currentPosts: searchedPosts, searchedPosts },
      () => this.isSearchBarInUse(posts))
  }

  setPosts = (newPosts) => {
    this.setState({
      currentPosts: newPosts,
      searchedPosts: newPosts,
      posts: newPosts
    });
  }

  // POST requests
  blogPost = (content, title) => {
    return fetch(`${config.API_ENDPOINT}/posts/blog`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${tokenService.getAuthToken()}`
      },
      body: JSON.stringify({ content, title })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(post => {
        const newPosts = [...this.state.posts, post];
        this.setState({ posts: newPosts, currentPosts: newPosts })
  })
    .catch(err => console.error(err.message))
  }
  
  commentPost = (content, post_id) => {
    fetch(`${config.API_ENDPOINT}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${tokenService.getAuthToken()}`
      },

      body: JSON.stringify({
        post_id,
        content
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(comment => {
        const newComments = [...this.state.comments, comment];
        this.setState({
          comments: newComments
        });
      })
    
  }

 
  imagePost = (img) => {
    const newImages = [...this.state.images, img];
    this.setState({ images: newImages })
  }

  // DELETE post
  deletePost = (e) => {
    const id = e.target.getAttribute('id');
    return fetch(`${config.API_ENDPOINT}/posts/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(() => {
        const newPosts = this.state.posts.filter(p => p.id !== parseInt(id));
        this.setState({ posts: newPosts },  () => this.filterPosts())
      })
      .catch(err => console.log(err));
  }

  // DELETE comment
  deleteComment = (e) => {
    const id = e.target.getAttribute("comment_id");
    return fetch(`${config.API_ENDPOINT}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getAuthToken()}`
      }
    }).then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    })
      .then(() => {
        const { comments } = this.state;
        const newComments = comments.filter(c => c.comment_id !== parseInt(id));
        this.setState({ comments: newComments });
    })
  }

  // GET requests
  getAllPosts = () => {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .catch(err => console.log(err));
  }


  getAllComments = () => {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .catch(err => console.log(err));
  }


  getAllImages = () => {
    return fetch(`${config.API_ENDPOINT}/cloudinary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .catch(err => console.log(err));
  }

  // POST auth requests
  userLogin = (name, password) => {
    this.setState({ isError: false, errorMessage: '' });
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getAuthToken()}`
      },

      body: JSON.stringify({
        name,
        password
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(res => {
        tokenService.saveAuthToken(res.authToken);
        console.log(res)
        this.setState({ isLoggedIn: true });
      })
      // redirect with user feedback
      .catch(res => {
        this.setState({
          isError: true,
          errorMessage: res.error
        }, () => setTimeout(() => {
          this.setState({ isError: false, errorMessage: '' });
        }, 3000));
      });
  }

  
  userRegister = (user_name, full_name, password) => {
    this.setState({ isError: false, errorMessage: '' })
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getAuthToken()}`
      },

      body: JSON.stringify({
        user_name,
        full_name,
        password
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(user => {
        const newUser = {
          id: user.id,
          user_name: user.user_name
        };

        this.setState({
          isLoggedIn: true,
          user: [...this.state.user, newUser]
        }, () => this.userLogin(user_name, password));
      })

      .catch(res => {
        this.setState({
          isError: true,
          errorMessage: res.error
        }, () => setTimeout(() => {
          this.setState({isError: false, errorMessage: ''})
        }, 3000));
      });
  }

  // initial fetch posts and comments
  async componentDidMount() {
    const { comments, user } = await this.getAllComments();
    const posts = await this.getAllPosts();
    const images = await this.getAllImages();
    this.setState({
      posts,
      comments,
      user,
      images,
      isLoading: false,
      currentPosts: posts
    })
  }
  
  render() {
    return (
      <ErrorBoundary>
      <div className='App'>
        <header className='App-header'>
          <Navbar toggleLogout={this.toggleLogout} />
        </header>

        <div className='page-container'>
          <div className='sidebar-container' />
          <div className='main-container'>
            <h1>Welcome to Laurie's Blog</h1>
            <PostsContext.Provider value={this.state}>
              <Route
                exact
                path={"/"}
                render={() => (
                  <MainPostList
                    commentPost={ this.commentPost }
                    imagePost={ this.imagePost }
                    updateTitle={ this.updateTitle }
                    isSearchedPosts={ this.isSearchedPosts }
                    deletePost={ this.deletePost }
                    deleteComment={ this.deleteComment }
                  />
                )}
              />
            </PostsContext.Provider>

            <Route
              exact
              path={"/login"}
              render={() =>
                this.state.isLoggedIn ? (
                  <Redirect to='/' />
                ) : (
                  <PostsContext.Provider value={this.userLogin}>
                    <LoginForm
                      isError={this.state.isError}
                      errorMessage={this.state.errorMessage}
                    />
                  </PostsContext.Provider>
                )
              }
            />

            <PostsContext.Provider value={this.userRegister}>
              <Route
                exact
                path={"/register"}
                render={() =>
                  this.state.isLoggedIn ? (
                    <Redirect to='/' />
                  ) : (
                    <PostsContext.Provider value={this.userRegister}>
                      <RegisterForm
                        isError={this.state.isError}
                        errorMessage={this.state.errorMessage}
                        userLogin={this.userLogin}
                      />
                    </PostsContext.Provider>
                  )
                }
              />
            </PostsContext.Provider>

            <Route path={"/about"} component={About} />

            <PostsContext.Provider value={this.blogPost}>
              <AdminRoute
                path={"/blog"}
                component={ PostForm }
              />
            </PostsContext.Provider>
          </div>
        </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
