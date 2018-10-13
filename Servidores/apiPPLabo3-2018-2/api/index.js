var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var personas = [{
  "id": 1,
  "nombre": "Marguerite",
  "apellido": "Norkett",
  "fecha": "2018-03-07",
  "sexo": "Female"
}, {
  "id": 2,
  "nombre": "Renata",
  "apellido": "Bofield",
  "fecha": "1984-10-30",
  "sexo": "Female"
}, {
  "id": 3,
  "nombre": "Corbet",
  "apellido": "Paulton",
  "fecha": "1986-07-19",
  "sexo": "Male"
}, {
  "id": 4,
  "nombre": "Gillie",
  "apellido": "Hallowes",
  "fecha": "1971-11-07",
  "sexo": "Female"
}, {
  "id": 5,
  "nombre": "Haslett",
  "apellido": "Turbitt",
  "fecha": "1951-04-28",
  "sexo": "Male"
}, {
  "id": 6,
  "nombre": "Willamina",
  "apellido": "Simmers",
  "fecha": "1983-07-26",
  "sexo": "Female"
}, {
  "id": 7,
  "nombre": "Laird",
  "apellido": "Hall-Gough",
  "fecha": "1987-03-21",
  "sexo": "Male"
}, {
  "id": 8,
  "nombre": "Vasily",
  "apellido": "Eaves",
  "fecha": "2011-11-28",
  "sexo": "Male"
}, {
  "id": 9,
  "nombre": "Elbertina",
  "apellido": "Chatelain",
  "fecha": "1959-09-14",
  "sexo": "Female"
}, {
  "id": 10,
  "nombre": "Geno",
  "apellido": "Ell",
  "fecha": "1976-12-31",
  "sexo": "Male"
}, {
  "id": 11,
  "nombre": "Constancia",
  "apellido": "Tatton",
  "fecha": "1955-03-15",
  "sexo": "Female"
}, {
  "id": 12,
  "nombre": "Dorian",
  "apellido": "Hansley",
  "fecha": "1958-06-20",
  "sexo": "Female"
}, {
  "id": 13,
  "nombre": "Saidee",
  "apellido": "Phillp",
  "fecha": "2014-08-31",
  "sexo": "Female"
}, {
  "id": 14,
  "nombre": "Isaiah",
  "apellido": "Stansbie",
  "fecha": "1995-06-21",
  "sexo": "Male"
}, {
  "id": 15,
  "nombre": "Ilse",
  "apellido": "Keiling",
  "fecha": "2002-08-01",
  "sexo": "Female"
}, {
  "id": 16,
  "nombre": "Reynard",
  "apellido": "Cockshut",
  "fecha": "1954-04-24",
  "sexo": "Male"
}, {
  "id": 17,
  "nombre": "Lisa",
  "apellido": "Durker",
  "fecha": "1997-07-24",
  "sexo": "Female"
}, {
  "id": 18,
  "nombre": "Mohandis",
  "apellido": "De Laci",
  "fecha": "1974-03-30",
  "sexo": "Male"
}, {
  "id": 19,
  "nombre": "Hardy",
  "apellido": "McClaughlin",
  "fecha": "1963-09-23",
  "sexo": "Male"
}, {
  "id": 20,
  "nombre": "Raf",
  "apellido": "Petheridge",
  "fecha": "1959-04-30",
  "sexo": "Female"
}, {
  "id": 21,
  "nombre": "Howard",
  "apellido": "Piser",
  "fecha": "1964-08-22",
  "sexo": "Male"
}, {
  "id": 22,
  "nombre": "Esma",
  "apellido": "Shoubridge",
  "fecha": "1953-02-05",
  "sexo": "Female"
}, {
  "id": 23,
  "nombre": "Tad",
  "apellido": "O'Currigan",
  "fecha": "1972-08-10",
  "sexo": "Male"
}, {
  "id": 24,
  "nombre": "Pamela",
  "apellido": "Patching",
  "fecha": "1991-07-10",
  "sexo": "Female"
}, {
  "id": 25,
  "nombre": "Caleb",
  "apellido": "McPhee",
  "fecha": "1987-03-17",
  "sexo": "Male"
}];
var id =25;
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
app.get("/personas",function(req,res){
   
 res.send(personas);    

        return;
   
   
    
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
    },2000);
    
});

app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});


app.post("/nueva",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.apellido!= "") 
			&&  (req.body.fecha!= undefined&&req.body.fecha!= "") && (req.body.sexo!= undefined&&req.body.sexo!= "")){
	
			id = id +1;
       
			
			var data = {"id":id,"nombre":req.body.nombre,"apellido":req.body.apellido,"fecha":req.body.fecha,"sexo":req.body.sexo};
				personas.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.apellido!= "") 
			&&  (req.body.fecha!= undefined&&req.body.fecha!= "") && (req.body.sexo!= undefined&&req.body.sexo!= "")){
	
			
        
				for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas[i].nombre=req.body.nombre;
						personas[i].apellido=req.body.apellido;
						personas[i].fecha=req.body.fecha;
						personas[i].sexo=req.body.sexo;
							res.send(req.body);    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});
app.post("/eliminar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if(req.body.id!= undefined&&req.body.id!= ""){
	
			for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});