//variables globales
var personasList=[];
var opcionABML;
var paramsStr;
var idActual;

//Obtener un objeto de la pag.
function $(id)
{
    return document.getElementById(id);
}

function cargarWindow()
{
    var btnCerrar = $("btnCerrarData");
    btnCerrar.addEventListener("click",cerrar);
    var btnModificar = $("btnGuardarData");
    btnModificar.addEventListener("click",modificarClick);
    var btnEliminar = $("btnEliminarData");
    btnEliminar.addEventListener("click",eliminarClick);
    
}

function operarConRespuestaSrv(data)
{
    // alert("data.type: "+data.type+ "- opcionABML: "+opcionABML);
    if(data.type != "error")
    {
        switch (opcionABML)
        {
            case "editar":
                editarConRespuestaPost();
                break;
            case "eliminar":
                eliminarConRespuestaPost();
                break;
            case "personas":
                obtenerPersonasGet(data);
                break;
            default:
                break;
        }
    }
    else
        alert("ERROR!");
}



function obtenerPersonasGet(datos)
{
    personasList =datos; //string pasado a json - es un array de json
    listar();
}


function listar()
{
    var personasTbl = $("personas");
    personasTbl.innerHTML = "";

    //alert("Lista contiene " + personasList.length + " registros.");

    for(var i=0; i<personasList.length;i++)
    {
        news = armarPersona(personasList[i].id,personasList[i].nombre,personasList[i].apellido,personasList[i].fecha,personasList[i].sexo)
        personasTbl.innerHTML += news;
        // $("btnEliminar_"+personasList[i].id).addEventListener("click",eliminarClick);
        // $("btnEditar_"+personasList[i].id).addEventListener("click",editarClick);
    }
}

function armarPersona(id,nombre,apellido, fecha, sexo)
{
    var lineaPersona =  
        '<tr id="col_'+id+'" ondblclick="editarClick();">'+
            '<td>'+nombre+'</td>'+
            '<td>'+apellido+'</td>'+
            '<td>'+fecha+'</td>'+
            '<td>'+sexo+'</td>'+
        '<tr>';
    return lineaPersona;
    
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


function eliminarClick()
{
    if(confirm("¿Desea eliminar la persona?"))
    {
        opcionABML = "eliminar";
        //idActual = (event.target.id).split("_")[1];
        paramsStr = {"id":idActual}; //formato json
        cerrar();
        llamarServidor("POST",opcionABML,functionCallBack,JSON.stringify(paramsStr));
    }
}

function eliminarConRespuestaPost()
{

    for(i=0; i < personasList.length; i++)
    {

        if(personasList[i].id == idActual)
        {
            personasList.splice(i,1);

            break;
        }
    }
    listar();
}

function editarClick()
{
    console.log(event.target.id);
    idActual = event.target.parentNode.getAttribute('id').split("_")[1];

    pos = getIndiceId(idActual,personasList);
    delError("txtNombre");
    delError("txtApellido");
    delError("txtFecha");
    abrirCargar();

    $("txtNombre").value = personasList[pos].nombre;
    $("txtApellido").value = personasList[pos].apellido;
    $("txtFecha").value = personasList[pos].fecha;
    if(personasList[pos].sexo == "Male")
        $("rdbSexoM").checked = true;
    else
        $("rdbSexoF").checked = true;
    
}

function editarConRespuestaPost()
{

    for(var i=0; i < personasList.length; i++)
    {
        console.log("personasList[i].id: "+ personasList[i].id +"- idActual: "+idActual);

        if(personasList[i].id == idActual)
        {
            personasList[i].nombre =    $("txtNombre").value;
            personasList[i].apellido =  $("txtApellido").value;
            personasList[i].fecha =     $("txtFecha").value;
            personasList[i].sexo =      obtenerValorRadio("rdbSexo");
            listar();
            break;
        }
    }
}

function modificarClick()
{
    opcionABML = "editar";

    //alert("guardar");
    if(validarCampos())
    {
        var nombre    = $("txtNombre").value;
        var apellido  = $("txtApellido").value;
        var fecha =     $("txtFecha").value;
        var sexo = obtenerValorRadio("rdbSexo");

        paramsStr = {"id":idActual,"nombre":nombre,"apellido":apellido,"fecha":fecha,"sexo":sexo}; //formato json
        //alert(JSON.stringify(paramsStr));
        llamarServidor("POST",opcionABML,functionCallBack,JSON.stringify(paramsStr));

        cerrar();
    }
    
}


function abrirCargar()
{

    var textbox = $("txtNombre");
    textbox.autofocus = true;

    var boxData = $("boxData");
    boxData.hidden = false;
}

function cerrar()
{
    var boxData = $("boxData");
    boxData.hidden = true;
}


function validarCampos()
{
    var nombre    = $("txtNombre").value;
    var apellido  = $("txtApellido").value;
    var fecha = $("txtFecha").value;
    var sexo = obtenerValorRadio("rdbSexo");

    var retorno = true;

    if(nombre.length < 3)
    {
        addError("txtNombre");
        retorno = false;
    }
    else
        delError("txtNombre");
    
    if(apellido.length < 3)
    {
        addError("txtApellido");
        retorno = false;
    }
    else
        delError("txtApellido");
    
    if(sexo == null)
    {
        addError("divSexo");
        retorno = false;
    }
    else
        delError("divSexo");

    if(!fechaValida(fecha))
    {
        addError("txtFecha");
        retorno = false;
    }
    else
        delError("txtFecha");

    return retorno;    

}

function fechaValida(fecha)
{
    var ret = true;

    var anio = fecha.split("-")[0];
    var mes =  fecha.split("-")[1];
    var dia =  fecha.split("-")[2];
    var fec = new Date(anio, mes, dia);

    var fechaYYYYMMDD = dateToYYYYMMDD(fec);
    var fechaActual = dateToYYYYMMDD(new Date());


    if(fechaActual < fechaYYYYMMDD)
        ret = false;    
    
    return ret;

}

function dateToYYYYMMDD(fecha)
{
    var anio = fecha.getFullYear();
    var mes = fecha.getMonth();
    var dia = fecha.getDate();

    var date = (anio).pad(4) + (mes).pad(2)+(dia).pad(2);
    
    return date;
}

/**Convierte un nro a string con ceros a la izq de size de largo */
Number.prototype.pad = function(size) 
{
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
  


function addLoadingClass() 
{
  const container = document.getElementsByClassName("principal")[0];
  
  if(container.classList.contains("loading")) 
    container.classList.remove("loading");
  else 
    container.classList.add("loading");
  
}


function obtenerValorRadio(radioName)
{
    var radios = document.getElementsByName(radioName);

    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            return radios[i].value;
        
        break;
        }
    }
    return null;
}

function addError(name)
{
    const obj = $(name);

    if(!obj.classList.contains("error")) 
        obj.classList.add("error");
}

function delError(name)
{
    const obj = $(name);
    if(obj.classList.contains("error")) 
        obj.classList.remove("error");
}