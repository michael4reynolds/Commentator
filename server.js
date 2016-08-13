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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Cache-Control', 'no-cache')
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
