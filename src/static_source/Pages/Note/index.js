import React from 'react'
import { useQuery } from 'react-query'
import { API } from '../../utils/Api'
import { useParams, useHistory } from 'react-router-dom'
import Editor from '../../components/Editor'
import { EditorState, convertFromRaw } from 'draft-js'

const NotePage = () => {
  const { id } = useParams()
  const history = useHistory()
  const { isLoading, data, error } = useQuery(id, API.note)
  if (error) {
    history.replace('/')
  }
  if (isLoading) {
    return (<div>Loading...</div>)
  }
  const { user } = data
  const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(data.content)))
  console.log(editorState.getCurrentContent().hasText())
  return (
    <div>
      <h1>{data.title}</h1>
      <p>
        <span>{user.name}</span>
      </p>
      <Editor 
        editorConfig={{
          readOnly: true,
          editorState
        }}
      />
      <div>
        <button onClick={() => {history.push('/')}}>Back Home</button>
      </div>
    </div>
  )
}

export default NotePage
