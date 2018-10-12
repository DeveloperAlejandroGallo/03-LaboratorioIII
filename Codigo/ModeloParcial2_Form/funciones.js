//variables globales
var noticiasList=[];
var opcionABML;
var paramsStr;
var idActual;
var temasList = ["Deporte","Actualidad","Economia","Espectaculo","Politica"];
//Obtener un objeto de la pag.
function $(id)
{
    return document.getElementById(id);
}

function cargarWindow()
{
    var btnAgregar = $("btnAgregar");
    btnAgregar.addEventListener("click",abrirCargar); //variable de tipo funcion abrir
    var btnCerrar = $("btnCerrarData");
    btnCerrar.addEventListener("click",cerrar);
    // var btnEditar = $("btnEditarData");
    // btnEditar.addEventListener("click",editar);
}

function operarConRespuestaSrv(data)
{
    // alert("data.type: "+data.type+ "- opcionABML: "+opcionABML);
    if(data.type != "error")
    {
        switch (opcionABML)
        {
            case "alta":
                altaConRespuestaPost(data);
                break;
            case "editar":
                editarConRespuestaPost();
                break;
            case "eliminar":
                eliminarConRespuestaPost();
                break;
            default:
                break;
        }
    }
    else
        alert("ERROR!");
}



function obtenerNoticiasGet(datos)
{
    noticiasList = JSON.parse(datos); //string pasado a json - es un array de json

    listar();
}


function listar()
{
    noticiasDiv = $("noticias");
    noticiasDiv.innerHTML = "";

    //alert("Lista contiene " + noticiasList.length + " registros.");

    for(var i=0; i<noticiasList.length;i++)
    {
        news = armarNoticia(noticiasList[i].id,noticiasList[i].tema,noticiasList[i].titulo,noticiasList[i].noticia,noticiasList[i].fecha)
        noticiasDiv.innerHTML += news;
    }
}



function armarDropDown(div,nameId, list)
{
    var select ="";
    select += 
    '<select name="'+nameId+'" id="'+nameId+'">'+
    '<option value="'+list[0]+'" selected="selected">'+list[0]+'</option>';
    for(var i=1; i<list.length;i++)
    {
        select += '<option value="'+list[i]+'">'+list[i]+'</option>';
    }
    select += '</select>'
    console.log(select);
    $(div).innerHTML = select;
}




function altaConRespuestaPost(noticia)
{
    noticiasDiv = $("noticias");
    
    noticiasList.push(noticia);

    listar();

}

function armarNoticia(id,tema,titulo, noticia, fecha)
{
    var lineaNoticia =  
        '<div id="noticia_'+id+'" class="noticia">'+
        '<button id="btnEliminar_'+id+'" class="btnChico btnCerrar" onclick="eliminarClick();">X</button>'+
        '<button id="btnEditar_'+id+'" class="btnChico btnEditar" onclick="editarClick();">E</button>';

    lineaNoticia += 
        '<h2>'+titulo+'</h2>' +
        '<p id="pTema_'+id+'" class="tema">'+tema+'</p>'+
        '<p id="pDetalle_'+id+'" class="detalle">'+noticia+'</p>'+
        '<p id="pFecha_'+id+'" class="fecha">'+fecha+'</p></div>';

    return lineaNoticia;
    // 
}


function eliminarClick()
{
    if(confirm("¿Desea eliminar la noticia?"))
    {
        opcionABML = "eliminar";
        idActual = (event.target.id).split("_")[1];
        paramsStr = {"id":idActual}; //formato json

        ejecutarPost("eliminarNoticia",functionCallBackPost,JSON.stringify(paramsStr));
    }
}

function eliminarConRespuestaPost()
{

    for(i=0; i < noticiasList.length; i++)
    {

        if(noticiasList[i].id == idActual)
        {
            noticiasList.splice(i,1);

            break;
        }
    }
    listar();
}

function editarClick()
{
    
    idActual = (event.target.id).split("_")[1];

    pos = getIndiceId(idActual,noticiasList);
    abrirCargar("E");

    $("txtTitulo").value = noticiasList[pos].titulo;
    $("txtDescripcion").value = noticiasList[pos].noticia;
    $("selTemas").value = noticiasList[pos].tema;
    

}

function editarConRespuestaPost()
{

    for(var i=0; i < noticiasList.length; i++)
    {
        console.log("noticiasList[i].id: "+ noticiasList[i].id +"- idActual: "+idActual);

        if(noticiasList[i].id == idActual)
        {
            noticiasList[i].tema =    $("selTemas").value;
            noticiasList[i].titulo =  $("txtTitulo").value;
            noticiasList[i].noticia = $("txtDescripcion").value;

            listar();
            break;
        }
    }
}

function modificarClick()
{
    opcionABML = "editar";

    //alert("guardar");
    var titulo  = $("txtTitulo").value;
    var tema    = $("selTemas").value;
    var noticia = $("txtDescripcion").value;
    paramsStr = {"id":idActual,"email":"algo@gmail.com","tema":tema,"titulo":titulo,"noticia":noticia}; //formato json
    //alert(JSON.stringify(paramsStr));
    ejecutarPost("editarNoticia",functionCallBackPost,JSON.stringify(paramsStr));
    
    btnAgregar.hidden = false;
    boxData.hidden = true; 
}

function getIndiceId(id,lista)
{
    for(var i=0; i<lista.length;i++)
    {
       if(lista[i].id == id){
           return i;
       }
    }

    return -1;
}

function abrirCargar(tipo)
{
    var btnGuardar = $("btnGuardarData");
    var encabezado = $("encabezadoData");
    armarDropDown("ddlTemas","selTemas",temasList);
    if(tipo == "E")//Edit
    {
        btnGuardar.removeEventListener("click",guardarClick);
        btnGuardar.addEventListener("click",modificarClick);
        btnGuardar.innerHTML = "Modificar";
        encabezado.innerHTML = "Modificar Noticia";
    }
    else //C - create
    {
        btnGuardar.removeEventListener("click",modificarClick);
        btnGuardar.addEventListener("click",guardarClick);
        btnGuardar.innerHTML = "Guardar";
        $("txtTitulo").value = "";
        $("txtDescripcion").value="";
        encabezado.innerHTML = "Nueva Noticia";
    }

    var btnAgregar = $("btnAgregar");
    var boxData = $("boxData");



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

function guardarClick()
{
    opcionABML = "alta";

    //alert("guardar");
    var titulo  = $("txtTitulo").value;
    var tema    = $("selTemas").value;
    var noticia = $("txtDescripcion").value;
    paramsStr = {"email":"algo@gmail.com","tema":tema,"titulo":titulo,"noticia":noticia}; //formato json
    //alert(JSON.stringify(paramsStr));
    ejecutarPost("nuevaNoticia",functionCallBackPost,JSON.stringify(paramsStr));
    
    btnAgregar.hidden = false;
    boxData.hidden = true;

}



function addLoadingClass() 
{
  const container = document.getElementsByClassName("principal")[0];
  
  if(container.classList.contains("loading")) 
    container.classList.remove("loading");
  else 
    container.classList.add("loading");
  
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