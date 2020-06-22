//Botones
const btnCrearProyecto = document.querySelector('.crear-proyecto a'),
        btnNuevaTarea = document.querySelector('.nueva-tarea');
//lista proyectos
var listaProyectos = document.querySelector('ul#proyectos');

EventListeners();

function EventListeners(){
    //Boton para crear un proyecto
    btnCrearProyecto.addEventListener('click',nuevoProyecto);
    //Boton para crear una nueva tarea
    btnNuevaTarea.addEventListener('click',agregarTarea);
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
                    nuevoProyecto.innerHTML = `<a href="index.php?id_respuesta=${id}">${nombre}</a>`
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
                let respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
            }
        }
        //Enviar los datos
        xhr.send(datos);
    }
}