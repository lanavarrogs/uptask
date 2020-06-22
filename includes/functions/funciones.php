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
            return  $conexion->query("SELECT * FROM proyectos");
        } catch (\Exception $e) {
            echo "Error!" . $e->getMessage();
            return false;
        }
    }

    //Obtener el nombre
    function obtenerNombre($id = null){
        include 'conexion.php';
        try {
                return  $conexion->query("SELECT nombre FROM proyectos WHERE id_proyecto = ${id}");
        } catch (\Exception $e) {
            echo "Error!" . $e->getMessage();
            return false;
        }
    }