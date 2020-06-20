<?php  
    //Obtiene la pagina actual
    function obtenerPaginaActual(){
        $archivo = basename($_SERVER['PHP_SELF']);
        $pagina = str_replace(".php","",$archivo);
        return $pagina;
    }

    //Consultas

    //Obtener los proyectos
    function obtenerProyectos(){
        include 'conexion.php';
        try {
            $sql = $conexion->query("SELECT * FROM proyecto");
            $conexion->close();
            return $sql;
        } catch (\Exception $e) {
            echo "Error!" . $e->getMessage();
            return false;
        }
    }  
    
    //Obtener el nombre
    function obtenerNombre($id = null){
        try {
            $sql = $conexion->query("SELECT nombre FROM proyecto WHERE id_proyecto = '1' ");
            $conexion->close();
            return $sql;
        } catch (\Exception $e) {
            echo "Error!" . $e->getMessage();
            return false;
        }
    }  