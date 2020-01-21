import React, { Component } from 'react'
import User from './components/User'
import NoteList from './components/NoteList'
import { API } from './utils/Api'

class App extends Component {
  state = {
    isSending: false
  }
  sendReq = () => {
    API.note().then(() => {
      if (this.state.isSending) {
        this.sendReq()
      }
    })
  }

  startReq = () => {
    this.setState({
      isSending: true
    })
    this.sendReq()
  }
  stopReq = () => {
    this.setState({
      isSending: false
    })
  }

  render() {
    const { isSending } = this.state

    return (
      <div>
        App
        <button onClick={isSending ? this.stopReq : this.startReq}>
          {isSending ? 'stop' : 'test req'}
        </button>
        <User />
        <NoteList />
      </div>
    )
  }
}

export default App
