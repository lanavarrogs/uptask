<?php  
    $accion = $_POST['accion'];
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    
    if($accion == 'crear'){
        //Codigo para crear cuentas
        //Hashear el password
        $opciones = array(
            'cost' => 10
        );
        $hashPassword = password_hash($password,PASSWORD_BCRYPT,$opciones);
        //Conexion a la base de datos
        include '../functions/conexion.php';
        try {
            $stmt = $conexion->prepare("INSERT INTO usuarios(usuario , password) VALUES (?,?) ");
            $stmt->bind_param("ss",$usuario,$hashPassword);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion
                );
            }
            $stmt->close();
            $conexion->close();
        } catch (\Exception $e) {
            $respuesta = array(
                'error' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }

    if($accion === 'login'){
        //Codigo para loguearse 
    }

?>