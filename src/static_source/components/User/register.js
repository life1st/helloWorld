import React, { useState } from 'react'
import { API } from '../../utils/Api'
import css from './index.scss'

const Register = ({onRegisterSuccess = () => {}, }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    password_repect: ''
  })

  const [showForm, setFormShowable] = useState(false)

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

  const handleCloseMod = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFormShowable(false)
  }

  return (
    <div className={css.registerContainer}>
      {
        showForm ? (
          <>
          <div className={css.mod} onClick={handleCloseMod}></div>
          <div className={css.registerForm}>
            <input type="text" onInput={handleInput('name')} placeholder='name'/> <br/>
            <input type="text" onInput={handleInput('id')} placeholder='id'/> <br/>
            <input type="text" onInput={handleInput('password')} placeholder='password'/> <br/>
            <input type="text" onInput={handleInput('password_repect')} placeholder='password_again'/> <br/>
            <button onClick={handleSubmit}>Register</button>
          </div>
          </>
        ) : (
          <button onClick={() => {setFormShowable(true)}}>Register</button>
        )
      }
    </div>
  )
}

export default Register
