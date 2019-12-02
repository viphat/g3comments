import { GISTS_PERSONAL_ACCESS_TOKEN, GISTS_COMMENTS_API_URL } from './Settings'
import axios from 'axios';

const headers = {
  'Accept': 'application/json',
  'Authorization': `token ${GISTS_PERSONAL_ACCESS_TOKEN}`,
}

export const getCommentsByPost = async (postUrl) => {
  const allPostsComments = await getAll();
  return allPostsComments.find((item) => {
    return item.post === `${postUrl}.json`
  })
}

export const createComment = async (postUrl, newComment) => {
  const data = await getCommentsByPost(postUrl);
  const uuidv1 = require('uuid/v1');
  newComment.commentId = uuidv1();
  newComment.createdAt = Date.now();

  let params = { }
  if (data === undefined || data === null) {
    params = {
      [`${postUrl}.json`]: {
        content: JSON.stringify([newComment])
      }
    }
  } else {
    const { comments } = data;
    comments.push(newComment);
    params = {
      [`${postUrl}.json`]: {
        content: JSON.stringify(comments)
      }
    }
  }

  return await axios.patch(
    GISTS_COMMENTS_API_URL,
    { files: params },
    { headers: headers }
  )
}

const getAll = async () => {
  const response = await axios.get(`${GISTS_COMMENTS_API_URL}?timestamp=${Date.now()}`, { headers: headers })
  const filesObj = response.data['files'];
  return Object.keys(filesObj).map((fileKey) => {
    const obj = filesObj[fileKey];
    const comments = JSON.parse(obj['content'].replace(/\n/g, ''));
    return {
      post: obj['filename'],
      comments: comments
    }
  });
}
