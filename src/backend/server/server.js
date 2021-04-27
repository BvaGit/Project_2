var express = require('express')
var app = express()
var port = 3000
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});


app.get('/', function (req, res) {
  res.send('GET IS WORKING')
})

app.post('/', function (req, res) {
  var serverAnswer = req.body
console.log(req.body)
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