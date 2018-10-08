function $(id) 
{
    var num = document.getElementById(id);
    return num;    
}

function Sumar()
{
    var res = confirm("Seguro que desea sumar?");
    if(res)
    {
        var num1 = $("num1");
        var num2 = $("num2");
        var resultado = $("resultado");
        if(!emptyField())
        {
            resultado.value = parseFloat(num1.value) + parseFloat(num2.value);
        }
        else
        {
            resultado.value = 'ERROR';
        }
    }
    else
    {
        alert("No sumó");
    }
}


function sumarGuardar()
{
    var num1 = $("num1");
    var num2 = $("num2");
    var resultado = $("resultado");
    if(!emptyField())
    {
        resultado.value = parseFloat(num1.value) + parseFloat(num2.value);
    }
    else
    {
        resultado.value = 'ERROR';
    }

    var tabla = document.getElementById("tbody");

    tabla.innerHTML+="<tr><td>"+num1.value+"</td>"+"<td>"+num2.value+"</td>"+"<td>"+resultado.value+"</td></tr>"
}


function emptyField()
{
    var num1 = $("num1");
    var num2 = $("num2");
    var res = $("resultado");
    if( num1.value == '' && num2.value == '')
    {
        num1.setAttribute("class","error");
        num2.setAttribute("class","error");
        alert("Ingrese números válidos.");
        return true;
    }
    else
    {
        return false;
    }

}

function showCalc()
{
    var button = document.getElementById("divisor");
    button.setAttribute("class", "show")
}