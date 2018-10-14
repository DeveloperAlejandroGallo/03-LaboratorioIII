function $(id)
{
    return document.getElementById(id);
}

function accion()
{
    console.log("event.target: " + event.target);
    console.log("event.target.id: " + event.target.id);
    var celda = $(event.target.id);
    console.log("celda.nodeName: "+celda.nodeName);
    console.log("celda.getAttribute('id'): " + celda.getAttribute('id'));
    console.log("celda.parentElement: "+celda.parentElement);
    console.log("celda.parentNode: "+celda.parentNode);
    console.log("celda.parentElement.getAttribute('id'): "+celda.parentElement.getAttribute("id"));
    console.log("celda.parentNode.getAttribute('id'): "+celda.parentNode.getAttribute("id"));
    
    console.log("event.target.getAttribute('id')"+event.target.parentNode.getAttribute('id'));
    console.log("event.target.getAttribute('id')"+event.target.parentNode.getAttribute('id'));

    
}