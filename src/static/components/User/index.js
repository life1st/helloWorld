import React, { useEffect, useState } from 'react'
import css from './index.scss'
import { API } from '../../utils/Api'
import Login from './login'
import Register from './register'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

const User = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [hiddenFrom, setShowForm] = useState('login')
  const history = useHistory()

  const { isLoading, data, refetch } = useQuery(null, API.user, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setUserInfo(data)
    }
  }, [ userInfo, data ])

  const handleLogout = () => {
    API.logout().then(res => {
      if (res.status === 200) {
        setUserInfo(null)
      }
    })
  }

  const handleChangeForm = () => {
    if (hiddenFrom === 'login') {
      history.push('/login')
    } else {
      setShowForm('register')
    }
  }

  if (isLoading === 'loading') {
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
