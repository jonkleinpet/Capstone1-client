import React from 'react';
import tokenService from '../../services/token-service';
import CommentDeleteButton from './CommentDeleteButton';
import './styles/comment-list.css';

export default function CommentList(props) {
  const { comments, user, post_id, deleteComment } = props;
 
   
  return (
    !!comments
      // filter which comments relate to posts 
      ? comments
        .filter(c => {
          return c.post_id === post_id;
        })
        .map(c => {
          return (
            <div className='comment-list' key={c.comment_id}>
              <ul className='comment-item'>
                <li>
                  {// filter which user name relates to each comment
                  user
                    .filter(u => {
                      return u.id === c.user_id;
                    })

                    .map((u, i) => {
                      return (
                        <span key={ i }>
                          {
                            tokenService.hasAuthToken() && tokenService.checkUser(c.user_id)
                            ? <CommentDeleteButton comment_id={c.comment_id} deleteComment={ deleteComment }/>
                            : <></>
                          }
                          <span> { u.user_name } - { c.content } </span>
                        </span>
                      );
                    })}
                
                  <div className='comment-date'>
                    {new Date(c.date_created).toDateString()}
                  </div>
                </li>
              </ul>
            </div>
          );
        })
    
      : <></>
  );
};