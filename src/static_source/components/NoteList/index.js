import React, { useState, useEffect } from 'react'
import { API } from '../../utils/Api'
import { useQuery } from 'react-query'

const NoteList = (props) => {
  // const [notes, setNotes] = useState(null)

  // useEffect(() => {
  //   if (!notes) {
  //     API.note().then(res => {
  //       if (res.status === 200) {
  //         setNotes(res.data)
  //       }
  //     })
  //   }
  // }, [notes])

  const { isLoading, data: notes } = useQuery('todos', () => API.note())

  return (
    <div>
      {
        isLoading 
        ? 'loading notes' 
        : notes.map(note => (<p key={note.id}>{note.title}</p>))
      }
    </div>
  )
}

export default NoteList
