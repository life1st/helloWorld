import React, { useState } from 'react'
import Editor from '../../components/Editor'
import { API } from '../../utils/Api'
import { createRandomId } from '../../utils/utils'
import css from './Editor.scss'
import { convertToRaw } from 'draft-js'

const EditorPage = () => {
  const [ title, setTitle ] = useState('')
  const id = createRandomId()

  const handleTitleInput = (e) => {
    const v = e.target.value
    setTitle(v)
  }

  const handleSubmit = (state) => {
    const content = state.getCurrentContent()
    if (content.hasText() && title.length > 0) {
      API.createNote({
        title,
        content: JSON.stringify(convertToRaw(content)),
        id
      }).then(res => {
        console.log(res, 'create')
      })
    }
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
      />
    </div>
  )
}

export default EditorPage
