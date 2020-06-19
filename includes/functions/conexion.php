<?php 
    define('DB_HOST','localhost');
    define('DB_USER','root');
    define('DB_PASSWORD','');
    define('DB_NAME','uptask'); 

    $conexion = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);

    if($conexion->connect_error){
        echo $conexion->connect_error;
    }

    $conexion->set_charset('utf-8');

?>