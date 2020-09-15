import React from 'react'
import { useQuery } from 'react-query'
import { API } from '../../utils/Api'
import { useParams, useHistory } from 'react-router-dom'
import Editor from '../../components/Editor'
import { EditorState, convertFromRaw } from 'draft-js'
import css from './index.scss'

const NotePage = () => {
  const { id } = useParams()
  const history = useHistory()
  const { isLoading, data, error } = useQuery(id, API.note, {
    retry: false,
    refetchOnWindowFocus: false
  })

  if (error) {
    history.replace('/')
  }
  if (isLoading) {
    return (<div>Loading...</div>)
  }
  const { user } = data
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(data.content))
  )

  const handleEdit = () => {
    history.push(`/note/${id}/edit`)
  }
  const handleDelete = () => {
    if (confirm(`ensure delete this note: ${data.title} ?`)) {
      API.deleteNote(id).then(() => {
        history.push('/')
      })
    }
  }

  return (
    <div className={css.container}>
      <h1 className={css.noteTitle}>{data.title}</h1>
      <p className={css.meta}>
        <span>{user.name}</span>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
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
