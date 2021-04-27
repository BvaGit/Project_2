var express = require('express')
var app = express()
var port = 3000

app.get('/', function (req, res) {
  res.send('GET IS WORKING')
})

// function getHandler (req, res) {
//   var serverAnswer = console.log('get is working')
//   res.send(serverAnswer)
// }

app.post('/', function (req, res) {
  res.send('POST')
})

app.put('/', function (req, res) {
  res.send('PUT ')
})

app.delete('/', function (req, res) {
  res.send('DELETE')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})