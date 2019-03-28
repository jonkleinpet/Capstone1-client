import React from 'react';
import './styles/comment-list.css';

export default function CommentList(props) {
  const { comments, user, post_id } = props;
 
   
  return (
    !!comments
      // filter which comments relate to posts 
      ? comments
        .filter(c => {
          return c.post_id === post_id;
        })
        .map(c => {
          return (
            <div className="comment-list" key={ c.comment_id }>
              <ul className="comment-item">
                <li>

                  {// filter which user name relates to each comment
                    user
                      .filter(u => {
                        return u.id === c.user_id;
                      })

                      .map((u, i) => {
                        return <span key={ i }> { u.user_name } - </span>
                      }) }
                  { c.content }
                  <div className="comment-date">{ new Date(c.date_created).toDateString() }</div>
                </li>
              </ul>
            </div>
          );
        })
    
      : <></>
  );
};