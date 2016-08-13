import axios from 'axios'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'

class CommentBox extends Component {
  constructor(props) {
    super(props)

    this.state = {data: []}
  }

  loadCommentsFromServer() {
    axios.get(this.props.url)
      .then(response => response.data)
      .then(data => {
        this.setState({data})
      })
      .catch(err => {
        console.error(this.props.url, err.toString())
      })
  }

  componentDidMount() {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval)
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
      <form className="commentForm">
        <input type="text" placeholder="Your name"/>
        <input type="text" placeholder="Say something..."/>
        <input type="submit" value="Post"/>
      </form>
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

const API = `http://localhost:${process.env.API_PORT || 3001}/api/comments`

ReactDOM.render(
  <CommentBox url={API} pollInterval={2000}/>, document.getElementById('root')
)
