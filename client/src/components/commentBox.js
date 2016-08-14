import axios from 'axios'
import React, {Component} from 'react'

import CommentList from './commentList'
import CommentForm from './commentForm'

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
        console.error(this.props.url, err)
      })
  }

  handleCommentSubmit = (comment) => {
    comment.id = Date.now()
    this.setState({data: [...this.state.data, comment]})
    axios.post(this.props.url, comment)
      .then(data => this.setState({data}))
      .catch(err => console.log(this.props.url, err))
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

export default CommentBox
