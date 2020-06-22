<?php
    include 'includes/functions/sesiones.php';
    include 'includes/templates/header.php';
    include 'includes/templates/barra.php';
    error_reporting(E_ALL ^ E_NOTICE);
?>
<body>

<div class="contenedor">

    <?php include 'includes/templates/sidebar.php'; ?>
    <main class="contenido-principal">
        <h1>Proyecto Actual:
            <?php
                //Obtener el id de la url
                if(isset($_GET['id_proyecto'])){
                    $id_proyecto = $_GET['id_proyecto'];
                    $proyecto = obtenerNombre($id_proyecto);
                    foreach ($proyecto as $nombre) { ?>
                        <span><?php $nombre['nombre']; ?></span>
                <?php }?>


        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php  echo $id_proyecto ?>">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        <?php }else{
            //Si no hay proyectos Seleccionados
            echo "<p>Selecciona un proyecto</p>";
        }
        ?>

        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
                <?php
                    //obtiene las tareas del proyecto actual
                    $tareas = obtenerTareas($id_proyecto);
                    if($tareas->num_rows>0){
                        //Si hay tareas
                        foreach ($tareas as $tarea) {?>
                            <li id="tarea:<?php echo $tarea['id_tarea'] ?>" class="tarea">
                                <p><?php echo $tarea['nombre'] ?></p>
                                    <div class="acciones">
                                        <i class="far fa-check-circle <?php echo ($tarea['estatus'] === '1' ? 'completo' : '')?>"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                            </li>
                <?php   }
                    }else{
                        //No hay tareas
                        echo "<p class='lista-vacia'>No hay tareas en este proyecto</p>";
                    }
                ?>
            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php  include 'includes/templates/footer.php'?>