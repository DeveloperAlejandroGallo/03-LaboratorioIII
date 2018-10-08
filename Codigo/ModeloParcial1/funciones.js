//variables globales
var noticiasList=[];
var opcionABML;

//Obtener un objeto de la pag.
function $(id)
{
    return document.getElementById(id);
}

function cargarWindow()
{
    var btnAgregar = $("btnAgregar");
    btnAgregar.addEventListener("click",abrir); //variable de tipo funcion abrir
    var btnCerrar = $("btnCerrarData");
    btnCerrar.addEventListener("click",cerrar);
    var btnGuardar = $("btnGuardarData");
    btnGuardar.addEventListener("click",guardar);
    // var btnEditar = $("btnEditarData");
    // btnEditar.addEventListener("click",editar);
}

function altaConGet(datos)
{
    noticiasDiv = $("noticias");

    var noticias = JSON.parse(datos); //string pasado a json - es un array de json
    for(var i=0; i<noticias.length;i++)
    {
        news = altaNoticia(noticias[i].id,noticias[i].tema,noticias[i].titulo,noticias[i].noticia,noticias[i].fecha,)
        noticiasDiv.innerHTML += news;
        $("btnEliminar_"+noticias[i].id).addEventListener("click",eliminar);
        $("btnEditar_"+noticias[i].id).addEventListener("click",editar);
    }
    
}


function operarConRespuestaPost(objeto)
{
    var noticiasDiv = $("noticias");
    //alert("Operar con Respuesta Post " + objeto.id);
    news = altaNoticia(objeto.id,objeto.tema,objeto.titulo,objeto.noticia,objeto.fecha);
    noticiasDiv.innerHTML += news;
    $("btnEliminar_"+objeto.id).addEventListener("click",eliminar(event));
    $("btnEditar_"+objeto.id).addEventListener("click",editar);
    
}

function altaNoticia(id,tema,titulo, noticia, fecha)
{
    var lineaNoticia =  
        '<div id=noticia_'+id+' class="noticia">'+
        '<button id="btnEliminar_'+id+'" class="btn btnCerrar">X</button>'+
        '<button id="btnEditar_'+id+'" class="btn btnEditar">E</button>';

    lineaNoticia += '<h2>'+titulo+'</h2><p>'+noticia+'</p></div>';

    return lineaNoticia;
}


function eliminar(event)
{
    console.log("El Id es: " + event.target.getAttribute("id"));

   // alert("eliminar");
}


function abrir()
{
    var btnAgregar = $("btnAgregar");
    var boxData = $("boxData");

    $("txtTitulo").value = "";
    $("txtTema").value ="";
    $("txtDescripcion").value="";

    btnAgregar.hidden = true;
    boxData.hidden = false;
}

function cerrar()
{
    var btnAgregar = $("btnAgregar");
    var boxData = $("boxData");

    btnAgregar.hidden = false;
    boxData.hidden = true;
}

function guardar()
{
    addLoadingClass();
    //alert("guardar");
    var accion  = "nuevaNoticia";
    var titulo  = $("txtTitulo").value;
    var tema    = $("txtTema").value;
    var noticia = $("txtDescripcion").value;
    paramsStr = {"email":"algo@gmail.com","tema":tema,"titulo":titulo,"noticia":noticia}; //formato json
    //alert(JSON.stringify(paramsStr));
    ejecutarPost(accion,functionCallBackPost,JSON.stringify(paramsStr));
    
    btnAgregar.hidden = false;
    boxData.hidden = true;

    addLoadingClass();

}


function editar(event)
{
    
    var accion = "editarNoticia";
   // var id = $()
    var titulo = $("txtTitulo").value;
    var tema = $("txtTema").value;
    var noticia = $("txtDescripcion").value;
    paramsStr = {"id":id,"email":"algo@gmail.com","tema":tema,"titulo":titulo,"noticia":noticia}; //formato json
    //alert(JSON.stringify(paramsStr));
    ejecutarPost(accion,functionCallBackPost,JSON.stringify(paramsStr));
    
}



function addLoadingClass() 
{
  const container = document.getElementsByClassName("principal")[0];

  if(container.classList.contains("loading")) 
    container.classList.remove("loading");
  else 
    container.classList.add("loading");
  
}


function objToDiv(objecto)
{

}


function av(e)
{
    console.log(e.target);
}

/*obtener por get una lista de elementos por get y recibir un json.
 ABM

 el AGREGAR sobre los divs 
 Titulo para escribir
 tema para seleccionar de un desplegable
 texto de la noticias

 ----

 Al servidor para agregar la noticia le tiene que llegoa el json con el formato
 loclahost:3000/nuevaNoticia
 email:
 tema:
 titulo:
 noticia

-----
bajar un load y hacer un div con opacidad de 0,5 y lo mostramos y ocultamos.
----
Eliminar:
Utilizar un confirm
Mandarle al servidor: un json con el id. {"id":1}
Devuelve: {"type":"ok"}

Nos devuelve todo el elemento
event.target.getAtribute(id);

al guardar removerle los listeners
objeto.removeListeners

 */ 