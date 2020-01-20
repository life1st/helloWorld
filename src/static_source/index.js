import React from 'react'
import { render } from 'react-dom'
import App from './app'

import { API } from './utils/Api/index'

API.Note().then(res => {
  console.log(res)
}).catch(e => {
  console.error(e)
})

render(<App />, document.getElementById('root'))