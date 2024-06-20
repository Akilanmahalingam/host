// Requiring express app
const express = require('express');
const iii = require('./model/blogs')
//Setting up express app - invoking express 
const app = express();
// Listen to request 
app.listen(3000);

// const morgan=require('morgan');
// app.use(morgan('dev'));

const mongoose = require('mongoose')
app.use(express.static('public'));

// Middleware to get data from form of POST REQUEST
app.use(express.urlencoded( {extended : true}));

mongoose.connect('mongodb://localhost:27017/Akil')
.then( (result) => {
    console.log("Connected")
    app.listen(3001)
})
.catch( (error) =>{
    console.log(error)
})



app.set('view engine','ejs');


app.use(express.urlencoded( {extended : true}));

app.get('/blogs/create' , (req,res) => {
    res.render('create.ejs',{ title : 'BLOGS'});
})

app.get('/', (req,res) => {
    res.redirect('/blogs');
})

app.get('/blogs', (req,res) => {
    iii.find().sort({ createdAt : -1 })
    .then( (result) => {
        res.render('index',{title:'MY Blogs',blogs:result})
    })
    .catch( (error) => {
        console.log(error);
    })
})



app.post('/blogs' , (req,res) => {
    console.log(req.body);

    const blog = new iii( req.body );

    blog.save()
    .then( (result) => {
        res.redirect('/blogs')
    })
    .catch( (error) =>{
        console.log(error);
    })

})

app.get('/blogs/:id' , (req,res) => {
    const id=req.params.id;
    iii.findById(id)
    .then( (result) => {
        res.render('details' , { title : 'Blog' , blog : result})
    })
    .catch( (error) =>{
        console.log(error);
    })
})

app.delete('/blogs/:id' , (req,res) => {
    const id=req.params.id;

    iii.findByIdAndDelete(id)
    .then( (result) =>{
        res.json( {redirect:'/blogs'} )
    })
    .catch( (error) => {
        console.log(error);
    })
})

app.use((req,res,next) => {
    console.log('In the next middleware');
    next();
})

app.get('/about', (req,res) => {
    // res.send('<p>About Page</p>')
    res.render('about',{ title : 'ABOUT' });
})

app.get('/me-about',(req,res) => {
    res.redirect('/about');
})



app.use( (req,res) => {
    res.status(400).render('404',{ title : 404 });
})