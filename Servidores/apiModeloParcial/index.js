var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var noticias =
    [{
        "id": 1,
        "tema": "Deporte",
        "titulo": "El DT de la Academia salió con los tapones de punta contra el entrenador del equipo nacional.",
        "noticia": "Eduardo Coudet le apuntó a Lionel Scaloni y su interinato en la Selección argentina: Se posiciona a un entrenador que no ha sido entrenador",
        "fecha": "12/05/2018 17:26"
    },
    {
        "id": 2,
        "tema": "Deporte",
        "titulo": "Brighton and Hove 1 - West Ham United 0, Premier League 2018 Fecha 8",
        "noticia": "Brighton and Hove derrotó 1 a 0 a West Ham United y se quedó con tres puntos claves.",
        "fecha": "05/10/2018 17:30:02"
    }];
var id =2;
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
app.get("/noticias",function(req,res){
   
 res.send(noticias);    

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

app.post("/nuevaNoticia",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.email!= undefined&&req.body.email!= "") &&(req.body.tema!= undefined&&req.body.tema!= "") 
			&&  (req.body.titulo!= undefined&&req.body.titulo!= "") && (req.body.noticia!= undefined&&req.body.noticia!= "")){
	
			id = id +1;
        var date ="12/12/12 12:35";//=new Date();
			
			var data = {"id":id,"tema":req.body.tema,"titulo":req.body.titulo,"noticia":req.body.noticia,"fecha":date};
				noticias.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editarNoticia",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.email!= undefined&&req.body.email!= "") &&(req.body.tema!= undefined&&req.body.tema!= "") 
			&&  (req.body.titulo!= undefined&&req.body.titulo!= "") && (req.body.noticia!= undefined&&req.body.noticia!= "")){
	
			
        
				for(var i =0;i<noticias.length;i++){
					if(req.body.id== noticias[i].id){
						noticias[i].tema=req.body.tema;
						noticias[i].noticia=req.body.noticia;
						noticias[i].titulo=req.body.titulo;
							var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});
app.post("/eliminarNoticia",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if(req.body.id!= undefined&&req.body.id!= ""){
	
			for(var i =0;i<noticias.length;i++){
					if(req.body.id== noticias[i].id){
						noticias.splice(i,1);
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