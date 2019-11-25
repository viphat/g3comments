import React, { useState, useEffect, useCallback } from 'react';
import { getCommentsByPost } from './CommentsAPI';
import CommentForm from './CommentForm';
import Comments from './Comments';

function App() {
  const currentPostUrl = window.location.pathname.replace(/\//g, '');
  const [comments, setComments] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async (currentPostUrl) => {
    try {
      const data = await getCommentsByPost(currentPostUrl)
      setComments(data.comments);
      // setIsLoading(false);
    } catch (error) {
      // Error Handling
      setIsEmpty(true);
      // setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPostUrl);
  }, [currentPostUrl, fetchData]);

  return (
    <>
      { !isEmpty && <Comments comments={comments} /> }
      <CommentForm currentPostUrl={currentPostUrl} submitCallback={fetchData} />
    </>
  );
}

export default App;
