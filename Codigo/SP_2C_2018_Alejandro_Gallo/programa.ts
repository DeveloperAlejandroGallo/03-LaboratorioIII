/// <reference path="./Persona.ts" />
/// <reference path="./Cliente.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
/// <reference path="./node_modules/@types/bootstrap-table/index.d.ts" />
/// <reference path="./node_modules/@types/bootstrap/index.d.ts" />

namespace ejemplo
{
    $(document).ready(
        function ()
        {

            var idActual: string = "";

            Programa.localStorageToList();

                /************Ocultar/Mostrar grilla *******/
            $("#btnGrilla").click(function ()
            {
                if ($('#btnGrilla').val() == "Ver Grilla")
                    $('#btnGrilla').val("Ocultar Grilla");
                else
                    $('#btnGrilla').val("Ver Grilla");

                $("#tPersonas").toggle(1000);
            });

            /** Doble clieck en la grilla, levanta el modal */
            $("#tPersonas").on("dblclick", "tr", function (e) 
            {
                //let index: number = $(e.currentTarget).index(); //Obtener el indice de una fila

                let key: string = $(this).find("td:first").html(); //:nth-child(1) tambien sirve
                idActual = key;
                //let key2 = $(this).find("td:nth-child(2)").html(); //obtengo al valor del td especificado como param.
                let obj: Personas.Cliente = JSON.parse(localStorage.getItem(key));

                $("#txtId").val(obj.id);
                $("#txtId").attr("disabled","disabled");
                $("#txtNombre").val(obj.nombre);
                $("#txtEdad").val(obj.edad);
                $("#txtApellido").val(obj.apellido);

                $("#rb" + obj.sexo).prop("checked", true);

                $('#cargaPersonas').modal('show');
                //$('#btnGuardar').prop('visible',false);
                $('#divGuardar').hide();
                $('#divEliminar').show();
                $('#divModificar').show();

            });

            $("#btnGuardar").click(function ()
            {
                let id: number = Number($("#txtId").val());
                let nombre: string = $("#txtNombre").val().toString();
                let apellido: string = $("#txtApellido").val().toString();
                let edad: number = Number($("#txtEdad").val());

                let sexo = $('input:radio[name=rbSexo]:checked').val().toString(); //del grupo de radios busco cual es el que esta checked
                let newPersona: Personas.Cliente;
                newPersona = new Personas.Cliente(id, nombre, apellido, edad, sexo);

                localStorage.setItem(newPersona.id.toString(), newPersona.toJson());
                Programa.personas.push(newPersona);
                Programa.verLista();
                $("#txtId").removeAttr("disabled");
                $('#cargaPersonas').modal('hide');
                // $('#tPersonas').bootstrapTable('refresh');
            });

            // var tabla = $("#tAnimal");
            // var refresh = $('#btnRefresh');

            // refresh.click(function()
            // {
            //     tabla.bootstrapTable('refresh');
            // });

            $("#btnAlta").click(function ()
            {
                $("#txtNombre").val("");
                $("#txtEdad").val("");
                $("#txtApellido").val("");
                $("#rbMasculino").attr('checked','checked');

                $('#divGuardar').show();
                $('#divEliminar').hide();
                $('#divModificar').hide();
                $("#txtNombre").focus();
                let nextId:number = Programa.personas.reduce(
                    function(acum:number, valorActual:Personas.Cliente)
                    {
                        if(acum < valorActual.id)
                            return valorActual.id;
                        else
                            return acum;
                    },0) ;
                    $("#txtId").val(parseInt(nextId.toString(),10)+1);
                    $("#txtId").attr("disabled","disabled");
            }
            );

            $("#btnLimpiarLocalStorage").on('click',
                function()
                {
                    localStorage.clear();
                    Programa.localStorageToList();
                    Programa.verLista();
                }
            );

            $('#btnEliminar').click(
                function ()
                {
                    if (confirm("¿Está seguro de eliminar el registro " + idActual + '?'))
                    {
                        $('#cargaPersonas').modal('hide');
                        localStorage.removeItem(idActual);
                        Programa.personas = Programa.personas.filter(x => x.id.toString() != idActual);
                        Programa.verLista();
                    }


                }
            );

            $('#btnModificar').click(
                function()
                {
                    if(confirm("Se modificaran los datos de "+idActual+'\n¿Desea Continuar?'))
                    {
                        let obj: Personas.Cliente = JSON.parse(localStorage.getItem(idActual));
                        
                        obj.nombre = $("#txtNombre").val().toString();
                        obj.edad = <number>$("#txtEdad").val();
                        obj.apellido = $("#txtApellido").val().toString();
                        obj.sexo = $('input:radio[name=rbSexo]:checked').val().toString();
    
                        localStorage.setItem(idActual,JSON.stringify(obj));
    
                        Programa.personas.forEach(per => 
                        {
                            if(per.id.toString() == idActual)
                            {
                                per.sexo = obj.sexo;
                                per.nombre = obj.nombre;
                                per.edad = obj.edad;
                                per.apellido = obj.apellido;
                            }
                        });
                        $("#txtId").removeAttr("disabled");
                        $('#cargaPersonas').modal('hide');

                        Programa.verLista();
                    
                    }
                    

                }   
            );

            $('#btnBuscar').click(
                function()
                {
                    if($('#txtBuscar').val() != "")
                    {
                        Programa.localStorageToList();
                        var str:string = $('#txtBuscar').val().toString().toLowerCase();
                        Programa.personas = Programa.personas.filter(per => per.nombre.toLowerCase().indexOf(str) > -1);
                        Programa.verLista();
                    }
                    else
                        Programa.localStorageToList();
                }
            );

            
            $('.togglecol').on('change', function (e) {
                // get the target for this checkbox and toggle it
                var tableColumn = $(e.currentTarget).data('target');
                $('.' + tableColumn).toggle();
              });

            $('#txtBuscar').keypress(
             function(ev)
            {   
                if(ev.which == 13)
                    $('#btnBuscar').click();
            });

        });//Fin document ready


    export class Programa 
    {
        static personas = Array<Personas.Cliente>();

        static localStorageToList()
        {
            if (localStorage.length >= 0)
            {
                this.personas = [];
                let claves = Object.keys(localStorage);
                    
                for(let i:number=0; i< claves.length;i++)
                {
                    let obj = JSON.parse(localStorage.getItem(claves[i]));
                    let newPersona: Personas.Cliente;
                    newPersona = new Personas.Cliente(obj.id, obj.nombre, obj.apellido, obj.edad, obj.sexo);

                    Programa.personas.push(newPersona);
                }
                //alert(JSON.stringify( Programa.personas));
                Programa.verLista();
            }
        }

        static verLista()
        {
            console.log("************Lista JSON************");
            console.log(JSON.parse(JSON.stringify(Programa.personas)));

            let tbody: string = "";
            let cantReg:number = Programa.personas.length;

            let promedioEdad:number = Programa.personas.reduce(
                function(acum:number, valorActual:Personas.Cliente)
                {
                    return parseInt(acum.toString(), 10) + parseInt(valorActual.edad.toString(), 10)   ;
                },0) /cantReg;
            
                console.log(promedioEdad);

            if(!$.isNumeric(promedioEdad))
                promedioEdad = 0;

            $("#lblCantReg").html("<b> "+cantReg+"</b>");
            $("#lblPromedioEdad").html("<b> "+promedioEdad+"</b>");

            Programa.personas.forEach(element => 
            {
                tbody += '<tr>' +
                    '<td class="column1">' + element.id + '</td>' +
                    '<td class="column2">' + element.nombre + '</td>' +
                    '<td class="column3">' + element.apellido + '</td>' +
                    '<td class="column4">' + element.edad + '</td>' +
                    '<td class="column5">' + element.sexo + '</td>' +
                    '</tr>';
            });
            $('#tPersonas tbody').html(tbody);

            let listMap = this.personas.map(
                function(item)
                { 
                  return {nombre: item.nombre,edad: item.edad};
                });

            console.log("Lista con Map: \nNombre y Edad:");
            console.log(listMap);
        }




    }
}