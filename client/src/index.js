import axios from 'axios'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Remarkable from 'remarkable'

class CommentBox extends Component {
  constructor(props) {
    super(props)

    this.state = {data: []}
  }

  loadCommentsFromServer = () => {
    axios.get(this.props.url)
      .then(response => response.data)
      .then(data => {
        this.setState({data})
      })
      .catch(err => {
        console.error(this.props.url, err.toString())
      })
  }

  handleCommentSubmit = (comment) => {
    // todo: submit to the server and refresh the list
  }

  componentDidMount() {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  }


  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
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
  constructor(props) {
    super(props)

    this.state = {author: '', text: ''}
  }

  handleAuthorChange = (e) => {
    this.setState({author: e.target.value})
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const author = this.state.author.trim()
    const text = this.state.text.trim()
    if(!text || !author){
      return
    }

    this.props.onCommentSubmit({author, text})
    this.setState({author: '', text: ''})
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text"
               placeholder="Your name"
               value={this.state.author}
               onChange={this.handleAuthorChange}
        />
        <input type="text"
               placeholder="Say something..."
               value={this.state.text}
               onChange={this.handleTextChange}
        />
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
