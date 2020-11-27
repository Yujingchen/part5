import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonLabel = visibility ? 'hide' : 'view'
  const toggleVisibility = () => { setVisibility(!visibility) }
  const contentVisibility = visibility ? { display: '' } : { display: 'none' }
  const blogContent =
    (
      <>
        <ul className="blogContent" style={contentVisibility}>
          <li>{blog.url}</li>
          <li><span className="likes">likes {blog.likes}</span>
            <span><button onClick={(event) => handleLikes(event, blog.id)}>like</button></span></li>
        </ul>
      </>
    )

  return (
    <div className="blog">
      <span>{blog.title}</span> 
      <span>{blog.author}</span>
      <span>
        <button onClick={toggleVisibility}>
          {buttonLabel}
        </button>
        <span>
          <button onClick={(event) => handleDelete(event, blog.id)}>delete</button>
        </span>
      </span>
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
