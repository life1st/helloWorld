import React from 'react'
import { useQuery } from 'react-query'
import { API } from '../../utils/Api'
import { useParams, useHistory } from 'react-router-dom'

const NotePage = () => {
  const { id } = useParams()
  const history = useHistory()
  
  const { isLoading, data } = useQuery(id, API.note)
  console.log(isLoading, data)
  return (
    <div>
      Note. {id}

      <div>
        <button onClick={() => {history.push('/')}}>Back Home</button>
      </div>
    </div>
  )
}

export default NotePage
