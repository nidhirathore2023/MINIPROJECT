const mysql=require('mysql');
const express=require('express');
const ejs = require('ejs');
const bodyparser=require('body-parser');


const encoder=bodyparser.urlencoded();
const app=express();

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));


 //connect to database
const connection=mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"nidhi",
    database:"loginpage"
});


connection.connect(function(error){
    if(error) throw error
    else console.log("connected");
})
app.get('/',function(req,res){
    res.render('1page');
})


var s_current_user;
var s_current_id;
var a_current_user;
var a_current_id;

       //login page for student 

    app.post('/',encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;
        connection.query('SELECT * FROM login WHERE user_name= ? and user_pass = ?',[username,password],function(error,results,field){
            if(results.length>0){
                res.redirect('/2page');
                s_current_id=results[0].student_id;
                s_current_user=username;
                
            }
            else
            {
                res.redirect('/');
            }
            res.end();
        })
    });
        // Dashboard for student

    app.get('/2page',encoder,function(req,res){
    res.render('2page',{
        s_id:current_id,
        s_name:current_user
     });
     });

     //  Project page for student
    app.get('/3page',encoder,function(req,res){
    let sql="SELECT * FROM project where user_name =?";
    let query=connection.query(sql,[current_user],(error,rows)=>{
        if(error) throw error;
        res.render('3page',{
         data:rows,
         id:s_current_id,
        name:s_current_user
        });
        
     })
   })

    // End_semester result (student)
     app.get('/4page',encoder,function(req,res){
     let sql="select * from end_sem where user_name= ?";
     let query=connection.query(sql,[current_user],(error,rows)=>{
        if(error) throw error;
        res.render('4page',{
         data:rows,
         id:s_current_id,
        name:s_current_user
        });
        
    })
    })

    //Placement Details
    app.get('/5page',encoder,function(req,res){
    let sql="select * from placements where user_name= ?";
    let query=connection.query(sql,[current_user],(error,rows)=>{
        if(error) throw error;
        res.render('5page',{
         data:rows,
         id:s_current_id,
        name:s_current_user
        });
        
     })
   })
     //logout page
    app.get('/logout',encoder,function(req,res){
    res.render('logout');
    })
  
    //admin login
   app.get('/admin1',function(req,res){
    res.render('admin1');
   })


   app.post('/admin1',encoder,function(req,res){
    var username=req.body.username;
    var password=req.body.password;
        connection.query('SELECT * FROM login_admin WHERE user_name= ? and user_pass = ?',[username,password],function(error,results,field){
            if(results.length>0){
                res.redirect('/admin2');
                a_current_id=results[0].id;
                a_current_user=username;
            }
            else
            {
                res.redirect('/admin1');
            }
            res.end();
        })
    });
    // admin dashboard
    app.get('/admin2',function(req,res){
        res.render('admin2',{
            id:a_current_id,
            name:a_current_user
         });
       })
          // student list page
       app.get('/admin3',function(req,res){
        let sql="select * from login ";
        let query=connection.query(sql,(error,rows)=>{
        if(error) throw error;
        res.render('admin3',{
         data:rows,
         id:a_current_id,
        name:a_current_user
        });  
     })
     })
     // edit end_semester marks
     app.get('/edit/:name',function(req,res){
         var s_name=req.params.name;
         let sql="select * from end_sem where user_name =? ";
         let query=connection.query(sql,[s_name],(error,rows)=>{
         if(error) throw error;
         res.render('edit',{
          data:rows,
         name:s_name
         });  
         //console.log(s_name)
      })
       })
       var cur;
       //update end_sem marks subject-wise
       app.get('/update/:subject',function(req,res){
        var s_name=req.params.subject;
        cur=s_name;
        let sql="select * from end_sem where subject = ? ";
        let query=connection.query(sql,[s_name],(error,rows)=>{
        if(error) throw error;
        res.render('update',{
        data:rows[0],
        name:s_name
        });  

        app.post('/update',(req,res)=>{
            console.log(req.body.mid);
            let sql="UPDATE end_sem SET mid ='"+req.params.mid+"',end_marks='"+req.params.end+"',sessional ='"+req.params.sessional+"' total= '"+req.params.total+"', grade = '"+req.params.grade+"' WHERE subject = ?";
            let query=connection.query(sql,[cur],(err,result)=>{
                if(err) throw err;
                res.render('edit');
               
            })
        })
        
     })
       
      })



//start server
app.listen(3000,()=>console.log("running"));