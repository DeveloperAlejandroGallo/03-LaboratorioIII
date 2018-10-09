var xhr;
var datos = new Array();
var postAModificar;

window.onload = function(){
    this.document.getElementById("btnGuardar").addEventListener("click",function(){

        guardar();
    });
    $("#btnLogIn").click(function(){
        login();
    })
    cargarDatos();

};

function guardar(){
            //es un usuario autenticado?
        //miro sessionStorage
    if(sessionStorage){
        var token = sessionStorage.token;
        if(token){
            //recupero los valores del dom
            var titulo = document.getElementById("txtTitulo");
            var articulo = document.getElementById("txtArticulo");
            var mas = document.getElementById("txtMas");
            //var foto = document.getElementById("txtFoto");
            var data;
            //es modificacion o alta?
            if(postAModificar){
                data = {
                    "titulo": titulo.value,
                    "articulo": articulo.value,
                    "mas": mas.value,
                    "collection": "posts",
                    "id": postAModificar.id,
                    "active" : postAModificar.active,
                    "created_dttm" : postAModificar.created_dttm
                }
                enviarModificacion(data);
            }
            else{
                //es nuevo. no tiene ID
                data = {
                    "titulo": titulo.value,
                    "articulo": articulo.value,
                    "mas": mas.value,
                    "collection": "posts"
                }
                enviarAlta(data);
            }   
        }
        else{
            $("#divLogin").modal();
        }
    }
}

function login(){
    data = {
        "usuario": $("#txtUsuario").val(),
        "password": $("#txtPassword").val()
    };
    $.ajax({
        url: "http://localhost:3000/login", 
        method:'POST',
        data:data,
        success: function(result){
            //si pudo logearse, existe token
            //tiene rol de admin?
            if(result.user.role ==="admin"){
                console.log(result.message);
                sessionStorage.token = result.token;
                $("#divLogin").modal('toggle');
                guardar();
            }
            else{
                alert("No tiene permisos suficientes");
            }
            
        },
        error: function(jqXHR,textStatus,errorThrown ){
            console.log(errorThrown);
        },
        complete:function(jqXHR, textStatus){
            console.log(textStatus);
        }
    });
}
function enviarModificacion(data){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = this.response; 
           console.log(resp);
           cargarDatos();
           limpiarFormulario();
           postAModificar = null;
        }
    };
    xhr.open("POST","http://localhost:3000/modificar",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function limpiarFormulario(){
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtArticulo").value = "";
    document.getElementById("txtMas").value = "";
}
function enviarAlta(data){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = JSON.parse(this.response); 
           console.log(resp.message);
           cargarDatos();
           limpiarFormulario();
           postAModificar = null;
        }
    };
    xhr.open("POST","http://localhost:3000/agregar",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", sessionStorage.token);
    xhr.send(JSON.stringify(data));
}

function cargarDatos(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = JSON.parse(this.response); 
           console.log(resp.message);
           refrescarTabla(resp.data);
           datos = resp.data;
        }
    };
    var url = "http://localhost:3000/traer?collection=posts";
    xhr.open("GET",url,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    
}

function refrescarTabla(data){
    var tabla = this.document.getElementById("tblPosts");
    var nuevasFilas="";
    //punto de parcial: mejorar carga
    for(var i in data){
        nuevasFilas += "<tr>";
        nuevasFilas += "<td>" + data[i].id + "</td>";
        nuevasFilas += "<td>" + data[i].created_dttm + "</td>";
        nuevasFilas += "<td>" + data[i].titulo + "</td>";
        nuevasFilas += "<td>" + data[i].articulo + "</td>";
        nuevasFilas += "<td><input type='button' class ='btn btn-warning' value='Modificar' onclick='modificar(" + data[i].id + ");'></td>";
        nuevasFilas += "<td><input type='button' class ='btn btn-danger' value='Borrar' onclick='borrar(" + data[i].id + ");'></td>";
        nuevasFilas += "</tr>";
    }
    tabla.children[2].innerHTML = nuevasFilas;
}

function borrar(id){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
           var resp = JSON.parse(this.response); 
           console.log(resp.message);
           cargarDatos();
        }
    };
    xhr.open("POST","http://localhost:3000/eliminar",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"collection":"posts","id": id}));
    
}


function modificar(id){
    //obtengo el post que hay que modificar
    postAModificar = datos.find(x => x.id === id);
    document.getElementById("txtTitulo").value = postAModificar.titulo;
    document.getElementById("txtArticulo").value = postAModificar.articulo;
    document.getElementById("txtMas").value = postAModificar.mas;
     
    
}