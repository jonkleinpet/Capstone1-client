import React, { Component } from 'react';
import PostsContext from '../../context/context';
import CommentButton from '../Comments/CommentButton';
import CommentList from '../Comments/CommentList';
import tokenService from '../../services/token-service';
//import LoadingIcon from '../LoadingIcon/LoadingIcon';
import './sidebar.css';

class MainPostList extends Component {

  static contextType = PostsContext;

  render() {
    const { commentPost } = this.props
    const { posts, isLoading, user, comments } = this.context;

    const postList = posts.map(p => {
      return  (
        // generate posts list
        <div key={p.id}>
          <h2>Blog Post title {p.id}</h2>
          <ul className='main-post-list'>
            <li>{p.content}</li>
            <li>Posted - {
              new Date(p.date_added).toDateString()
            }</li>
          </ul>
          <CommentList comments={ comments } user={ user } post_id={ p.id } />
          {
            tokenService.hasAuthToken()
              ? <CommentButton
                commentPost={ commentPost }
                isLoading={ isLoading }
                post_id={ p.id }
              />
              : <></>
          }
          <hr />
        </div>
      );
    });
    
    return (
      <>
        { postList }
      </>
    );
  }
}

export default MainPostList;