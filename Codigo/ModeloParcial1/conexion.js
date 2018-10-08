//Primero armo la variable http
var xmlHTTP = new XMLHttpRequest();
var server = "http://localhost:3000/";



window.onload = function ()
{
    opcionABML = "alta";
    ejecutarGet();
    cargarWindow();

}

function ejecutarGet()
{
    xmlHTTP.onreadystatechange = functionCallBack; //pasamos la variable funcion callback como parametro.
    xmlHTTP.open("GET",server+"noticias",true);
    xmlHTTP.send(null); //aca viajan los parametros.
}

//verifico la devolucion del srv
function functionCallBack()
{
        /*
    readystate 
    1 - conexion establecida
    2 - server llego info
    3 - el srv tiene la info disponible para enviarla pero todavia no la envio
    4 - termino de procesar y tenemos respuesta
    */
    if(xmlHTTP.readyState == 4)
    {//tenemos q evaluar si la respuesta es ok
        if(xmlHTTP.status == 200)//respuesta ok del srv
        {
            //alert(xmlHTTP.responseText); 
            switch (opcionABML)
            {
                case "alta":
                    altaConGet(xmlHTTP.responseText);
                    break;
                default:
                    break;
            }
        }
        else
            alert("Error Servidor - Codigo: " + xmlHTTP.status);
    }
}


function functionCallBackPost()
{
        /*
    readystate 
    1 - conexion establecida
    2 - server llego info
    3 - el srv tiene la info disponible para enviarla pero todavia no la envio
    4 - termino de procesar y tenemos respuesta
    */
    if(xmlHTTP.readyState == 4)
    {//tenemos q evaluar si la respuesta es ok
        if(xmlHTTP.status == 200)//respuesta ok del srv
        {
            //alert(JSON.parse(xmlHTTP.responseText)); 
            operarConRespuestaPost(JSON.parse(xmlHTTP.responseText));
        }
        else
            alert("Error Servidor - Codigo: " + xmlHTTP.status);
    }
}




function ejecutarPost(accion,callback,params)
{
    xmlHTTP.onreadystatechange = callback;
    
    xmlHTTP.open("POST",server+accion,true); //abrimos conexion del tipo get asincro
    
    //xmlHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//le estamos diciendo que viaja como un get - todo en una linea.
    xmlHTTP.setRequestHeader("Content-Type","application/json");
    //enviamos la info
    xmlHTTP.send(params);//van los parametro para el POST - viajan en el body
}

