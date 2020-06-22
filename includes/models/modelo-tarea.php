<?php
    $accion = $_POST['accion'];
    $nombre = $_POST['tarea'];
    $id_proyecto = (int) $_POST['id_proyecto'];

    if($accion == 'crear'){
        include '../functions/conexion.php';
        try {
            $stmt = $conexion->prepare("INSERT INTO tareas(nombre,id_proyecto) VALUES(?,?)");
            $stmt->bind_param("si",$nombre,$id_proyecto);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'id_insertado' => $stmt->insert_id,
                    'tipo' => $accion,
                    'nombre_tarea'=> $nombre
                );
            }
            $stmt->close();
            $conexion->close();
        } catch (\Exception $e) {
            $respuesta = array(
                'respuesta' => $e->getMessage()
            );
        }
        echo json_encode($respuesta);
    }
?>