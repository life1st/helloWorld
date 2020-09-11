import React from 'react'
import { useQuery } from 'react-query'
import { API } from '../../utils/Api'
import { useParams, useHistory } from 'react-router-dom'

const NotePage = () => {
  const { id } = useParams()
  const history = useHistory()
  const { isLoading, data, error } = useQuery(id, API.note)
  if (error) {
    return (
      <div>Error. {error}</div>
    )
  }
  if (isLoading) {
    return (<div>Loading...</div>)
  }
  const { user } = data
  return (
    <div>
      <h1>{data.title}</h1>
      <p>
        <span>{user.name}</span>
      </p>
      <pre dangerouslySetInnerHTML={{__html: data.content}} />
      <div>
        <button onClick={() => {history.push('/')}}>Back Home</button>
      </div>
    </div>
  )
}

export default NotePage
