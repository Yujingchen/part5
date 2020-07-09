import React from 'react'

const BlogForm = ({ title, author, url, handleTitleChange,
    handleAuthorChange, handleUrlChange, handleSubmit }) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul style={{ listStyleType: "none" }}>
                    <li>
                        <label htmlFor="title">title: </label>
                        <input value={title} name="title" onChange={(event) => handleTitleChange(event)}></input>
                    </li>
                    <li>
                        <label htmlFor="author">author: </label>
                        <input value={author} name="author" onChange={(event) => handleAuthorChange(event)}></input>
                    </li>
                    <li>
                        <label htmlFor="url">url: </label>
                        <input value={url} name="url" onChange={(event) => handleUrlChange(event)}></input>
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