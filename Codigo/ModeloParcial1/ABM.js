app = new function()
{

    this.tablaHtml = $('noticias');

    var noticiasList = [];

    this.ListarTodos = function()
    {
        var lineasNoticia = '';

        if(this.noticiasList.length > 0)
        {
            for(i=0; i > this.noticiasList.length; i++)
            {
                lineasNoticia +=  
                '<div id=noticia_'+this.noticiasList[i].id+' class="noticia">'+
                '<button id="btnEliminar_'+this.noticiasList[i].id+'" class="btn btnCerrar">X</button>'+
                '<button id="btnEditar_'+this.noticiasList[i].id+'" class="btn btnEditar">E</button>';

                lineasNoticia += '<h2>'+titulo+'</h2><p>'+noticia+'</p></div>';
            }
        }

        return this.tablaHtml.innerHtml = lisneasNoticia;

    };


    this.Alta = function()
    {
        var accion = "nuevaNoticia";
        var titulo = $("txtTitulo").value;
        var tema = $("txtTema").value;
        var noticia = $("txtDescripcion").value;
        paramsStr = {"email":"algo@gmail.com","tema":tema,"titulo":titulo,"noticia":noticia}; //formato json
        
        this.noticiasList.push(paramsStr);

        ejecutarPost(accion,functionCallBackPost,JSON.stringify(paramsStr));
    }

}