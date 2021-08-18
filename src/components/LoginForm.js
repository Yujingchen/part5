import React, { useState } from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  loginUser,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleTextChange = (event) => {
    switch (event.target.name) {
    case 'username':
      setUsername(event.target.value)
      break
    case 'password':
      setPassword(event.target.value)
      break
    default:
      break
    }
  }
  const login = (event) => {
    event.preventDefault()
    const loginData = {
      username: username,
      password: password,
    }
    loginUser(loginData)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          <span>username </span>
          <input type='text' value={username} name="username" id='username'
            onChange={(event) => handleTextChange(event)} />
        </div>
        <div>
          <span>password </span>
          <input type='password' value={password} name="password" id="password"
            onChange={(event) => handleTextChange(event)} />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm
