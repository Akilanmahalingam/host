const http = require('http');
const fs= require('fs');
const _=require('lodash');
const server = http.createServer( (req,res) => {
    // console.log(req.url,req.method);

    //set header content type

    //lodash random
    const num=_.random(0,20);
    console.log(num);

    //lodash once

    const lodash_demo = _.once( () => {
        console.log("Lodash/once");
    })

    lodash_demo();
    lodash_demo();


    res.setHeader('Content-Type' , 'text/html');

    let path='./page/';

    switch(req.url){
        case '/':
            path+='indexx.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','about');
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode=404;
            break;

    }

    //Send an html file
    fs.readFile( path , (err,data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    })

    
});
server.listen(3000,'localhost' , () =>{
    console.log('listening to requests on port number 3000');
});
