const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const keys = require('./config/keys');
const fetch = require('node-fetch');

const TOKEN = keys.TOKEN;
const PORT = 5000;
const BASE_URL = 'https://api.spotify.com/v1/search?';

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/search',(req,res) =>{
    let FETCH_URL;
    FETCH_URL = BASE_URL + 'q=' + req.body.artist+'&type=artist&limit=1&access_token='+TOKEN;
    
    fetch(FETCH_URL, { method: 'GET'})
      .then(res => res.json())
      .then(json => {

         let followers = json.artists.items[0].followers.total;
         let genre = capitalizeFirstLetter(json.artists.items[0].genres[0]);
         let name = json.artists.items[0].name;
         let image = json.artists.items[0].images[1].url;
          res.render('index',{followers:followers,genre:genre,name:name,image:image});
       });
});
app.get('/',(req,res)=>{
  res.render("index",{followers:'',genre:'',name:'',image:''});

});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.listen(PORT);
