import React from 'react'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input value={username} name="username"
                        onChange={(event) => handleUsernameChange(event)} />
                </div>
                <div>
                    password
                    <input value={password} name="password"
                        onChange={(event) => handlePasswordChange(event)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default LoginForm
