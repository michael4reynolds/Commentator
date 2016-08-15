import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import CommentBox from './components/commentBox'

const API = `http://localhost:${process.env.API_PORT || 3001}/api/comments`

class App extends Component {
  render() {
    return (
      <CommentBox url={API} pollInterval={2000}/>
    )
  }
}

export default App
