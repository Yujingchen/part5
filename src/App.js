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
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs => {
      sortBlogsByLikeCount(blogs)
      setBlogs(blogs)
    })
  }, [])

  const handleLoginSubmit = async (loginData) => {
    try {
      const loginUser = await loginService.login(loginData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )
      window.localStorage.setItem('loggedIn', true)
      setUser(loginUser)
      blogService.setToken(loginUser.token)
    }
    catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogoutSubmit = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const sortBlogsByLikeCount = (blogs) => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
  }

  const blogFormRef = useRef(null)

  const handleSaveSubmit = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.postNewBlog(newBlog)
      const newBlogs = blogs.concat(savedBlog)
      setBlogs(newBlogs)

      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
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



  const handleLikesIncrease = async (event, id) => {
    event.preventDefault()
    try {
      console.log('blogs', blogs)
      const elementsIndex = blogs.findIndex(blog => blog.id === id)
      const blogToUpdate = blogs[elementsIndex]
      const newBlog = {
        user: blogToUpdate.user.id,
        likes: blogToUpdate.likes + 1,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url
      }
      console.log('newBlog', newBlog)
      const newBlogs = [...blogs]
      const updatedBlog = await blogService.updateBlog(blogToUpdate.id, newBlog)
      newBlogs[elementsIndex] = updatedBlog
      setBlogs(newBlogs)
    }
    catch (error) {
      console.log(error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setErrorMessage('something went wrong when updating like for the blog, please enter again')
    }
  }


  const handleBlogDelete = async (event, id) => {
    event.preventDefault()
    const elementsIndex = blogs.findIndex(blog => blog.id === id)
    const blogToDelete = blogs[elementsIndex]
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        await blogService.deleteBlog(blogToDelete)
        const newBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(newBlogs)
      }
      catch (error) {
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        setErrorMessage('something went wrong when deleting the blog, please enter again')
      }
    }
  }

  return (
    <div>
      {errorMessage && <div className='error errorMessage'>
        {errorMessage}
      </div>}
      {notification && <div className='notification'>
        {notification}
      </div>}
      {user === null &&
        <>
          <h2>Login</h2>
          <Togglable buttonLabel='login'>
            <LoginForm loginUser={handleLoginSubmit} />
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
              <BlogForm
                createBlog={handleSaveSubmit}>
              </BlogForm>
            </Togglable>
          }
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikesIncrease} handleDelete={handleBlogDelete} />
          )}
          <footer>Blog app, Department of Computer Science, University of Helsinki 2020</footer>
        </div>
      }
    </div >
  )
}
export default App