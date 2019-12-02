import React from 'react';
import md5 from 'blueimp-md5';

const Comments = (props) => {
  const { comments } = props;

  const formatDate = (iDate) => {
    let date = new Date(iDate);
    return date.toLocaleString();
  };

  return (
    comments.map((comment, index) => (
      <div key={`comment-${index}`} className='flex border-b border-solid border-grey-light mb-12'>
        <div className='w-1/5 md:w-1/6 text-right pt-3'>
          <img alt={comment.displayName} className='rounded-full mr-2' src={ comment.email ? `https://www.gravatar.com/avatar/${md5(comment.email)}` : 'https://duongdao.s3-ap-southeast-1.amazonaws.com/default-avatar.png' } style={{ height: '4em', width: '4em' }}/>
        </div>
        <div className='w-4/5 md:w-5/6 pl-0 pr-2'>
          <div className='comment-meta'>
            <span className='font-bold block'>{ comment.displayName }</span>
            <span className='text-sm block'>{ formatDate(comment.createdAt) }</span>
          </div>
          <div className='mt-4 mb-4'>{ comment.content }</div>
        </div>
      </div>
    ))
  )
}

export default Comments;
