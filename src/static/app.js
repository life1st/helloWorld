import React, { Component } from 'react'
import Navi from './components/Navi'
import {
  BrowserRouter as Router,
  Switch,
  Route,
}  from 'react-router-dom'
import loadable from '@loadable/component'

const pages = [
  [
    'Login',
    '/login',
    loadable(() => import(
      /* webpackChunkName: 'Login' */
      './Pages/Login'
    ))
  ],
  [
    'note_create',
    '/note/create',
    loadable(() => import(
      './Pages/Note/Editor'
    ))
  ],
  [
    'note_edit',
    '/note/:id/edit',
    loadable(() => import(
      './Pages/Note/Editor'
    ))
  ],
  [
    'Note',
    '/note/:id',
    loadable(() => import(
      './Pages/Note'
    ))
  ],
  [
    'Keyframe',
    '/keyframe',
    loadable(() => import(
      './Pages/Keyframe'
    ))
  ],
  [
    'note_list',
    '/',
    loadable(() => import(
      './components/NoteList'
    ))
  ],
]

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
          {
            pages.map(([name, path, component]) => (
              <Route key={path} path={path} component={component}/>
            ))
          }
        </Switch>
      </Router>
    )
  }
}

export default App
