/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./Pajaro.ts" />
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

                $("#tAnimales").toggle(1000);
            });

            /** Doble clieck en la grilla, levanta el modal */
            $("#tAnimales").on("dblclick", "tr", function (e) 
            {
                let index: number = $(e.currentTarget).index(); //Obtener el indice de una fila

                let key: string = $(this).find("td:first").html(); //:nth-child(1) tambien sirve
                idActual = key;
                //let key2 = $(this).find("td:nth-child(2)").html(); //obtengo al valor del td especificado como param.
                let obj: mascota.IAnimal = JSON.parse(localStorage.getItem(key));

                console.log("Formato Fecha: " + obj.fNacimiento);
                $("#txtNombre").val(obj.nombre);
                $("#txtRaza").val(obj.raza);
                $("txtAltura").val(obj.altura);
                $("#txtFNacimiento").val(obj.fNacimiento);

                $("#rb" + obj.tipo).prop("checked", true);

                $('#cargaAnimales').modal('show');
                //$('#btnGuardar').prop('visible',false);
                $('#divGuardar').hide();
                $('#divEliminar').show();
                $('#divModificar').show();

            });

            $("#btnGuardar").click(function ()
            {
                let nombre: string = $("#txtNombre").val().toString();
                let raza: string = $("#txtRaza").val().toString();
                let altura: number = Number($("#txtAltura").val());

                let fAux: Date = new Date($("#txtFNacimiento").val().toString());
                let fNacimiento: string = window['fecha'](fAux);//llamo a una func exterior
                let tipo = $('input:radio[name=rbTipoAnimal]:checked').val().toString(); //del grupo de radios busco cual es el que esta checked
                let newMascota: mascota.IAnimal;

                switch(tipo)
                {
                    case "Perro":
                        newMascota = new mascota.Perro(nombre, raza, altura, fNacimiento);
                        break;
                    case "Gato":
                        newMascota = new mascota.Gato(nombre, raza, fNacimiento);
                        break;
                    case "Pajaro":
                        newMascota = new mascota.Pajaro(nombre, raza, fNacimiento, 10);
                        break;
                }

                localStorage.setItem(newMascota.nombre, newMascota.toJson());
                Programa.animales.push(newMascota);
                Programa.verLista();

                $('#cargaAnimales').modal('hide');
                // $('#tAnimales').bootstrapTable('refresh');
            });

            // var tabla = $("#tAnimal");
            // var refresh = $('#btnRefresh');

            // refresh.click(function()
            // {
            //     tabla.bootstrapTable('refresh');
            // });

            $("#btnAlta").click(function ()
            {
                $('#divGuardar').show();
                $('#divEliminar').hide();
                $('#divModificar').hide();
            }
            );

            $('#btnEliminar').click(
                function ()
                {
                    if (confirm("¿Está seguro de eliminar el registro " + idActual + '?'))
                    {
                        $('#cargaAnimales').modal('hide');
                        localStorage.removeItem(idActual);
                        Programa.animales = Programa.animales.filter(x => x.nombre != idActual);
                        Programa.verLista();
                    }


                }
            );

            $('#btnModificar').click(
                function()
                {
                    if(confirm("Se modificaran los datos de "+idActual+'\n¿Desea Continuar?'))
                    {
                        let obj: mascota.IAnimal = JSON.parse(localStorage.getItem(idActual));
                        
                        obj.tipo = $('input:radio[name=rbTipoAnimal]:checked').val().toString();
                        obj.raza = $("#txtRaza").val().toString();
                        obj.altura = <number>$("txtAltura").val();
                        obj.fNacimiento = $("#txtFNacimiento").val().toString();
    
                        localStorage.setItem(idActual,JSON.stringify(obj));
    
                        Programa.animales.forEach(animal => 
                        {
                            if(animal.nombre == idActual)
                            {
                                animal.tipo = obj.tipo;
                                animal.raza = obj.raza;
                                animal.altura = obj.altura;
                                animal.fNacimiento = obj.fNacimiento;
                            }
                        });

                        $('#cargaAnimales').modal('hide');
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
                        Programa.animales = Programa.animales.filter(ani => ani.nombre.toLowerCase().indexOf(str) > -1);
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
                    $('btnBuscar').click();
            });

        });//Fin document ready


    export class Programa 
    {
        static animales = Array<mascota.IAnimal>();

        static hablar(p: mascota.IAnimal)
        {
            console.log(p.nombre);
            p.hacerRuido();
        }

        static accionar()
        {
            console.log("************CON ARRAY**********");
            Programa.animales.forEach(Programa.hablar);
            console.log("************PERSEANDO**********");
            console.log(JSON.parse(JSON.stringify(Programa.animales)));
        }


        static localStorageToList()
        {
            if (localStorage.length > 0)
            {
                this.animales = [];
                let claves = Object.keys(localStorage),
                    i = claves.length;
                while (i--) 
                {
                    let obj = JSON.parse(localStorage.getItem(claves[i]));
                    let newMascota: mascota.IAnimal;
                    if (obj.tipo == "Perro")
                        newMascota = new mascota.Perro(obj.nombre, obj.raza, obj.altura, obj.fNacimiento);
                    else
                        newMascota = new mascota.Gato(obj.nombre, obj.raza, obj.fNacimiento);
                    Programa.animales.push(newMascota);
                }
                //alert(JSON.stringify( Programa.animales));
                Programa.verLista();
            }
        }

        static verLista()
        {
            console.log("************POR INICIO DE PROGRAMA************");
            console.log(JSON.parse(JSON.stringify(Programa.animales)));

            let tbody: string = "";
            let cantReg:number = Programa.animales.reduce(
                function(acum:number, valorActual:mascota.IAnimal)
                {
                    let num:number = 0;
                    if($.isNumeric(valorActual.altura) )
                    {
                        num = <number>valorActual.altura;
                    }
                    
                    return parseInt(acum.toString(), 10) + parseInt(num.toString(), 10)   ;
                },0);
                
            $("#lblCantReg").html("<b> "+cantReg.toString()+"</b>");

            Programa.animales.forEach(element => 
            {
                tbody += '<tr>' +
                    '<td class="column1">' + element.nombre + '</td>' +
                    '<td class="column2">' + element.tipo + '</td>' +
                    '<td class="column3">' + element.raza + '</td>' +
                    '<td class="column4">' + (typeof (element.altura) == 'undefined' ? '-' : element.altura) + '</td>' +
                    '<td class="column5">' + element.fNacimiento + '</td>' +
                    '</tr>';
            });
            $('#tAnimales tbody').html(tbody);
            // $('#tAnimales').bootstrapTable(
            // {
            //     data: JSON.parse(JSON.stringify( Programa.animales)),
            //     locale: 'es-AR',
            //     silent: true
            //     //,url: "./index.html"

            // });

        }




    }
}