import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonLabel = visibility ? 'hide' : 'view'
  const toggleVisibility = () => { setVisibility(!visibility) }
  const contentVisibility = visibility ? { display: '' } : { display: 'none' }
  const blogContent =
    (
      <div className="blogContainer" style={contentVisibility}>
        <ul className="blogContent" >
          <li>{blog.url}</li>
          <li>
            <span className="likes">likes </span>
            <span className="likesCount">{blog.likes} </span>
            <button className="likeButton" onClick={(event) => handleLikes(event, blog.id)}>like</button>
          </li>
        </ul>
      </div>
    )

  return (
    <div className="blog" style={{ margin: '15px 0', padding: '0 5px' }}>
      <span >{blog.title}</span>
      <span>{blog.author}</span>
      <button style={{ margin: '5px 10px' } } className="showButton" onClick={toggleVisibility}>
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
