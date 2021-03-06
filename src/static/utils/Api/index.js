import axios from 'axios'
const href = window.location.href
if (href.includes('/blog.life1st.me')) {
  axios.defaults.baseURL = 'https://intro.life1st.me'
}
const note = (id) => {
  const url = '/api' + (id ? `/note/${id}` : '/notes')

  return axios.get(url).then(res => res.data)
}
const createNote = ({
  title, content, id
}) => {
  if (!content || !id) return
  const url = `/api/note/${id}`

  return axios.post(url, {
    content, title
  }).then(res => res.data)
}
const deleteNote = (id) => {
  const url = `/api/note/${id}`

  return axios.delete(url).then(res => res.data)
}
const editNote = ({
  title, content, id
}) => {
  if (!content || !id) return
  const url = `/api/note/${id}`

  return axios.put(url, {
    title, content
  }).then(res => res.data)
}
const login = (data) => {
  const url = '/api/user/login'

  return axios.post(url, data)
}
const logout = (data) => {
  const url = '/api/user/logout'

  return axios.post(url, data)
}
const user = () => {
  const url = '/api/user'

  return axios.get(url).then(res => res.data)
}
const register = (name, password, id) => {
  const url = '/api/user/register'

  return axios.post(url, {name, password, id})
}

export const API = {
  note, createNote, deleteNote, editNote, login, logout, user, register
}
