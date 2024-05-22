var express = require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');

var con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"demo",
});

con.connect();

var app =express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine","ejs");

app.get('/',function(req,res){
    var query="select * from user";

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.render('index',{result});
    })
   
});
app.post('/',function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    var address=req.body.address;
    var city=req.body.city;
    var mobile=req.body.mobile;
    var hobby=req.body.hobby;

    var query="insert into user(name,email,password,address,city,mobile,hobby)values('"+name+"','"+email+"','"+password+"','"+address+"','"+city+"','"+mobile+"','"+hobby+"')";

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })
});
app.get('/delete/:id',function(req,res){
    var id=req.params.id;

    var query="delete from user where id="+id;
    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect('/');
    })
})
app.get('/update/:id',function(req,res){
    var id=req.params.id;

    var query="select * from user where id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.render('update',{result});
    })
});
app.post('/update/:id',function(req,res){
    var id=req.params.id;
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    var address=req.body.address;
    var city=req.body.city;
    var mobile=req.body.mobile;
    var hobby=req.body.hobby;

    

    var query="update user set name='"+name+"',email='"+email+"',password='"+password+"',address='"+address+"',city='"+city+"',mobile='"+mobile+"',hobby='"+hobby+"' where id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })    
})

app.listen(2000);
