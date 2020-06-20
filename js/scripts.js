const btnCrearProyecto = document.querySelector('.crear-proyecto a');
//lista proyectos
var listaProyectos = document.querySelector('ul#proyectos');

EventListeners();

function EventListeners(){
    btnCrearProyecto.addEventListener('click',nuevoProyecto);
    
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