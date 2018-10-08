var listaPersonas = [];


window.onload = cargarWindow;

function $(id)
{
    return document.getElementById(id);
}


//addEventListener
//sobreescribimos el window.onload, para que tome la funcion anonima. Y haga algo al cargar la pagina.
function cargarWindow()
{
    var btn = $("btnAgregar");
    btn.addEventListener("click",abrir); //variable de tipo funcion abrir
    var btnCerrar = $("btnCerrar");
    btnCerrar.addEventListener("click",cerrar);
    var btnGuardar = $("btnGuardar");
    btnGuardar.addEventListener("click",guardar);

    inicializarTabla();
}



function abrir()
{
    var btnAgregar = $("btnAgregar");
    var contAgregar = $("contAgregar");
    var contTitulo = $("titulo");

    btnAgregar.hidden = true;
    contAgregar.hidden = false;
    contTitulo.hidden = false;

}

function cerrar()
{
    var btnAgregar = $("btnAgregar");
    var contAgregar = $("contAgregar");
    var contTitulo = $("titulo");

    btnAgregar.hidden = false;
    contAgregar.hidden = true;
    contTitulo.hidden = true;
}

function guardar()
{
    var body = $("tbdPersonas");
    var nombre = $("txtNombre");
    var apellido = $("txtApellido");
    body.innerHTML += "<tr><td>"+nombre.value+"</td><td>"+apellido.value+"</td><td><a href=''>Eliminar</a></td></tr>";
}

function tagA(event)
{
    event.preventDefault();
    data.splice(index,1);
    cargarDatosIniciales();
}
// tagA(event) //event es la variable del evento que se esta invocando






function arrayJson()
{
    var personas = {"nombre" : "Juan", "edad":35};
    alert(personas[0].nombre);

    var a = ["Juan","Pedro","Pepe"]; /**es un array */
    a.push();

    var p = {}; /**con llaves es un json */
}


function inicializarTabla()
{
    // var persona1 = {"nombre":"Nombre 1","apellido":"Apellido 1"};

    // var listaPersonas = [persona1,{"nombre":"Nombre 2","apellido":"Apellido 2"}];

    
    // alert(persona1.nombre);
    // alert(listaPersonas[1].nombre);

    //listaPersonas.push({"nombre":"Ale","apellido":"Gallo"});
    // listaPersonas.splice(0,1);/**Desde que elemento (0) cuantos elementos elimino (1)*/

    for(var i=0; i<=10;i++)
        listaPersonas.push({"nombre":"Nombre "+i,"apellido":"Apellido "+i});

    cargarLista(listaPersonas);
}

/**Cargar el objeto Json con el vector */

function cargarLista(lista)
{
    var body = $("tbdPersonas");
    for(var i=0; lista.length;i++)
    {
        body.innerHTML += "<tr><td>"+lista[i].nombre+"</td><td>"+lista[i].apellido+"</td><td><a href=''>Eliminar</a></td></tr>";
    }
    
}



