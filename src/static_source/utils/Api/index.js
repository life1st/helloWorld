import axios from 'axios'
import { isDev } from '../consts'

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

  return axios.get(url)
}
const register = (name, password, id) => {
  const url = '/api/user/register'

  return axios.post(url, {name, password, id})
}

export const API = {
  note, createNote, deleteNote, login, logout, user, register
}
