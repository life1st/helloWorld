import React, { useEffect, useState } from 'react'
import css from './index.scss'
import { API } from '../../utils/Api'
import Login from './login'
import Register from './register'


const User = (props) => {
  const [reqStatus, setReqStatus] = useState('done')
  const [userInfo, setUserInfo] = useState(null)
  const [hiddenFrom, setShowForm] = useState('login')

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

  const handleLogout = () => {
    setReqStatus('loading')
    API.logout().then(res => {
      setReqStatus('done')
      if (res.status === 200) {
        setUserInfo(null)
      }
    })
  }

  const handleChangeForm = () => {
    if (hiddenFrom === 'login') {
      setShowForm('register')
    } else {
      setShowForm('login')
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
          {
            hiddenFrom === 'login' 
            ? <Register onRegisterSuccess={() => {handleChangeForm('login')}}/>
            : <Login onLoginSuccess={setUserInfo} />
          }
          <button onClick={handleChangeForm}>to {hiddenFrom}</button>
        </div>
      )}
    </div>
  )
}

export default User
