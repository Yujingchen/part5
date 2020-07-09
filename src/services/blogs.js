import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
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

const updateBlog = (update) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.put(`${baseUrl}/${update.id}`, update, config).then(response =>
    response.data)
}
export default { getAll, postNewBlog, setToken, updateBlog }