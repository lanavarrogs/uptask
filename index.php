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

                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                <p>Cambiar el Logotipo</p>
                    <div class="acciones">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                </li>
            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php  include 'includes/templates/footer.php'?>