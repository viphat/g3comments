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
      content: ''
    })
  }

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return (
    <form onSubmit={submitComment} className="pure-form pure-form-aligned">
      <fieldset>
        <legend>Comment Form</legend>
        <div className='pure-control-group'>
          <label htmlFor='displayName'>Display Name:</label>
          <input id='displayName' name='displayName' type='text' placeholder='Display Name' className='pure-input-rounded pure-u-1-2' onChange={handleInputChange} value={inputs.displayName} required/>
          <span className='pure-form-message-inline'>*</span>
        </div>

        <div className='pure-control-group'>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type='email' placeholder='Email' className='pure-input-rounded' onChange={handleInputChange} value={inputs.email}/>
          <span className='pure-form-message-inline'>(Optional)</span>
        </div>

        <div className='pure-control-group'>
          <label htmlFor='content'>Content:</label>
          <textarea id='content' name='content' placeholder='Your comment here.' className='pure-input-rounded' rows='8' required onChange={handleInputChange} value={inputs.content}/>
          <span className='pure-form-message-inline'>*</span>
        </div>

        <div className='pure-controls'>
          <button className='pure-button pure-button-primary' type='submit'>Submit</button>
        </div>
      </fieldset>
    </form>
  )
}

export default CommentForm;
