import React from 'react'
import Login from '../../components/User/login'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
  const history = useHistory()

  const handleLoginSuccess = (e) => {
    console.log(e)
    history.push('/')
  }
  
  return (
    <div>
      <p>Login</p>
      <Login
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default LoginPage
