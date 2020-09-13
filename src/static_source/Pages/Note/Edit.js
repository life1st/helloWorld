import React, { useState, useEffect } from 'react'
import Editor from '../../components/Editor'
import { useHistory, useParams } from 'react-router-dom'
import { API } from '../../utils/Api'
import { useQuery } from 'react-query'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import editCss from './Editor.scss'

const EditPage = () => {
  const history = useHistory()
  const { id } = useParams()
  const [ title, setTitle ] = useState('', [title])

  const { error, isLoading, data } = useQuery(id, API.note, {
    retry: false,
    refetchOnWindowFocus: false
  })
  
  useEffect(() => {
    data && setTitle(data.title)
  }, [data])

  const handleSubmit = (editorState) => {
    const contentState = editorState.getCurrentContent()
    if (contentState.hasText() && title.length > 0) {
      const content = JSON.stringify(convertToRaw(contentState))
      API.editNote({
        title, content, id
      }).then(() => {
        alert('success.')
        history.push('/')
      }).catch(e => {
        if (e.status === 404) {
          alert('not fount, create new note?')
        }
      })
    }
  }

  if (error || isLoading ) {
    return <div>Loading...</div>
  }
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(data.content))
  )

  return (
    <div>
      <input
        className={editCss.title}
        type="text"
        value={title}
        onChange={e => {setTitle(e.target.value)}}
      />
      <Editor 
        editorConfig={{
          editorState
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default EditPage
