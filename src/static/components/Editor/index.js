import React, { useState, useRef } from 'react'
import { 
  Editor, EditorState, 
  convertFromRaw, 
  AtomicBlockUtils,
  convertToRaw
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import css from './inde.scss'
import cls from 'classnames'
import Toolbar from './Toolbar'

const myEditor = ({
  submitText = 'submit',
  onSubmit = () => {},
  editorConfig = {}
}) => {
  console.log(editorConfig.contentJSON)
  const [ editorState, setEditorState ] = useState(
    editorConfig.contentJSON
    ? EditorState.createWithContent(
        convertFromRaw(
          JSON.parse(editorConfig.contentJSON)
        )
      )
    : EditorState.createEmpty()
  )
  const editorRef = useRef(null)
  const handleModClick = () => {
    editorRef.current.focus()
  }
  const logState = () => {
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
  };

  const handleMediaAdd = (data) => {
    logState()
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src: data.url }
      )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );


    setEditorState(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    ));

    logState()
    editorRef.current.focus()
  }
  
  const handleSubmit = () => onSubmit(editorState)

  const mediaBlockRenderer = (block) => {
    console.log(block.type)
  }

  return (
    <div className={css.container}>
      { !editorConfig.readOnly && (
        <Toolbar
          onImageUpload={handleMediaAdd}
        />
      )}
      <div className={cls(css.editorContainer, editorConfig.readOnly && css.readOnly)} onClick={handleModClick}>
        <Editor
          {...editorConfig}
          ref={editorRef}
          blockRendererFn={mediaBlockRenderer}
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
