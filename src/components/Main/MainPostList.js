import React, { Component } from 'react';
import PostsContext from '../../context/context';
import CommentButton from '../Comments/CommentButton';
import CommentList from '../Comments/CommentList';
import tokenService from '../../services/token-service';
import ImageList from './ImageList';
import "./styles/main-post-list.css";
import CloudinaryWidget from './CloudinaryWidget';

class MainPostList extends Component {

  static contextType = PostsContext;

  render() {
  
    const { commentPost, imagePost } = this.props
    const { posts, isLoading, user, comments, images } = this.context;
    console.log(posts)
    const postList = posts.map((p, i) => {
      return (
        // generate posts list
        <div className={i !== 0 ? "post-item" : "first-post"} key={p.id}>
          <h2>Blog Post title {p.id}</h2>
          <ImageList images={images} postId={p.id} />
          <ul className='main-post-list'>
            <li>{p.content}</li>
            <li className="post-date">Posted - {new Date(p.date_added).toDateString()}</li>
            {tokenService.hasAuthToken() && tokenService.isAdmin()
              ? <CloudinaryWidget post_id={ p.id } imagePost={ imagePost }/>
              : <></>
            }
          </ul>
          <h3>Comments</h3>
          <div className="comment-container">
            <CommentList comments={ comments } user={ user } post_id={ p.id } />
          </div>
          {tokenService.hasAuthToken() ? (
            <CommentButton
              commentPost={commentPost}
              isLoading={isLoading}
              post_id={p.id}
            />
          ) : (
            <></>
          )}
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