import React, { Component } from 'react'
import Navi from './components/Navi'
import {
  BrowserRouter as Router,
  Switch,
  Route,
}  from 'react-router-dom'
import loadable from '@loadable/component'

const pages = [
  {
    name: 'Login',
    path: '/login',
    component: loadable(() => import(
      /* webpackChunkName: 'Login' */
      './Pages/Login'
    ))
  }, 
  {
    name: 'Note',
    path: '/note/:id',
    component: loadable(() => import(
      './Pages/Note'
    ))
  },
  {
    name: 'note_create',
    path: '/note/:id/create',
    component: loadable(() => import(
      './Pages/Note/Editor'
    ))
  },
  {
    name: 'note_edit',
    path: '/note/:id/edit',
    component: loadable(() => import(
      './Pages/Note/Editor'
    ))
  },
  {
    name: 'note_list',
    path: '/',
    component: loadable(() => import(
      './components/NoteList'
    ))
  }
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
            pages.map(page => (
              <Route key={page.path} path={page.path} component={page.component}/>
            ))
          }
        </Switch>
      </Router>
    )
  }
}

export default App
