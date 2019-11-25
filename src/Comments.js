import React from 'react';
import md5 from 'blueimp-md5';

const Comments = (props) => {
  const { comments } = props;

  const formatDate = (iDate) => {
    let date = new Date(iDate);
    return date.toLocaleString();
  };

  return (
    <section className='pure-comments'>
      <ul className='comments-list'>
        {
          comments.map((comment) => (
            <li key={comment.commentId}>
              <div className='comment-info'>
                <img alt={comment.displayName} className='author-avatar' src={ comment.email ? `https://www.gravatar.com/avatar/${md5(comment.email)}` : 'https://duongdao.s3-ap-southeast-1.amazonaws.com/default-avatar.png' } />
                <div className='comment-meta'>
                  <span className='author-name'>{ comment.displayName }</span>
                  <span className='created-at'>{ formatDate(comment.createdAt) }</span>
                </div>
              </div>
              <div className='comment-content'>
                { comment.content }
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default Comments;
