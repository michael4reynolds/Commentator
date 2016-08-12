import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()

const COMMENTS_FILE = path.join(__dirname, 'comments.json')

app.set('port', (process.env.API_PORT || 3001))

app.use('/', express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Additional middleware which will set headers that we need on each request.
app.use((req, res, next) => {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/api/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const comments = JSON.parse(data)
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    const newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    }
    comments.push(newComment)
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), err => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      res.json(comments)
    })
  })
})


app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
