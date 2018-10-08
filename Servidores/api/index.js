var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get("/login",function(req,res){
    
    res.send("ok");
});

app.get("/loginUsuario",function(req,res){
    console.log(req.query);
    if(req.query.usr!=undefined && req.query.pass!=undefined){
        if(req.query.usr==="usuario"&&req.query.pass==="1234")
            res.send("true");    
        else
            res.send("false");
        return;
    }
    res.send("Debe ingresar Usuario y Contraseña");
    
});

app.post("/loginUsuario",function(req,res){
    setTimeout(function(){
        console.log(req.body)
        if(req.body.usr!=undefined && req.body.pass!=undefined){
            if(req.body.usr==="usuario"&&req.body.pass==="1234")
                res.send("true");    
            else
                res.send("false");
            return;
        }
        res.send("Debe ingresar Usuario y Contraseña");
    },5000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});