import React, { useState } from 'react';
import { createComment } from './CommentsAPI';

const CommentForm = (props) => {
  const [inputs, setInputs] = useState({displayName: '', email: '', content: ''});
  const { currentPostUrl, submitCallback } = props;

  const submitComment = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const { displayName, email, content } = inputs;
    await createComment(currentPostUrl, { displayName, email, content })
    submitCallback(currentPostUrl);
    setInputs({
      displayName: '',
      email: '',
      content: '',
    })
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return (
    <form onSubmit={submitComment} className="w-full" style={{ maxWidth: '36em' }}>
      <legend className='block text-gray-700 font-bold mb-4 pr-4 border-b-2'>Leave Your Comment</legend>

      <div className="md:flex md:items-center mb-6">
        <div className='md:w-1/3'>
          <label className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='displayName'>Display Name:</label>
        </div>
        <div className='md:w-2/3'>
          <input id='displayName' name='displayName' type='text' placeholder='Display Name' className='bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' onChange={handleInputChange} value={inputs.displayName} required/>
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className='md:w-1/3'>
          <label className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='email'>Email:</label>
        </div>
        <div className='md:w-2/3'>
          <input id='email' name='email' type='email' placeholder='Email' className='bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' onChange={handleInputChange} value={inputs.email}/>
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className='md:w-1/3'>
          <label className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='content'>Content:</label>
        </div>
        <div className='md:w-2/3'>
          <textarea id='content' name='content' placeholder='Your comment here.' className='bg-gray-200 appearance-none border-2 border-gray-200 rounded rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' rows='8' required onChange={handleInputChange} value={inputs.content}/>
        </div>
      </div>

       <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
        </div>
      </div>
    </form>
  )
}

export default CommentForm;
