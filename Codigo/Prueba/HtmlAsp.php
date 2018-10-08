
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Prueba</title>
</head>
<body>
    <table>
        <thead>
            <th>Nombre:</th>
        </thead>
        <tbody>
            <?php
                $lista = array(1,2,3,4,5,6,7,8,9,10);
                foreach($lista as $i)
                    echo 'Nro: $i<br>';
            ?>
        </tbody>
    </table>
</body>
</html> 