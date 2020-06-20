<?php
    $accion = $_POST['accion'];
    $proyecto = $_POST['proyecto'];
    if($accion == 'crear'){
        include '../functions/conexion.php';
        try {
            //code...
            $stmt = $conexion->prepare("INSERT INTO proyecto(nombre) VALUES(?)");
            $stmt->bind_param("s",$proyecto);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id' => $stmt->insert_id,
                    'nombre' => $proyecto,
                    'tipo' => 'crear'
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

?>