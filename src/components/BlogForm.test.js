import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm/> update parents state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog}></BlogForm>
  )
  const titleInput = component.container.querySelector('.title')
  const authorInput = component.container.querySelector('.author')
  const urlInput = component.container.querySelector('.url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of form is easy' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'test' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'test.js' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of form is easy')
  expect(createBlog.mock.calls[0][0].author).toBe('test')
  expect(createBlog.mock.calls[0][0].url).toBe('test.js')
})