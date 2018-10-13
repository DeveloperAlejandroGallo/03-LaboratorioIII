//Primero armo la variable http
var xmlHTTP = new XMLHttpRequest();
var server = "http://localhost:3000/";
var respuestaServidor;


window.onload = function ()
{
    opcionABML = "personas";
    llamarServidor("GET",opcionABML,functionCallBack,null);
    cargarWindow();

}


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
            addLoadingClass();
           // console.log("Response: " + xmlHTTP.responseText);
            
            var data = JSON.parse(xmlHTTP.responseText);
            operarConRespuestaSrv(data);
           
        }
        else
            alert("Error Servidor - Codigo: " + xmlHTTP.status);
    }
}


/**
 * 
 * @param {GET/POST} tipo 
 * @param {noticias/nuevaNoticia/eliminarNotica/editarNoticia} accion 
 * @param {functionCallBack} callback 
 * @param {null para GET/parametros en formato stringify} params 
 */
function llamarServidor(tipo,accion,callback,params)
{
    addLoadingClass();
    xmlHTTP.onreadystatechange = callback;

    xmlHTTP.open(tipo,server+accion,true); //abrimos conexion del tipo get asincro
    //xmlHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//le estamos diciendo que viaja como un get - todo en una linea.
    xmlHTTP.setRequestHeader("Content-Type","application/json");
    //enviamos la info
    xmlHTTP.send(params);//van los parametro para el POST - viajan en el body - para get viene en null
}

