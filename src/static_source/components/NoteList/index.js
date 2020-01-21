import React, { useState, useEffect } from 'react'
import { API } from '../../utils/Api'

const NoteList = (props) => {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    if (!notes) {
      API.note().then(res => {
        if (res.status === 200) {
          setNotes(res.data)
        }
      })
    }
  }, [notes])

  return (
    <div>
      {
        notes ? notes.map(note => {
          return (<p>{note.title}</p>)
        }) : 'loading notes'
      }
    </div>
  )
}

export default NoteList
