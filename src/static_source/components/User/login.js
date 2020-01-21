import React, { useState } from 'react'
import { API } from '../../utils/Api'

const Login = ({onLoginSuccess = () => {}}) => {
  const [formData, setFromData] = useState({
    id: '',
    password: ''
  })

  const handleLogin = () => {
    API.login(formData).then(res => {
      if (res.status === 200) {
        onLoginSuccess(res.data)
      }
    })
  }
  const handleInput = (type) => {
    return (e) => {
      const text = e.target.value
      setFromData({
        ...formData,
        [type]: text
      })
    }
  }

  return (
    <div>
      <input type="text" onInput={handleInput('id')} placeholder='id'/>
      <input type="password" onInput={handleInput('password')} placeholder='password'/>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
