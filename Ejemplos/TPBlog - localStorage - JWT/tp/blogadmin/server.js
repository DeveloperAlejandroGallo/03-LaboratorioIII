var port = 3000;
var express=require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app=express();
var path = require('path');


app.use(cors());
app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/agregar', function (req, res) {

var collection = req.body.collection;
var nuevoObjeto = req.body;
//nuevoObjeto.id = getID
    
    
    require('fs').readFile(__dirname + getPathFromCollection(collection), 'utf8', function (err, data) {
        if (err) {
           throw err; // error handling
        }else{
            array = JSON.parse(data);
            nuevoObjeto.id = getID(array);
            nuevoObjeto.active = true;
            nuevoObjeto.created_dttm = new Date().toLocaleString();
            array.push(nuevoObjeto);
           require('fs').writeFileSync(__dirname + getPathFromCollection(collection), JSON.stringify(array));
           //build response
           var response = {
               message: "Alta exitosa",
               data: array
           }
           setTimeout(function(){res.send(response);    },5000);
        }
           
    });  
    
});

function getID(array){
    if(array.length == 0){
        return 1;
    }
    else if(array.length == 1){
        return 2;
    }
    else{
        var maxIndex = array.reduce(function(prev,curr,index){
            if(prev.id>curr.id)
            return prev.id;
            else
            return curr.id;
        });
        return maxIndex+1;
    }

        

    
}
function getPathFromCollection(collection){
    if(collection==="Personas"){
        return '/data/people.json';
    }
    if(collection==="posts"){
        return '/data/posts.json';
    }
}
function remove(a){
    a.active = false;
}

app.post('/eliminar', function (req, res) {

    var indice = req.body.id;
    var array;
    require('fs').readFile(__dirname + getPathFromCollection(req.body.collection), 'utf8', function (err, data) {
        if (err) {
            // error handling
        }
           array = JSON.parse(data);
           var objectToDelete = array.filter(function(a){
             return a.id == indice;
           });
          remove(objectToDelete[0]);
          require('fs').writeFileSync(__dirname + getPathFromCollection(req.body.collection), JSON.stringify(array));
          res.send({"message":"Baja exitosa"}); 
    });  

});


app.post('/modificar', function (req, res) {
    var object = req.body;
    var array = new Array();
    require('fs').readFile(__dirname + getPathFromCollection(req.body.collection), 'utf8', function (err, data) {
        if (err) {
            // error handling
        }
           array = JSON.parse(data);
           //obtengo index del id que necesito
           var index = array.findIndex(function(obj){return obj.id === object.id;})
           array[index] = object;

          require('fs').writeFileSync(__dirname + getPathFromCollection(req.body.collection), JSON.stringify(array));
          res.send('Modificacion exitosa'); 
    });  
    

       
});


app.get('/traerpersona', function (req, res) {

    var indice = req.query.indice;    
    
    res.send(JSON.stringify(Personas[indice]));    
});

app.post('/traer', function (req, res) {

    require('fs').readFile(__dirname + getPathFromCollection(req.body.collection), 'utf8', function (err, data) {
        if (err) {
            // error handling
        }
           var array = JSON.parse(data);
           array = array.filter(function(a){
             return a.active == true;
           });
           res.send({"message": "Carga exitosa","data":array});
    });  
});


//////////////BLOG
/*app.post('/guardar', function (req, res) {

    setTimeout(function(){res.send('Llega OK :' + req.body);    },5000);
        
});*/



;
var server=app.listen(port ,function(){
    console.log('Servidor web iniciado. Escuchando en el puerto ' + port);
});