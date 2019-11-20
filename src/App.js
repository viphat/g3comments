import React, { useState, useEffect } from 'react';
import { getCommentsByPost } from './CommentsAPI';
import CommentForm from './CommentForm';

function App() {
  const currentPostUrl = window.location.pathname.replace(/\//g, '');
  const [comments, setComments] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getCommentsByPost(currentPostUrl)
      setComments(data.comments);
      // setIsLoading(false);
    } catch (error) {
      // Error Handling
      setIsEmpty(true);
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPostUrl]);

  return (
    <>
      <CommentForm currentPostUrl={currentPostUrl} submitCallback={fetchData}/>
      { currentPostUrl }
      <br />
      { !isEmpty &&
        <>
          { comments.length }
          <br/>
          <pre>
            { JSON.stringify(comments) }
          </pre>
        </>
      }
    </>
  );
}

export default App;
