import React, { Component } from 'react'
import Navi from './components/Navi'
import {
  BrowserRouter as Router,
  Switch,
  Route,
}  from 'react-router-dom'
import loadable from '@loadable/component'
const Login = loadable(() => import(
  /* webpackChunkName: 'Login' */
  './Pages/Login'
))
const Note = loadable(() => import(
  './Pages/Note'
))
const Editor = loadable(() => import(
  './Pages/Note/Editor'
))
const NoteList = loadable(() => import(
  './components/NoteList'
))

class App extends Component {
  state = {
    isSending: false
  }
  // sendReq = () => {
  //   API.note().then(() => {
  //     if (this.state.isSending) {
  //       this.sendReq()
  //     }
  //   })
  // }

  // startReq = () => {
  //   this.setState({
  //     isSending: true
  //   })
  //   this.sendReq()
  // }
  // stopReq = () => {
  //   this.setState({
  //     isSending: false
  //   })
  // }

  render() {

    return (
      <Router>
        <Navi />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/note/create' component={Editor} />
          <Route path='/note/:id/edit' component={Editor} />
          <Route path='/note/:id' component={Note} />
          <Route path='/' component={NoteList} />
        </Switch>
      </Router>
    )
  }
}

export default App
