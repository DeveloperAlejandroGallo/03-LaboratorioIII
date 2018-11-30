/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./Pajaro.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
/// <reference path="./node_modules/@types/bootstrap-table/index.d.ts" />
/// <reference path="./node_modules/@types/bootstrap/index.d.ts" />
var ejemplo;
(function (ejemplo) {
    $(document).ready(function () {
        var idActual = "";
        Programa.localStorageToList();
        /************Ocultar/Mostrar grilla *******/
        $("#btnGrilla").click(function () {
            if ($('#btnGrilla').val() == "Ver Grilla")
                $('#btnGrilla').val("Ocultar Grilla");
            else
                $('#btnGrilla').val("Ver Grilla");
            $("#tAnimales").toggle(1000);
        });
        /** Doble clieck en la grilla, levanta el modal */
        $("#tAnimales").on("dblclick", "tr", function (e) {
            //let index: number = $(e.currentTarget).index(); //Obtener el indice de una fila
            var key = $(this).find("td:first").html(); //:nth-child(1) tambien sirve
            idActual = key;
            //let key2 = $(this).find("td:nth-child(2)").html(); //obtengo al valor del td especificado como param.
            var obj = JSON.parse(localStorage.getItem(key));
            $("#txtNombre").val(obj.nombre);
            $("#txtRaza").val(obj.raza);
            $("#txtAltura").val(obj.altura);
            $("#txtFNacimiento").val(obj.fNacimiento);
            $("#rb" + obj.tipo).prop("checked", true);
            $('#cargaAnimales').modal('show');
            //$('#btnGuardar').prop('visible',false);
            $('#divGuardar').hide();
            $('#divEliminar').show();
            $('#divModificar').show();
        });
        $("#btnGuardar").click(function () {
            var nombre = $("#txtNombre").val().toString();
            var raza = $("#txtRaza").val().toString();
            var altura = Number($("#txtAltura").val());
            var fAux = new Date($("#txtFNacimiento").val().toString());
            var fNacimiento = window['fecha'](fAux); //llamo a una func exterior
            var tipo = $('input:radio[name=rbTipoAnimal]:checked').val().toString(); //del grupo de radios busco cual es el que esta checked
            var newMascota;
            switch (tipo) {
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
        $("#btnAlta").click(function () {
            $("#txtNombre").val("");
            $("#txtRaza").val("");
            $("#txtAltura").val("");
            $("#txtFNacimiento").val("");
            $("#rbPerro").attr('checked', 'checked');
            $('#divGuardar').show();
            $('#divEliminar').hide();
            $('#divModificar').hide();
        });
        $('#btnEliminar').click(function () {
            if (confirm("¿Está seguro de eliminar el registro " + idActual + '?')) {
                $('#cargaAnimales').modal('hide');
                localStorage.removeItem(idActual);
                Programa.animales = Programa.animales.filter(function (x) { return x.nombre != idActual; });
                Programa.verLista();
            }
        });
        $('#btnModificar').click(function () {
            if (confirm("Se modificaran los datos de " + idActual + '\n¿Desea Continuar?')) {
                var obj_1 = JSON.parse(localStorage.getItem(idActual));
                obj_1.tipo = $('input:radio[name=rbTipoAnimal]:checked').val().toString();
                obj_1.raza = $("#txtRaza").val().toString();
                obj_1.altura = $("#txtAltura").val();
                obj_1.fNacimiento = $("#txtFNacimiento").val().toString();
                localStorage.setItem(idActual, JSON.stringify(obj_1));
                Programa.animales.forEach(function (animal) {
                    if (animal.nombre == idActual) {
                        animal.tipo = obj_1.tipo;
                        animal.raza = obj_1.raza;
                        animal.altura = obj_1.altura;
                        animal.fNacimiento = obj_1.fNacimiento;
                    }
                });
                $('#cargaAnimales').modal('hide');
                Programa.verLista();
            }
        });
        $('#btnBuscar').click(function () {
            if ($('#txtBuscar').val() != "") {
                Programa.localStorageToList();
                var str = $('#txtBuscar').val().toString().toLowerCase();
                Programa.animales = Programa.animales.filter(function (ani) { return ani.nombre.toLowerCase().indexOf(str) > -1; });
                Programa.verLista();
            }
            else
                Programa.localStorageToList();
        });
        $('.togglecol').on('change', function (e) {
            // get the target for this checkbox and toggle it
            var tableColumn = $(e.currentTarget).data('target');
            $('.' + tableColumn).toggle();
        });
        $('#txtBuscar').keypress(function (ev) {
            if (ev.which == 13)
                $('#btnBuscar').click();
        });
    }); //Fin document ready
    var Programa = /** @class */ (function () {
        function Programa() {
        }
        Programa.hablar = function (p) {
            console.log(p.nombre);
            p.hacerRuido();
        };
        Programa.accionar = function () {
            console.log("************CON ARRAY**********");
            Programa.animales.forEach(Programa.hablar);
            console.log("************PERSEANDO**********");
            console.log(JSON.parse(JSON.stringify(Programa.animales)));
        };
        Programa.localStorageToList = function () {
            if (localStorage.length > 0) {
                this.animales = [];
                var claves = Object.keys(localStorage), i = claves.length;
                while (i--) {
                    var obj = JSON.parse(localStorage.getItem(claves[i]));
                    var newMascota = void 0;
                    if (obj.tipo == "Perro")
                        newMascota = new mascota.Perro(obj.nombre, obj.raza, obj.altura, obj.fNacimiento);
                    else
                        newMascota = new mascota.Gato(obj.nombre, obj.raza, obj.fNacimiento);
                    Programa.animales.push(newMascota);
                }
                //alert(JSON.stringify( Programa.animales));
                Programa.verLista();
            }
        };
        Programa.verLista = function () {
            console.log("************POR INICIO DE PROGRAMA************");
            console.log(JSON.parse(JSON.stringify(Programa.animales)));
            var tbody = "";
            var cantReg = Programa.animales.length;
            var promedioAltura = Programa.animales.reduce(function (acum, valorActual) {
                var num = 0;
                if ($.isNumeric(valorActual.altura)) {
                    num = valorActual.altura;
                }
                return parseInt(acum.toString(), 10) + parseInt(num.toString(), 10);
            }, 0) / cantReg;
            $("#lblCantReg").html("<b> " + cantReg + "</b>");
            $("#lblPromedioAltura").html("<b> " + promedioAltura + "</b>");
            Programa.animales.forEach(function (element) {
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
        };
        Programa.animales = Array();
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
