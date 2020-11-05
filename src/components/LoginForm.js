import React, { useState } from 'react'




const LoginForm = ({
    loginUser,
}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleTextChange = (event) => {
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value)
                break
            case "password":
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
                    username
                    <input value={username} name="username"
                        onChange={(event) => handleTextChange(event)} />
                </div>
                <div>
                    password
                    <input value={password} name="password"
                        onChange={(event) => handleTextChange(event)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default LoginForm
