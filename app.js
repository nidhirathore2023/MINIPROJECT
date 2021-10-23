const mysql=require('mysql');
const express=require('express');
const exp = require('constants');
const bodyparser=require('body-parser');
const encoder=bodyparser.urlencoded();
const app=express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
const connection=mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"nidhi",
    database:"loginpage"
});

//connect to database
connection.connect(function(error){
    if(error) throw error
    else console.log("connected");
})
app.get('/',function(req,res){
    res.render('1page');
})
app.post('/',encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;
        connection.query('SELECT * FROM login WHERE user_name= ? and user_pass = ?',[username,password],function(error,results,field){
            if(results.length>0){
                res.redirect('/2page');
            }
            else
            {
                res.redirect('/');
            }
            res.end();
        })
 app.get('/2page',encoder,function(req,res){
     res.render('2page');
 })
 app.get('/3page',encoder,function(req,res){
    res.render('3page');
})
app.get('/4page',encoder,function(req,res){
    res.render('4page');
})
app.get('/5page',encoder,function(req,res){
    res.render('5page');
})
app.get('/logout',encoder,function(req,res){
    res.render('logout');
})
app.get('/',encoder,function(req,res){
    res.render('1page');
})
});





//create server
app.listen(3000,()=>console.log("running"));