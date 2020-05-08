
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views","./views");

app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended: true}));

let result = [
    { id: 0, name:"Andy", email:"andy@gmail.com", course:"Math", password:"1"}, // student
    { id: 1, name:"Blue Jack", email:"andy@gmail.com", course:"Physic", password:"1"},
    { id: 2, name:"Melody", email:"melody@gmail.com", course:"Linear Algebra", password:"1"},
    { id: 3, name:"Katani Long", email:"katani@gmail.com", course:"Cloud Computing", password:"1"},
]

// var http = require('http').createServer(express);
// var io = require('socket.io')(http);

// io.on("connection", function () {
//     console.log("Helloo")
// })

app.get('/', function (req, res) { 
    res.render('home'); 
}); 

app.get('/home', function (req, res) { 
    res.render('home'); 
}); 

app.get('/about', function (req, res) { 
    res.render('about'); 
});   
  
app.post('/update', function (req, res) {  
    let id = req.body.id;
    let name = req.body.username; 
    let email = req.body.email;
    let course = req.body.course;

    let stu = result.find(function(item){ return item.id == id});
    let index = result.indexOf(stu);
    result[index].name = name;
    result[index].email = email;
    result[index].course = course;
    res.redirect('/student');
});    



app.post('/create', function (req, res) { 
    let id = req.body.id;
    let name = req.body.username;
    let password = req.body.pwd;
    let email = req.body.email;
    let course = req.body.course;

    let newStudent = {
        id: id,
        name:name,
        password:password,
        email:email,
        course:course,
    }
    result.push(newStudent); 
    res.redirect('/student');
});   
  
  
app.get('/view', function (req, res) {    
    let id = req.query.id;
    let stu = result.find(function(item){ return item.id == id}); 
    res.render('view',{ 
        stu:stu
    }); 
}); 

//router
app.get('/student', function (req, res) {   
    res.render('student',{
        studentList: result
    });
}); 

app.get('/getStudent', function (req, res){ 
    let key = req.query.key;
    let filter = result.filter(function(obj){
        return obj.name.toLowerCase().includes(key.toLowerCase());
    })
    res.send({
        studentList:filter
    })
});
 

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});





