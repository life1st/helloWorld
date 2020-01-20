import React, { useEffect, useState } from 'react'
import css from './index.scss'
import { API } from '../../utils/Api'

const User = (props) => {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    API.User().then(res => {
      
    })
  }, userInfo)

  return (
    <div>

    </div>
  )
}