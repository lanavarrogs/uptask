const formulario = document.querySelector('#formulario');

EventListeners();
//Listeners
function EventListeners(){
    formulario.addEventListener('submit',validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();
    let usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;
    
    if(usuario == "" || password == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Los campos son obligatorios',
        })
    }else{
        //Datos que se envian al servidor
        let datos = new FormData();
        datos.append('usuario',usuario);
        datos.append('password',password);
        datos.append('accion',tipo);

        //Creando el objeto AJAX
        const xhr = new XMLHttpRequest();
        //Abrir la conexion
        xhr.open('POST','includes/models/modelo-admin.php',true);
        //Retorno de datos
        xhr.onload = function () {
            if(this.status == 200){
                const respuesta = JSON.parse(xhr.responseText);
                if(respuesta.respueta === 'correcto'){
                    //Si es un nuevo Usuario
                    if(respuesta.tipo === 'crear'){
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario Creado',
                            text: 'Los campos son obligatorios',
                        })
                    }
                }
            }
        }
        //Enviar la peticion
        xhr.send(datos);
    }
}