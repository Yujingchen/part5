import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonLabel = visibility ? 'hide' : 'view'
  const toggleVisibility = () => { setVisibility(!visibility) }
  const contentVisibility = visibility ? { display: '' } : { display: 'none' }
  const blogContent =
    (
      <div className="blog">
        <ul className="blogContent" style={contentVisibility}>
          <li>{blog.url}</li>
          <li>
            <span className="likes">likes</span>
             <span className="likesCount">{blog.likes}</span>
            <button className="likeButton" onClick={(event) => handleLikes(event, blog.id)}>like</button>
          </li>
        </ul>
      </div>
    )

  return (
    <div className="blog">
      <span>{blog.title}</span> 
      <span>{blog.author}</span>
        <button className="showButton" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
          <button className="deleteButton" onClick={(event) => handleDelete(event, blog.id)}>delete
          </button>
      {blogContent}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
