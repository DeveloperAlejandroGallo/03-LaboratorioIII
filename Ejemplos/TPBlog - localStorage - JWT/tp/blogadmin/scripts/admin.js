var xhr;
var datos = new Array();
var postAModificar;



window.onload = function(){
  
    this.document.getElementById("btnBoton").addEventListener("click", function(){
        
        var data=obtenerDatos();

        if(postAModificar){
            
            enviarModificacion(data);
        }
        else{
            enviarDatos(data);
        }        
          
        cargarDatos() ;
       
     
     });
     cargarDatos() ;

}


    




function obtenerDatos(){
    var data = new Array();

    var titulo = document.getElementById("titulo") ;
    var articulo = document.getElementById("articulo");
    var mas = document.getElementById("mas");
    
    var data;
    if(postAModificar ){
        data = {
            "titulo": titulo.value,
            "articulo": articulo.value,
            "mas": mas.value,
            "collection": "posts",
            "id" : postAModificar.id,
            "active" : postAModificar.active,
            "created_dttm" : postAModificar.created_dttm
        }
    }
    else{
        
            data = {
                "titulo": titulo.value,
                "articulo": articulo.value,
                "mas": mas.value,
                "collection": "posts"
                } 
             

    }
   
    return data;

}


function cargarDatos(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = JSON.parse(this.response); 
           console.log(resp.message);
           refrescarTabla(resp.data);
           datos = resp.data;
           console.log(datos);
           limpiarFormulario();
        }
        
    };
    xhr.open("POST","http://localhost:3000/traer",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"collection":"posts"}));


}


function enviarDatos(data) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
        var resp = JSON.parse(this.response);
        console.log(resp.message);
        
        }  
    };    
    xhr.open("POST","http://localhost:3000/agregar",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    
   
}


function modificar(id){

    for(var i in datos){
    if( datos[i].id === id ){
        postAModificar =  datos[i];
        document.getElementById("titulo").value = postAModificar.titulo;
        document.getElementById("articulo").value = postAModificar.articulo;
        document.getElementById("mas").value = postAModificar.mas;       

    }
    }  

}

function enviarModificacion(data){

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
        var resp = this.response;
        console.log(resp);
        limpiarFormulario();   
        
        }  
    };    
    xhr.open("POST","http://localhost:3000/modificar",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

}


function refrescarTabla(datos){

    var tabla = this.document.getElementById("tblPosts") ;
    var nuevas = "";

    for(var i in datos){

        nuevas +="<br><tr>";
        nuevas +="<td>"+ datos[i].id +"<td>";
        nuevas += "<td>"+ datos[i].created_dttm+"<td>";
        nuevas +="<td>"+ datos[i].titulo +"<td>";
        nuevas +="<td>"+ datos[i].articulo +"<td>";
        nuevas +="<td><input type='button' class='boton1' value = 'modificar' onclick='modificar("+datos[i].id+")'><td>";
        nuevas +="<td><input type='button' class='boton1' value='borrar' onclick='borrar("+datos[i].id+")'  ><td>";
        nuevas +="</tr>";

          
    }
   
    tabla.children[2].innerHTML = nuevas;

}

function borrar(id){

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
        var resp = JSON.parse(this.response);
        console.log(resp.message);
        cargarDatos() ;
        }  
    };    
    xhr.open("POST","http://localhost:3000/eliminar",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"collection":"posts","id" : id}));

}

function limpiarFormulario(){

    document.getElementById("titulo").value = "";
    document.getElementById("articulo").value = "";
    document.getElementById("mas").value = "";    

}