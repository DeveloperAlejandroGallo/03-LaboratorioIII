var xhr;
var datos = new Array();

function cargarDatos(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = JSON.parse(this.response); 
           console.log(resp.message);
           
           datos = resp.data;
          cargarArticulos(datos);
        }
        
    };
    xhr.open("POST","http://localhost:3000/traer",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"collection":"posts"}));


}


window.onload = function(){
    
  cargarDatos();

     //console.log(datos);
 
    
}



function cargarArticulos(data){

var articulo;
var titulos;

for( var i=0 ;i<data.length; i++){
    articulo = document.createElement("div");
    
    titulos +="<br><br><br>";
    titulos += "<h3>"+data[i].titulo+"</h3><br>";
    titulos += "<img class='foto' src='img/imagen_2.jpg'><br>";
    titulos += "<p>"+data[i].articulo+"</p><BR CLEAR=LEFT>";
    titulos +="<br>";
    titulos += "<input type='botton' class='boton1' value='MAS'>";

    /*articulo.innerHTML= titulos;
    document.getElementById("articulos").appendChild(articulo);*/
  
}
articulo.innerHTML= titulos;
document.getElementById("articulos").appendChild(articulo);


}