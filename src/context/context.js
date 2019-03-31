import React from 'react';

const PostsContext = React.createContext({
  posts: [],
  comments: [],
  user: [],
  searchedPosts: [],
  searchTitle: '',
  searchMessage: '',
  editContent: '',
  isError: false,
  isLoading: false,
  noComments: false,
  blogPost: () => { },
  editPost: () => { },
  userLogin: () => { },
  userRegister: () => { },
  commentPost: () => { },
});

export default PostsContext;