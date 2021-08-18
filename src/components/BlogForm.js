import React, { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTextChange = (event) => {
    switch (event.target.name) {
    case 'title':
      setTitle(event.target.value)
      break
    case 'url':
      setUrl(event.target.value)
      break
    case 'author':
      setAuthor(event.target.value)
      break
    default:
      break
    }
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <label htmlFor="title">title: </label>
            <input id="title" className="title" value={title} name="title" onChange={(event) => handleTextChange(event)}></input>
          </li>
          <li>
            <label htmlFor="author">author: </label>
            <input id="author" className="author" value={author} name="author" onChange={(event) => handleTextChange(event)}></input>
          </li>
          <li>
            <label htmlFor="url">url: </label>
            <input id="url" className="url" value={url} name="url" onChange={(event) => handleTextChange(event)}></input>
          </li>
          <li>
            <button id="create-button" type="submit">create</button>
          </li>
        </ul>
      </form >
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm