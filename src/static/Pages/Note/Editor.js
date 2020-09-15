import React, { useState, useEffect } from 'react'
import Editor from '../../components/Editor'
import { API } from '../../utils/Api'
import { createRandomId } from '../../utils/utils'
import css from './Editor.scss'
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js'
import { useHistory, useParams, useLocation } from 'react-router-dom'

const EditorPage = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const [ title, setTitle ] = useState('')
  const [ contentJSON, setContentJSON ] = useState(null)

  const isEdit = location.pathname.includes('/edit')
  const id = isEdit ? params.id : createRandomId()
  
  useEffect(() => {
    if (isEdit) {
      API.note(id)
        .then(data => {
          setTitle(data.title)
          setContentJSON(data.content)
        })
    }
  }, [])

  
  const handleTitleInput = (e) => {
    const v = e.target.value
    setTitle(v)
  }

  const handleSubmit = editorState => {
    let content = editorState.getCurrentContent()
    if (content.hasText() && title.length > 0) {
      content = JSON.stringify(
          convertToRaw(content)
        )
      if (isEdit) {
        API.editNote({
          title, content, id
        }).then(data => {
          alert('success.', data)
          history.replace(`/note/${id}`)
        }).catch(e => {
          console.log('e', JSON.stringify(e))
          if (e.status === 404) {
            alert('not fount, create new note?')
          }
        })
      } else {
        API.createNote({
          title, content, id
        }).then(res => {
          console.log(res)
          alert('success')
          history.replace(`/note/${id}`)
        })
      }
    }
  }

  if (isEdit && !contentJSON) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <input
        className={css.title}
        type="text"
        placeholder='title'
        value={title}
        onChange={handleTitleInput}
      />
      <Editor 
        onSubmit={handleSubmit}
        editorConfig={{
          contentJSON
        }}
      />
    </div>
  )
}

export default EditorPage
