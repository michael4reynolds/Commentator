import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class CommentBox extends Component {
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList/>
        <CommentForm/>
      </div>
    )
  }
}

class CommentList extends Component {
  render() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    )
  }
}

class CommentForm extends Component {
  render() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    )
  }
}

export default CommentForm

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)
