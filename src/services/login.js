import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'
const login = (credentials) => {
  return axios.post(baseUrl, credentials).then(response => response.data)
}

export default { login }