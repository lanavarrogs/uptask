//Botones
const btnCrearProyecto = document.querySelector('.crear-proyecto a'),
        btnNuevaTarea = document.querySelector('.nueva-tarea'),
        btnAcciones = document.querySelector('.listado-pendientes');

//lista proyectos
var listaProyectos = document.querySelector('ul#proyectos');

EventListeners();

function EventListeners(){
    //Boton para crear un proyecto
    btnCrearProyecto.addEventListener('click',nuevoProyecto);
    //Boton para crear una nueva tarea
    btnNuevaTarea.addEventListener('click',agregarTarea);
    //Botones para los listados de las tareas
    btnAcciones.addEventListener('click',accionesTareas);
}

function nuevoProyecto(e){
    e.preventDefault();
    console.log("Presionaste en el boton");
    btnCrearProyecto.style.display = 'none';

    //Crea un input para el nombre del proyecto
    let nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    //Seleccionar el id con el nuevo proyecto
    let inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    //Al presionar enter crear el proyecto
    inputNuevoProyecto.addEventListener('keypress', e =>{
        let tecla = e.which || e.keyCode;
            if (tecla === 13){
                if(inputNuevoProyecto.value == ""){
                    alert("El campo es obligatorio");
                }else{
                    GuardarProyectoDB(inputNuevoProyecto.value);
                }
                listaProyectos.removeChild(nuevoProyecto);
                btnCrearProyecto.style.display = 'block';
            }
    });
}

function GuardarProyectoDB(nombreProyecto){
    const datos = new FormData();
    datos.append('proyecto',nombreProyecto);
    datos.append('accion','crear');
    //Crear el objeto
    const xhr = new XMLHttpRequest;

    //Abrir la conexion
    xhr.open('POST', 'includes/models/modelo-proyecto.php',true);
    //Respuesta del servidor
    xhr.onload = function (){
        if(this.status === 200){
            let {respuesta,id,nombre,tipo} = JSON.parse(xhr.responseText);
            if(respuesta === 'correcto'){
                //Fue exitoso
                if(tipo === 'crear'){
                     //Inyectar el Html
                    let nuevoProyecto  = document.createElement('li');
                    nuevoProyecto.innerHTML = `<a href="index.php?id_proyecto=${id}" id ="proyecto:${id}">${nombre}</a>`
                    listaProyectos.appendChild(nuevoProyecto);
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'El proyecto se agrego correctamente'
                    }).then(resultado => {
                        //Reedireccionar a la nueva url
                        window.location.href = `index.php?id_proyecto=${id}`;
                    });
                }
            }else{
                //Hubo un error
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Ocurrio un error'
                });
            }
        }
    }
    //Enviar los datos
    xhr.send(datos);
}

//Agregar una nueva tarea al proyecto actual
function agregarTarea(e){
    e.preventDefault();
    let nombreTarea = document.querySelector('.nombre-tarea').value;
    let id = document.querySelector('#id_proyecto').value;
    console.log(id);
    //Validar que el campo no este vacio
    if(nombreTarea === ""){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'La tarea no puede ir vacia'
        });
    }else{
        //La tarea existe entonces insertar en PHP

        //Crear FormData

        const datos =  new FormData();
        datos.append('tarea',nombreTarea);
        datos.append('accion','crear');
        datos.append('id_proyecto',id);
        console.log(datos);

        //Crear llamod a AJAX
        const xhr = new  XMLHttpRequest();

        //Abrir la conexion
        xhr.open('POST','includes/models/modelo-tarea.php',true);

        //Ejecutar  AJAX
        xhr.onload = function(){
            if(this.status === 200){
                //Todo correcto
                //Asignar valores
                let respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
                if(respuesta.respuesta === 'correcto'){
                    //Se agrego correctamente
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarea creada!',
                        text: 'La tarea se agrego correctamente'
                    });
                    let parrafoLista = document.querySelectorAll('.lista-vacia');
                    if(parrafoLista.length>0){
                        document.querySelector('.lista-vacia').remove();
                    }
                    //Construir el template
                    let nuevaTarea = document.createElement('li');
                    //Agreagar el id
                    nuevaTarea.id = `tarea: ${respuesta.id_insertado}`;
                    //Agregar la clase tarea
                    nuevaTarea.classList.add('tarea');
                    //Construir en el HTML
                    nuevaTarea.innerHTML = `
                        <p>${respuesta.nombre_tarea}</p>
                        <div class= "acciones">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-trash"></i>
                        </div>
                    `;
                    //Agregarlo al DOM
                    let listado = document.querySelector('.listado-pendientes ul');
                    listado.appendChild(nuevaTarea);
                    //Limpiar el formulario
                    document.querySelector('.agregar-tarea').reset();
                }else{
                    //Hubo un error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Ocurrio un error'
                    });
                }
            }
        }
        //Enviar los datos
        xhr.send(datos);
    }
}

//Cambia el estado de las tareas o las elimina
function accionesTareas(e){
    e.preventDefault();
    let tareaEliminar = e.target.parentElement.parentElement
    console.log(tareaEliminar);

    if(e.target.classList.contains('fa-check-circle')){
        if(e.target.classList.contains('completo')){
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target,0);
        }else{
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target,1);
        }
    }else if(e.target.classList.contains('fa-trash')){
        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta accion no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si,borrar'
        }).then((result) => {
            if (result.value) {
                //Borrar de la BD
                elminarTarea(tareaEliminar);
                //Borrar del HTML
                tareaEliminar.remove();
            }
        });
    }
}

//Completa o descompleta una tarea
function cambiarEstadoTarea(tarea,estado){
    let id_tarea = tarea.parentElement.parentElement.id.replace('tarea:',"");
    //Crear llamado AJAX
    const xhr = new XMLHttpRequest();
    //Informacion
    var datos = new FormData();
    datos.append('id',id_tarea);
    datos.append('accion','actualizar');
    datos.append('estado',estado);
    //Abrir la conexion
    xhr.open('POST','includes/models/modelo-tarea.php',true);
    //On load
    xhr.onload = function(){
        if(this.status === 200){
            let respuesta = JSON.parse(xhr.responseText);
        }
    }
    //Enviar los datos
    xhr.send(datos);
}

//Elimina las tareas de la base de datos
function elminarTarea(tarea){
    let id_tarea = tarea.id.replace('tarea:',"");
    //Crear llamado AJAX
    const xhr = new XMLHttpRequest();
    //Informacion
    var datos = new FormData();
    datos.append('id',id_tarea);
    datos.append('accion','eliminar');
    //Abrir la conexion
    xhr.open('POST','includes/models/modelo-tarea.php',true);
    //On load
    xhr.onload = function(){
        if(this.status === 200){
            let {respuesta} = JSON.parse(xhr.responseText);
            let listaTareasRestantes = document.querySelectorAll('.li-tarea');
            if(listaTareasRestantes.length === 0){
                document.querySelector('.listado-pendientes ul').innerHTML = "<p class='lista-vacia'>No hay tareas en este proyecto</p>";
            }
            if(respuesta === 'correcto'){
                Swal.fire(
                    'Eliminado!',
                    'La tarea ha sido eliminada con exito',
                    'success'
                );
            }else{
                Swal.fire(
                    'Error!',
                    'Ha ocurrido un error',
                    'error'
                );
            }
        }
    }
    //Enviar los datos
    xhr.send(datos);
}