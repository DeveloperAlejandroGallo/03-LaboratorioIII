function todoElLocalStorage(lista)
{
    claves = Object.keys(localStorage),
    i = claves.length;
    while ( i-- ) 
        lista.push( localStorage.getItem(claves[i]) );
    
}

function fecha(fec)
{

    var dd = fec.getDate();
    var mm = fec.getMonth() + 1; //January is 0!
    
    var yyyy = fec.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    return yyyy + '-' + mm + '-' + dd;
}