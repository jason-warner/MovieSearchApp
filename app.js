const express = require('express');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search')
});

app.get('/results', (req, res) => {
    var query = req.query.search;
    var url = 'https://omdbapi.com/?s=' + query + '&apikey=thewdb';
    request(url, function (error, response, body) {
        console.error('error:', error); 
        console.log('statusCode:', response && response.statusCode);
        var data = JSON.parse(body)
        res.render('results', {data:data});
    });
});

app.get('*', (req, res) => {
    res.send('Someone made a booboo');
});

app.listen(3000, () => {
    console.log('Server is listening');
});