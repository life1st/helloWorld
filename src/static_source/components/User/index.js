import React, { useEffect, useState } from 'react'
import css from './index.scss'
import { API } from '../../utils/Api'

const User = (props) => {
  const [reqStatus, setReqStatus] = useState('done')
  const [userInfo, setUserInfo] = useState(null)
  const [formData, setFromData] = useState({
    name: '',
    password: ''
  })
  useEffect(() => {
    if (reqStatus === 'done') {
      setReqStatus('loading')
      !userInfo ? API.user().then(res => {
        setReqStatus('done')
        if (res.status === 200) {
          setUserInfo(res.data)
        }
      }).catch(() => {
        setReqStatus('done')
      }) : setReqStatus('done')
    }
  }, [userInfo])

  const handleLogin = () => {
    setReqStatus('loading')
    API.login(formData).then(res => {
      setReqStatus('done')
      if (res.status === 200) {
        setUserInfo(res.data)
      }
    })
  }

  const handleLogout = () => {
    setReqStatus('loading')
    API.logout().then(res => {
      setReqStatus('done')
      if (res.status === 200) {
        setUserInfo(null)
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

  if (reqStatus === 'loading') {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      {userInfo ? (
        <div>
          <p>{userInfo.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input type="text" onInput={handleInput('name')}/>
          <input type="password" onInput={handleInput('password')}/>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  )
}

export default User
