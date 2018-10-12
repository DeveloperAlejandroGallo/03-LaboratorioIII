//obtiene un elemento por id
function $(id)
{
    var elemento = document.getElementById(id);
    return elemento;
}

//console.log(); logueo lo que quiero en la consola de chrome

function calcularYGuardar(guardar)
{
    var nro1 = $("txtNro1");
    var nro2 = $("txtNro2");
    var oper = $("selOperacion");

    var resultado = $("txtResultado");
    var operacion = operar(parseFloat(nro1.value),parseFloat(nro2.value));
    resultado.value = operacion;
    
    
    if(guardar)
    {
        var row = $("tblbResultados");
        row.innerHTML += "<tr><td>"+nro1.value+"</td><td>"+oper.value+"</td><td>"+nro2.value+"</td><td>"+resultado.value+"</td></tr>";
    }

}

function operar(nro1,nro2)
{

    var oper = $("selOperacion")
    var resultado = "Error";

    switch(oper.value)
    {
        case "+":
            resultado = nro1 + nro2;
            break;
        case "-":
            resultado = nro1 - nro2;
            break;
        case "*":
            resultado = nro1 * nro2;
            break;
        case "/":
            if(nro2 != 0)
                resultado = nro1 / parseFloat(nro2);
            else
                alert("División por 0");
            break;
        default:
            alert("Elija una operación");
            oper.focus = true;
            break;
    }
    
    return resultado;

}

function verCalculadora()
{
    var divCalc = $("calculadora");
    var botonVer = $("btnVer");

    if(divCalc.style.visibility == "hidden")
    {
        divCalc.style.visibility = "visible";
        botonVer.value = "Ocultar Calculadora";
    }
    else
    {
        divCalc.style.visibility = "hidden";
        botonVer.value = "Ver Calculadora";
    }
}