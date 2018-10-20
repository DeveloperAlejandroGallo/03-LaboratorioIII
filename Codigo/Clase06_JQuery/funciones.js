var url = "http://localhost:3000/"


$(document).ready(
    function()
    {
        // alert($("#iNombre").val()); //Devuelve el valor
        $("#iNombre").val("Este es un nuevo valor..."); //setea un valor
        $("p").html("Este es el texto que va en los p"); //Selecciona por tag
        // $(".btn").html("Llamar a GET"); // con punto seleccionamos por clase

        $("#btnGet").click(
            function()
            {
                $.get(url+"personas",
                    function(data, status)
                    {
                        alert("Datos: " + data + "\nStatus: " + status);
                        console.log(data);
                    });
            });

        $("#btnPost").click(
            function()
            {
                $.post(url+"nueva",
                    {
                        nombre: "Ale",
                        apellido: "Gallo",
                        sexo: "Male",
                        fecha: "1982-05-16"
                    },
                    function(datos, estado)
                    {
                        alert("Datos: " + datos + "\nStatus: " + estado);
                        console.log(datos);
                    }
                );
            }
        );

        $("#btnPostAjax").click(
            function()
            {
                $.ajax(
                    {
                    url:url+"nueva",
                    data:{
                        nombre: "Ale",
                        apellido: "Gallo",
                        sexo: "Male",
                        fecha: "1982-05-16"
                    },
                    type:"POST",
                    success: function(datos, estado)
                        {
                            alert("Datos: " + datos + "\nStatus: " + estado);
                            console.log(datos);
                        },
                    error: function(status)
                        {
                            alert("ERROR!");
                        },
                    timeout: 1000000,
                    async: false

                });
            }
        );

        $("#fArchivo").change(
            function()
            {
                if(this.files && this.files[0])
                {
                    var fReader = new FileReader();
                    fReader.addEventListener("load", 
                        function(e)
                        {
                            console.log(e.target.result);
                            console.log("\n\n***********************************************************\n\n");
                            $("#imgFile").attr("src",e.target.result);
                        }
                    );
                    fReader.readAsDataURL(this.files[0]); //Esto hace que se ejecute luego el Load
                    console.log("this.files[0]: ",this.files[0]);
                    console.log("\n\n***********************************************************\n\n");
                }
            });
    }//fin fn ready
);


