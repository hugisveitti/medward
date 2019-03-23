var port = process.env.PORT || 8000;

var express = require('express');
var app = express();
var path = require('path');
const fetch = require("node-fetch");

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
})

app.use(express.static(__dirname + '/client'));

app.listen(port, () => {
    console.log("listening on port " + port);
});




app.get("/ssn/:ssn", (req, res) => {
  console.log(req.params.ssn)
  var sssn = 1507699999;
  var url ="http://healthapi.hc.t.is/api/PatientData/GetPatient/" + req.params.ssn;
  console.log(url);
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(JSON.stringify(myJson));
    res.send(JSON.stringify(myJson));
  })
})
