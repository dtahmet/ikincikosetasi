
const fs = require('fs');
const path = require('path')
const express = require('express');
const exp = require('constants');

const app = express();

app.set('views', path.join(__dirname, 'views') ) /* 
Buradaki ilk views html yani yeni .ejs lerin path i
ikinci views de klasör adı
aşağıdaki view engine de görüntüleme engine değişikliği
yapmanı sağlıyor
*/ 

app.set('view engine', 'ejs');

app.use(express.static('public')); /* Bu çok önemli */
app.use(express.urlencoded({extended:false}));

app.get('/', function(req,res){
    res.redirect('/index')
} );

app.get('/restaurants', function(req,res){
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants})
});

app.get('/index', function(req,res){
    res.render('index');
})

app.get('/about', function(req,res){
    res.render('about')
})

app.get('/confirm', function(req,res){
    res.render('confirm')
})

app.get('/recommend', function(req,res){
    res.render('recommend')
})

app.post('/recommend', function(req,res){
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);


    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    
    res.redirect('/confirm')


})

app.listen(3000);