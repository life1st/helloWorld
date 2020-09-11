import React, { useState, useRef } from 'react'
import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import css from './inde.scss'

const myEditor = ({
  submitText = 'submit',
  onSubmit = () => {},
  editorConfig = {}
}) => {
  const [
    editorState, setEditorState
  ] = useState(() => 
    editorConfig.editorState 
    ? editorConfig.editorState 
    : EditorState.createEmpty()
  )
  const editorRef = useRef(null)
  const handleModClick = () => {
    editorRef.current.focus()
  }
  
  console.log(editorConfig)
  const handleSubmit = () => onSubmit(editorState)

  return (
    <div className={css.container}>
      <div className={css.editorContainer} onClick={handleModClick}>
        <Editor
          {...editorConfig}
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
      { !editorConfig.readOnly && (
        <button onClick={handleSubmit}>{submitText}</button>
      ) }
    </div>
  )
}

export default myEditor