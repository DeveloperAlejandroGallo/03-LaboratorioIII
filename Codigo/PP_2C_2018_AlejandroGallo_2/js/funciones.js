//variables globales
var personasList=[];
var opcionABML;
var paramsStr;
var idActual;

//Obtener un objeto de la pag.
function _$(id)
{
    return document.getElementById(id);
}

function cargarWindow()
{
    var btnCerrar = _$("btnCerrarData");
    btnCerrar.addEventListener("click",cerrar);
    var btnModificar = _$("btnGuardarData");
    btnModificar.addEventListener("click",modificarClick);
    var btnEliminar = _$("btnEliminarData");
    btnEliminar.addEventListener("click",eliminarClick);
    
   $("img").click(function()
   {
       alert("click");
   });
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
            case "editarFoto":
                editarFotoConRespuesta(data);
                break;
            default:
                break;
        }
    }
    else
        alert("ERROR!");
}

function editarFotoConRespuesta(data)
{
    var posicion = getIndiceId(data[0].id,personasList);
    personasList[posicion] = data;
    listar();
}

function obtenerPersonasGet(datos)
{
    personasList =datos; //string pasado a json - es un array de json
    listar();
}


function listar()
{
    var personasTbl = _$("personas");
    personasTbl.innerHTML = "";

    //alert("Lista contiene " + personasList.length + " registros.");

    for(var i=0; i<personasList.length;i++)
    {
        news = armarPersona(personasList[i].id,personasList[i].nombre,personasList[i].apellido,personasList[i].fecha,personasList[i].sexo, personasList[i].foto)
        personasTbl.innerHTML += news;
        // _$("btnEliminar_"+personasList[i].id).addEventListener("click",eliminarClick);
        // _$("btnEditar_"+personasList[i].id).addEventListener("click",editarClick);
    }

    agregarClickImg();
    agregarOnChangeInputFile();

}

function agregarClickImg()
{
    $("img").click(
        function()
        {
            event.target.nextSibling.hidden = false;
        }
    );
}

function agregarOnChangeInputFile()
{
    $("input").change(
        function()
        {
            console.log(event.target.parentNode.parentNode.getAttribute('id').split("_")[1]);
            var id = event.target.parentNode.parentNode.getAttribute('id').split("_")[1];
            if(this.files && this.files[0])
            {
                var fReader = new FileReader();
                fReader.addEventListener("load", 
                    function(e)
                    {
                        console.log(e.target.result);
                        console.log("\n\n***********************************************************\n\n");
                       // $("#imgFile").attr("src",e.target.result);
                        var obj = {
                            id:id,
                            foto:e.target.result
                        }
                        opcionABML = "personas";
                        $.ajax(
                            {
                            url:"http://localhost:3000/editarFoto",
                            data: obj,
                            type:"POST",
                            success: function()
                                {
                                    llamarServidor("GET",opcionABML,functionCallBack,null);
                                },
                            error: function(status)
                                {
                                    alert("ERROR!");
                                },
                            dataType:'json'
        
                        });
                    }
                );
                fReader.readAsDataURL(this.files[0]); //Esto hace que se ejecute luego el Load
                //console.log("this.files[0]: ",this.files[0]);
                console.log("\n\n***********************************************************\n\n");
            }
        });
}


function armarPersona(id,nombre,apellido, fecha, sexo, foto)
{
    var lineaPersona =  
        '<tr id="col_'+id+'" ondblclick="editarClick();">'+
            '<td><img src="'+foto+'"/><input type="file" hidden></td>'+
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

    _$("txtNombre").value = personasList[pos].nombre;
    _$("txtApellido").value = personasList[pos].apellido;
    _$("txtFecha").value = personasList[pos].fecha;
    if(personasList[pos].sexo == "Male")
        _$("rdbSexoM").checked = true;
    else
        _$("rdbSexoF").checked = true;
    
}

function editarConRespuestaPost()
{

    for(var i=0; i < personasList.length; i++)
    {
        console.log("personasList[i].id: "+ personasList[i].id +"- idActual: "+idActual);

        if(personasList[i].id == idActual)
        {
            personasList[i].nombre =    _$("txtNombre").value;
            personasList[i].apellido =  _$("txtApellido").value;
            personasList[i].fecha =     _$("txtFecha").value;
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
        var nombre    = _$("txtNombre").value;
        var apellido  = _$("txtApellido").value;
        var fecha =     _$("txtFecha").value;
        var sexo = obtenerValorRadio("rdbSexo");

        paramsStr = {"id":idActual,"nombre":nombre,"apellido":apellido,"fecha":fecha,"sexo":sexo}; //formato json
        //alert(JSON.stringify(paramsStr));
        llamarServidor("POST",opcionABML,functionCallBack,JSON.stringify(paramsStr));

        cerrar();
    }
    
}


function abrirCargar()
{

    var textbox = _$("txtNombre");
    textbox.autofocus = true;

    var boxData = _$("boxData");
    boxData.hidden = false;
}

function cerrar()
{
    var boxData = _$("boxData");
    boxData.hidden = true;
}


function validarCampos()
{
    var nombre    = _$("txtNombre").value;
    var apellido  = _$("txtApellido").value;
    var fecha = _$("txtFecha").value;
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
    const obj = _$(name);

    if(!obj.classList.contains("error")) 
        obj.classList.add("error");
}

function delError(name)
{
    const obj = _$(name);
    if(obj.classList.contains("error")) 
        obj.classList.remove("error");
}