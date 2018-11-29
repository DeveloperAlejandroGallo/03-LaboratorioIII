function todoElLocalStorage(lista)
{
    claves = Object.keys(localStorage),
    i = claves.length;
    while ( i-- ) 
        lista.push( localStorage.getItem(claves[i]) );
    
}


