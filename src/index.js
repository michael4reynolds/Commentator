import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'

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
        <Comment author="Michael Reyolds">This is one comment</Comment>
        <Comment author="Anthony Robinson">This is *another* comment</Comment>
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

class Comment extends Component {
  render() {
    const md = new Remarkable()
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {md.render(this.props.children.toString())}
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('root')
)
