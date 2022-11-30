const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs') 
app.engine('madeline', (filePath, options, callback) => { 
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    
    const rendered = content.toString()
      .replace('#heading#', '<h1>' + options.heading + '</h1>');
    return callback(null, rendered);
  });
});

app.set('views', './views') ;
app.set('view engine', 'madeline');


app.get('/greeting', (req, res) => {
    res.send('<h1>Welcome to the twilight zone!</h1>');
});

app.get('/greeting/:name', (req, res) => {
    res.render('greeting', {heading: `How are you doing ${req.params.name}`});
});

app.listen(port, () => console.log(`port 3000 open`));