import React, { useState } from 'react'
import { API } from '../../utils/Api'

const Register = ({onRegisterSuccess = () => {}, }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    password_repect: ''
  })

  const handleInput = (type) => {

    return (e) => {
      const text = e.target.value
      setFormData({
        ...formData,
        [type]: text
      })
    }
  }

  const handleSubmit = () => {
    if (formData.password === formData.password_repect) {
      API.register(formData.name, formData.password, formData.id).then(res => {
        if (res.status === 200) {
          onRegisterSuccess()
        }
      })
    } else {
      setFormData({
        ...formData,
        password: '',
        password_repect: ''
      })
      alert('input again.')
    }
  }

  return (
    <div>
      <input type="text" onInput={handleInput('name')} placeholder='name'/> <br/>
      <input type="text" onInput={handleInput('id')} placeholder='id'/> <br/>
      <input type="text" onInput={handleInput('password')} placeholder='password'/> <br/>
      <input type="text" onInput={handleInput('password_repect')} placeholder='password_again'/> <br/>
      <button onClick={handleSubmit}>Register</button>
    </div>
  )
}

export default Register
