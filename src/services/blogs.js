import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newBlog, config).then(response =>
    response.data
  )
}

const updateBlog = (id, update) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.put(`${baseUrl}/${id}`, update, config).then(response =>
    response.data)
}

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${blog.id}`, config).then(response =>
    response.data)
}

export default { getAll, postNewBlog, setToken, updateBlog, deleteBlog }