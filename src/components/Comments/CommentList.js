import React from 'react';

export default function CommentList(props) {
  const { comments, user, post_id } = props;

  return (
    // filter which comments relate to posts 
    comments
      .filter(c => {
        return c.post_id === post_id;
      })
      .map(c => {
        return (
          <div key={ c.comment_id }>
            <ul>
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
                <div>{ c.date_created }</div>
              </li>
            </ul>
          </div>
        );
      })
  );
};