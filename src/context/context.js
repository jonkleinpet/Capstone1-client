import React from 'react';

const PostsContext = React.createContext({
  posts: [],
  comments: [],
  user: [],
  isLoading: false,
  blogPost: () => {},
  userLogin: () => {},
  userRegister: () => {},
  commentPost: () => {},
});

export default PostsContext;