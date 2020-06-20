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
            }else{
                $respuesta = array(
                    'respuesta' => 'error'
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

    if($accion == 'login'){
        //Codigo para loguearse 
        include '../functions/conexion.php';
        try {
            //Seleccionar el usuario de la base de datos
            $stmt = $conexion->prepare("SELECT id,usuario,password FROM usuarios WHERE usuario = ?");
            $stmt->bind_param('s',$usuario);
            $stmt->execute();
            //Loguear al usuario
            $stmt->bind_result($id_usuario,$nombre_usuario,$password_usuario);
            $stmt->fetch();
            if(isset($nombre_usuario)){
                //El usuario existe,verificar password
                if(password_verify($password,$password_usuario)){
                    //Iniciar la sesion
                    session_start();
                    $_SESSION['nombre'] = $nombre_usuario;
                    $_SESSION['id'] = $id_usuario;
                    $_SESSION['login'] = true;
                    //login correcto;
                    $respuesta = array(
                        'respuesta' => 'correcto',
                        'tipo' => $accion,
                        'nombre' => $nombre_usuario,
                        'id' => $stmt->insert_id
                    );
                }else{
                    //Login incorrecto,enviar error
                    $respuesta = array(
                        'respuesta' => 'Password Incorrecto'     
                    ); 
                }
            }else{
                $respuesta = array(
                    'error' => 'Usuario no existe'
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
?>