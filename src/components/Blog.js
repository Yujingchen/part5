import React, { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonLabel = visibility ? 'hide' : 'show'
  const toggleVisibility = () => { setVisibility(!visibility) }
  const contentVisibility = visibility ? { display: "" } : { display: 'none' }
  const blogContent =
    (
      <>
        <ul style={contentVisibility}>
          <li>{blog.url}</li>
          <li><span>likes {blog.likes}</span>
            <span><button onClick={(event) => handleLikes(event, blog.id)}>like</button></span></li>
          <li>{blog.author}</li>
        </ul>
      </>
    )

  return (
    <div className="blog">
      {blog.title}
      <span>
        <button onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </span>
      {blogContent}
    </div>
  )
}

export default Blog
