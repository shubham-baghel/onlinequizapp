const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});



app.get('/api/questions', (req, res) => {
    res.send({ questions:
        [{
            question : "Who is Prime minister of India",
            answer:[3],
            options : [
                {id:1,o:"Arun Jaitley"},
                {id:2,o:"Dr. Manmohan singh"},
                {id:3,o:"Narendra Modi"},
                {id:4,o:"Amit Shah"}
            ]
        },
        {
            question : "Who is Chief Minister of Rajasthan?",
            answer:[1],
            options : [
                {id:1,o:"Vasundhara Raje"},
                {id:2,o:"Ashok Gahlot"},
                {id:3,o:"Sachin pielet"},
                {id:4,o:"Ganshyam Tiwari"}
            ]
        },
        {
            question : "Who is/was Chief Minister of Rajasthan?",
            answer:[1,2],
            options : [
                {id:1,o:"Vasundhara Raje"},
                {id:2,o:"Ashok Gahlot"},
                {id:3,o:"Sachin pielet"},
                {id:4,o:"Ganshyam Tiwari"}
            ]
        }]});
  });

app.listen(port, () => console.log(`Listening on port ${port}`));