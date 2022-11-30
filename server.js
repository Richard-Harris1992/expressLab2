//Global variables.

const express = require('express');
const app = express();
const port = 3000;

// Template engine

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

// Greeting portion of assignment.

app.get('/greeting', (req, res) => {
    res.send('<h1>Welcome to the twilight zone!</h1>');
});

app.get('/greeting/:name', (req, res) => {
    res.render('greeting', {heading: `How are you doing ${req.params.name}`});
});

//TIP portion of assignment.

app.get('/tip/:total/:percentage', (req, res) => {
  res.send(`<h1> Your tip should be ${req.params.total * (req.params.percentage / 100)} </h1>`)
});

const magicResponse = () => {
  let response = [
   "It is certain",
   "It is decidedly so",
   "Without a doubt", 
   "Yes definitely",
   "You may rely on it", 
   "As I see it yes", 
   "Most likely", 
   "Outlook good",
   "Yes", 
   "Signs point to yes", 
   "Reply hazy try again", 
   "Ask again later",
   "Better not tell you now", 
   "Cannot predict now", 
   "Concentrate and ask again",
   "Don't count on it", 
   "My reply is no", 
   "My sources say no",
   "Outlook not so good", 
   "Very doubtful"
  ];
  return response[Math.floor(Math.random() * response.length)];
}

app.get('/magic/:question', (req, res) => {
  let question = req.params.question;
  question = question.split('%20');
  question = question.join(' ');
  res.send(`<h1>${question}</br></br>${magicResponse()}</h1>`);
});

app.listen(port, () => console.log(`port 3000 connected.`));