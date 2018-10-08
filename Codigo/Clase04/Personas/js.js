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
}

window.onload = cargarWindow;

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
    body.innerHTML += "<tr><td>"+nombre.value+"</td><td>"+apellido.value+"</td><td><a >Eliminar</a></td></tr>";
}

function tagA(event)
{
    event.preventDefault();
}
// tagA(event) //event es la variable del evento que se esta invocando