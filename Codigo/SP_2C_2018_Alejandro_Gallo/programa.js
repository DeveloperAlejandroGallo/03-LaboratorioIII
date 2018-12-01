/// <reference path="./Persona.ts" />
/// <reference path="./Cliente.ts" />
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
            $("#tPersonas").toggle(1000);
        });
        /** Doble clieck en la grilla, levanta el modal */
        $("#tPersonas").on("dblclick", "tr", function (e) {
            //let index: number = $(e.currentTarget).index(); //Obtener el indice de una fila
            var key = $(this).find("td:first").html(); //:nth-child(1) tambien sirve
            idActual = key;
            //let key2 = $(this).find("td:nth-child(2)").html(); //obtengo al valor del td especificado como param.
            var obj = JSON.parse(localStorage.getItem(key));
            $("#txtId").val(obj.id);
            $("#txtId").attr("disabled", "disabled");
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
        $("#btnGuardar").click(function () {
            var id = Number($("#txtId").val());
            var nombre = $("#txtNombre").val().toString();
            var apellido = $("#txtApellido").val().toString();
            var edad = Number($("#txtEdad").val());
            var sexo = $('input:radio[name=rbSexo]:checked').val().toString(); //del grupo de radios busco cual es el que esta checked
            var newPersona;
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
        $("#btnAlta").click(function () {
            $("#txtNombre").val("");
            $("#txtEdad").val("");
            $("#txtApellido").val("");
            $("#rbMasculino").attr('checked', 'checked');
            $('#divGuardar').show();
            $('#divEliminar').hide();
            $('#divModificar').hide();
            $("#txtNombre").focus();
            var nextId = Programa.personas.reduce(function (acum, valorActual) {
                if (acum < valorActual.id)
                    return valorActual.id;
                else
                    return acum;
            }, 0);
            $("#txtId").val(parseInt(nextId.toString(), 10) + 1);
            $("#txtId").attr("disabled", "disabled");
        });
        $("#btnLimpiarLocalStorage").on('click', function () {
            localStorage.clear();
            Programa.localStorageToList();
            Programa.verLista();
        });
        $('#btnEliminar').click(function () {
            if (confirm("¿Está seguro de eliminar el registro " + idActual + '?')) {
                $('#cargaPersonas').modal('hide');
                localStorage.removeItem(idActual);
                Programa.personas = Programa.personas.filter(function (x) { return x.id.toString() != idActual; });
                Programa.verLista();
            }
        });
        $('#btnModificar').click(function () {
            if (confirm("Se modificaran los datos de " + idActual + '\n¿Desea Continuar?')) {
                var obj_1 = JSON.parse(localStorage.getItem(idActual));
                obj_1.nombre = $("#txtNombre").val().toString();
                obj_1.edad = $("#txtEdad").val();
                obj_1.apellido = $("#txtApellido").val().toString();
                obj_1.sexo = $('input:radio[name=rbSexo]:checked').val().toString();
                localStorage.setItem(idActual, JSON.stringify(obj_1));
                Programa.personas.forEach(function (per) {
                    if (per.id.toString() == idActual) {
                        per.sexo = obj_1.sexo;
                        per.nombre = obj_1.nombre;
                        per.edad = obj_1.edad;
                        per.apellido = obj_1.apellido;
                    }
                });
                $("#txtId").removeAttr("disabled");
                $('#cargaPersonas').modal('hide');
                Programa.verLista();
            }
        });
        $('#btnBuscar').click(function () {
            if ($('#txtBuscar').val() != "") {
                Programa.localStorageToList();
                var str = $('#txtBuscar').val().toString().toLowerCase();
                Programa.personas = Programa.personas.filter(function (per) { return per.nombre.toLowerCase().indexOf(str) > -1; });
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
        Programa.localStorageToList = function () {
            if (localStorage.length >= 0) {
                this.personas = [];
                var claves = Object.keys(localStorage);
                for (var i = 0; i < claves.length; i++) {
                    var obj = JSON.parse(localStorage.getItem(claves[i]));
                    var newPersona = void 0;
                    newPersona = new Personas.Cliente(obj.id, obj.nombre, obj.apellido, obj.edad, obj.sexo);
                    Programa.personas.push(newPersona);
                }
                //alert(JSON.stringify( Programa.personas));
                Programa.verLista();
            }
        };
        Programa.verLista = function () {
            console.log("************Lista JSON************");
            console.log(JSON.parse(JSON.stringify(Programa.personas)));
            var tbody = "";
            var cantReg = Programa.personas.length;
            var promedioEdad = Programa.personas.reduce(function (acum, valorActual) {
                return parseInt(acum.toString(), 10) + parseInt(valorActual.edad.toString(), 10);
            }, 0) / cantReg;
            console.log(promedioEdad);
            if (!$.isNumeric(promedioEdad))
                promedioEdad = 0;
            $("#lblCantReg").html("<b> " + cantReg + "</b>");
            $("#lblPromedioEdad").html("<b> " + promedioEdad + "</b>");
            Programa.personas.forEach(function (element) {
                tbody += '<tr>' +
                    '<td class="column1">' + element.id + '</td>' +
                    '<td class="column2">' + element.nombre + '</td>' +
                    '<td class="column3">' + element.apellido + '</td>' +
                    '<td class="column4">' + element.edad + '</td>' +
                    '<td class="column5">' + element.sexo + '</td>' +
                    '</tr>';
            });
            $('#tPersonas tbody').html(tbody);
            var listMap = this.personas.map(function (item) {
                return { nombre: item.nombre, edad: item.edad };
            });
            console.log("Lista con Map: \nNombre y Edad:");
            console.log(listMap);
        };
        Programa.personas = Array();
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
