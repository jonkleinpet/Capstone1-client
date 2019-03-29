import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostsContext from '../../context/context';
import CommentButton from '../Comments/CommentButton';
import CommentList from '../Comments/CommentList';
import tokenService from '../../services/token-service';
import ImageList from './ImageList';
import CloudinaryWidget from './CloudinaryWidget';
import SearchBar from '../SearchBar/SearchBar';
import DeleteButton from './DeleteButton';
import "./styles/main-post-list.css";

class MainPostList extends Component {
  
  static contextType = PostsContext;

  render() {
    
    const { commentPost, imagePost, updateTitle, deletePost, deleteComment } = this.props
    const {
      currentPosts, 
      isLoading, 
      user, 
      comments, 
      images,
    } = this.context;

    const postList = currentPosts
      .map((p, i) => {
        return (
          // generate posts list
          <div
            className={i !== 0 ? "post-item" : "first-post"}
            key={p.id}>
            <h2>{p.title}</h2>
            <ImageList images={images} postId={p.id} />
            <ul className='main-post-list'>
              <li className='post-content'>{p.content}</li>
              <li className='post-date'>
                Posted - {new Date(p.date_added).toDateString()}
              </li>

              {// check the user is logged in and the admin
              tokenService.hasAuthToken() && tokenService.isAdmin() ? (
                <>
                  <CloudinaryWidget
                    post_id={p.id}
                    imagePost={imagePost}
                  />
                  <DeleteButton
                    deletePost={deletePost}
                    post_id={p.id}
                  />
                </>
              ) : (
                <></>
              )}
            </ul>
            <h3>Comments</h3>
            <div className='comment-container'>
              <CommentList
                key={i}
                comments={comments}
                deleteComment={deleteComment}
                user={user}
                post_id={p.id}
              />
            </div>
            {tokenService.hasAuthToken() ? (
              <CommentButton
                commentPost={commentPost}
                isLoading={isLoading}
                post_id={p.id}
              />
            ) : (
              <div>
                <Link className="user-comment-link" to={"/register"}>Register</Link> or{" "}
                <Link className="user-comment-link" to={"/login"}>Login</Link> to post comments!
              </div>
            )}
          </div>
        );
      });
    
    return (
      <>
        <div className="demo-creds">
          <h4>Demo site owner login details</h4>
          <div>username: Laurie</div>
          <div>password: Password123</div>
        </div>
        <SearchBar updateTitle={ updateTitle } />
        { postList }     
      </>
    );
  }
}

export default MainPostList;