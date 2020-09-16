import axios from 'axios'

export default {
  note: (id) => {
    const url = '/api' + (id ? `/note/${id}` : '/notes')
  
    return axios.get(url).then(res => res.data)
  },
  createNote: ({
    title, content, id
  }) => {
    if (!content || !id) return
    const url = `/api/note/${id}`
  
    return axios.post(url, {
      content, title
    }).then(res => res.data)
  },
  deleteNote: (id) => {
    const url = `/api/note/${id}`
  
    return axios.delete(url).then(res => res.data)
  },
  editNote: ({
    title, content, id
  }) => {
    if (!content || !id) return
    const url = `/api/note/${id}`
  
    return axios.put(url, {
      title, content
    }).then(res => res.data)
  },
  uploadImage: ({
    formData
  }) => {
    const url = `/api/file`

    return axios.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    }).then(res => res.data)
  }
}
