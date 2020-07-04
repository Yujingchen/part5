import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleSaveSubmit = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const savedBlog = await blogService.postNewBlog(newBlog)
      const newBlogs = blogs.concat(savedBlog)
      console.log(newBlogs)
      setBlogs(newBlogs)
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    catch (error) {
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setErrorMessage('something went wrong when saving the new blog, please enter again')
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const loginData = {
      username: username,
      password: password,
    }
    try {
      const loginUser = await loginService.login(loginData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )
      window.localStorage.setItem("loggedIn", true)
      setUser(loginUser)
      blogService.setToken(loginUser.token)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleTextChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value)
        break
      case "url":
        setUrl(e.target.value)
        break
      case "author":
        setAuthor(e.target.value)
        break
      case "username":
        setUsername(e.target.value)
        break
      case "password":
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={(e) => handleLoginSubmit(e)}>
        <ul>
          <li>
            <label htmlFor="username">username: </label>
            <input value={username} name="username" onChange={(e) => handleTextChange(e)}></input>
          </li>
          <li>
            <label htmlFor="password">password: </label>
            <input value={password} name="password" onChange={(e) => handleTextChange(e)}></input>
          </li>
          <li>
            <button type="submit" >login</button>
          </li>
        </ul>
        <ul>
        </ul>
      </form>
    )
  }

  const blogForm = () => {
    return (
      <form onSubmit={(e) => handleSaveSubmit(e)}>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <label htmlFor="title">title: </label>
            <input value={title} name="title" onChange={(e) => handleTextChange(e)}></input>
          </li>
          <li>
            <label htmlFor="author">author: </label>
            <input value={author} name="author" onChange={(e) => handleTextChange(e)}></input>
          </li>
          <li>
            <label htmlFor="url">url: </label>
            <input value={url} name="url" onChange={(e) => handleTextChange(e)}></input>
          </li>
          <li>
            <button type="submit">create</button>
          </li>
        </ul>
      </form >
    )
  }
  return (
    <div>
      {errorMessage && <div className='errorMessage'>
        {errorMessage}
      </div>}
      {notification && <div className='notification'>
        {notification}
      </div>}
      {user === null && loginForm()}
      {user !== null &&
        <div>
          <h1>blogs</h1>
          <p>{user.username} logged in</p>
          <h1>create new</h1>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div >
  )
}

export default App