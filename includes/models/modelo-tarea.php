<?php
    $accion = $_POST['accion'];

    if($accion == 'crear'){
        $nombre = $_POST['tarea'];
        $id_proyecto = (int) $_POST['id_proyecto'];
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
            }else{
                $respuesta = array(
                    'respuesta' => 'error',
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

    if($accion == 'actualizar'){
        $estado = (int) $_POST['estado'];
        $id_tarea = (int) $_POST['id'];
        include '../functions/conexion.php';
        try {
            $stmt = $conexion->prepare("UPDATE tareas SET estatus = ? WHERE id_tarea = ? ");
            $stmt->bind_param("ii",$estado,$id_tarea);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                );
            }else{
                $respuesta = array(
                    'respuesta' => 'error',
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

    if($accion == 'eliminar'){
        $id_tarea = (int) $_POST['id'];
        include '../functions/conexion.php';
        try {
            $stmt = $conexion->prepare("DELETE FROM tareas WHERE id_tarea = ? ");
            $stmt->bind_param("i",$id_tarea);
            $stmt->execute();
            if($stmt->affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                );
            }else{
                $respuesta = array(
                    'respuesta' => 'error',
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