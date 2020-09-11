import React, { useEffect, useState } from 'react'
import css from './index.scss'
import { API } from '../../utils/Api'
import Login from './login'
import Register from './register'
import { useHistory, useLocation } from 'react-router-dom'


const User = (props) => {
  const [reqStatus, setReqStatus] = useState('done')
  const [userInfo, setUserInfo] = useState(null)
  const [hiddenFrom, setShowForm] = useState('login')
  const history = useHistory()
  const location = useLocation()

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
    console.log(hiddenFrom, location)
    if (hiddenFrom === 'login') {
      history.push('/login')
    } else {
      // setShowForm('login')
      setShowForm('register')
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
          <p>
            {userInfo.name}
            <button onClick={() => { history.push('/note/create') }}>+ Create Note</button>
            <button onClick={handleLogout}>Logout</button>
          </p>
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
