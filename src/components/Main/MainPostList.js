import React, { Component } from 'react';
import './sidebar.css';

class MainPostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
    
  }


  render() {
    const { posts } = this.props;
    console.log(posts)
    const postList = posts.map(p => {
      return (
        <ul key={p.id} className='main-post-list'>
          <li>{ p.content }</li>
          <li>{ p.date_added }</li>
        </ul>
      )
    })
    return (
      <>
        { postList }
      </>
    )
  }

}

export default MainPostList;