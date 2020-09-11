import React, { useState, useEffect } from 'react'
import { API } from '../../utils/Api'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import css from './index.scss'

const NoteList = (props) => {
  // const [notes, setNotes] = useState(null)

  // useEffect(() => {
  //   if (!notes) {
  //     API.note().then(res => {
  //       setNotes(res.data)
  //     })
  //   }
  // }, [notes])

  const { isLoading, data: notes } = useQuery(['notes', notes], () => API.note())
  const history = useHistory()
  const handleNoteClick = (id) => {
    history.push(`/note/${id}`)
  }
  
  return (
    <div className={css.noteList}>
      {
        isLoading 
        ? 'loading notes' 
        : notes.map(note => (
          <p 
            className={css.noteItem}
            key={note.id}
            onClick={() => {handleNoteClick(note.id)}}
          >
            {note.title}
          </p>
        ))
      }
    </div>
  )
}

export default NoteList
