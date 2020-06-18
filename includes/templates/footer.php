
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <?php 
        $actual = obtenerPaginaActual();
        if($actual == 'crear-cuenta' || $actual == 'login'){
            echo '<script src="js/formulario.js"></script>';
        }
    ?>
</body>
</html>