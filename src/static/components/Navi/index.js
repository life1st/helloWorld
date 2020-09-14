import React from 'react'
import css from './index.scss'
import User from '../User'

const Navi = () => {

  return (
    <div className={css.naviContainer}>
      <User />
    </div>
  )
}

export default Navi