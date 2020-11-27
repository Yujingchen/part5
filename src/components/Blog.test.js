import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from "./Blog"

test('render content', () => {
    const blog = {
        title: "test1",
        url: 'testing-library.github.com',
        likes: 1022,
        author: "yujing"
    }
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} handleLikes={mockHandler} />
    )
    expect(component.container).toHaveTextContent(
        'testing-library.github.com'
    )
    const title = component.getByText(
        'test1'
    )
    expect(title).toBeDefined()
    const element = component.getByText(
        'yujing'
    )
    expect(element).toBeDefined()

    const span = component.container.querySelector('.likes')
    expect(span).toHaveTextContent(
        'likes 1022'
    )

    const ul = component.container.querySelector('.blogContent');
    console.log(prettyDOM(ul))
    expect(ul).toHaveStyle("display:none;")

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(ul).not.toHaveStyle("display: none;")
    component.debug()
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

