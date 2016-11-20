var express = require('express')
var app = express()
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.get('/', function (req, res) {
  displayForm(res);
});

//'myfile' is the name of the field in the form that has the file
app.post('/', upload.single('myfile'), function (req, res, next) {
  var r={"File Name": req.file.originalname,"File Size":req.file.size + " bytes"};
  res.send(r);
});

app.listen(8080);

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        if (err) throw err;
        else
        {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
        }
    });
}