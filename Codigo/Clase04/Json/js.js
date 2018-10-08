/*
Json:
Clave : valor
*/

function arraytJson()
{
    var personas = {"nombre" : "Juan", "edad":35};
    alert(personas[0].nombre);

    var a = ["Juan","Pedro","Pepe"]; /**es un array */
    a.push();

    var p = {}; /**con llaves es un json */
}


function inicializarTabla()
{
    var persona1 = {"nombre":"Nombre 1","apellido":"Apellido 1"};

    var listaPersonas = [persona1,{"nombre":"Nombre 2","apellido":"Apellido 2"}];

    alert(persona1.nombre);
    alert(listaPersonas[1].nombre);

    for(var i=0; listaPersonas.length;i++)
    {

    }
}

/**Cargar el objeto Json con el vector */