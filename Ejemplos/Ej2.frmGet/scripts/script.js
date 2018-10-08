window.addEventListener('load', inicializarEventos, false);

function inicializarEventos(){
    document.getElementById('frmPersona').addEventListener('submit', manejarPedido, false);
}

function manejarPedido(e){
    e.preventDefault();
    enviarDatos();
}

function enviarDatos(){

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('info').innerHTML = this.responseText;
        }
    }
    
    var data = leerFormulario();

    xhr.open('GET', 'pagina1.php?' + data, true);
    xhr.send();
}

function leerFormulario(){
    var nombre = document.getElementById('txtNombre').value;
    var edad = document.getElementById('txtEdad').value;
    return "nombre=" + nombre + "&edad=" + edad;
}