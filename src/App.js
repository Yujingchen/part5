import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
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
  const blogFormRef = useRef(null)
  const handleSaveSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const savedBlog = await blogService.postNewBlog(newBlog)
      const newBlogs = blogs.concat(savedBlog)
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
  const handleTextChange = (event) => {
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value)
        break
      case "url":
        setUrl(event.target.value)
        break
      case "author":
        setAuthor(event.target.value)
        break
      case "username":
        setUsername(event.target.value)
        break
      case "password":
        setPassword(event.target.value)
        break
      default:
        break
    }
  }

  const handleLogoutSubmit = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLikesIncrease = async (event, id) => {
    console.log(id)
    event.preventDefault()
    try {
      const elementsIndex = blogs.findIndex(blog => blog.id === id)
      const blogToUpdate = blogs[elementsIndex]
      const newBlog = { ...blogToUpdate, likes: blogs[elementsIndex].likes + 1 }
      const updatedBlog = await blogService.updateBlog(newBlog)
      setBlogs(updatedBlog)
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    catch (error) {
      console.log(error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setErrorMessage('something went wrong when saving the new blog, please enter again')
    }
  }

  return (
    <div>
      {errorMessage && <div className='errorMessage'>
        {errorMessage}
      </div>}
      {notification && <div className='notification'>
        {notification}
      </div>}
      {user === null &&
        <>
          <h2>Login</h2>
          <Togglable buttonLabel='login'>
            <LoginForm handleSubmit={handleLoginSubmit} handleUsernameChange={handleTextChange}
              handlePasswordChange={handleTextChange} username={username} password={password} />
          </Togglable>
        </>
      }
      {user !== null &&
        <div>
          <h1>blogs</h1>
          <p>{user.username} logged in <span><button onClick={(e) => handleLogoutSubmit(e)}>logout</button></span></p>
          <h1>create new</h1>
          {
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm handleTitleChange={handleTextChange} handleUrlChange={handleTextChange} handleAuthorChange={handleTextChange}
                handleSubmit={handleSaveSubmit}></BlogForm>
            </Togglable>
          }
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikesIncrease} />
          )}
        </div>
      }
    </div >
  )
}
export default App