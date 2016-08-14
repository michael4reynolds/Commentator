import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import CommentBox from './components/commentBox'

const API = `http://localhost:${process.env.API_PORT || 3001}/api/comments`

ReactDOM.render(
  <CommentBox url={API} pollInterval={2000}/>, document.getElementById('root')
)
