import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'

class CommentBox extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm/>
      </div>
    )
  }
}

class CommentList extends Component {
  render() {
    const commentNodes = this.props.data.map(comment =>
      <Comment author={comment.author} key={comment.id}>
        {comment.text}
      </Comment>
    )
    return (
      <div className="commentList">
        {commentNodes}
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
  rawMarkup() {
    const md = new Remarkable()
    const rawMarkup = md.render(this.props.children.toString())
    return {__html: rawMarkup}
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox url="/api/comments"/>,
  document.getElementById('root')
)
