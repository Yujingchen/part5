import React, { useState } from 'react'

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
    <div>
      <form onSubmit={addBlog}>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <label htmlFor="title">title: </label>
            <input value={title} name="title" onChange={(event) => handleTextChange(event)}></input>
          </li>
          <li>
            <label htmlFor="author">author: </label>
            <input value={author} name="author" onChange={(event) => handleTextChange(event)}></input>
          </li>
          <li>
            <label htmlFor="url">url: </label>
            <input value={url} name="url" onChange={(event) => handleTextChange(event)}></input>
          </li>
          <li>
            <button type="submit">create</button>
          </li>
        </ul>
      </form >
    </div>
  )
}

export default BlogForm