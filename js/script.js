//URL de la API - EndPoint
const API_URL = "https://retoolapi.dev/raxrWS/EXPO";

//funcion para llamr a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL);

    //Convertir la respuesta del servidor en formato JSON
    const data = await res.json();

    CrearTabla(data); //Enviamos el JSON a la funcion "Crear Tabla"
}


//Funcion que creara las filas de la tabla en base a los registros que vienen de la API
function CrearTabla(datos){ //"datos" representa al JSON que viene de la API
    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody")

    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => (
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.Correo}</td>
                <td>
                    <button onClick = "AbrirModalEditar(${persona.id}, '${persona.nombre}', '${persona.apellido}', ${persona.edad}, '${persona.Correo}')">Editar</button>
                    <button onClick = "EliminarRegistros(${persona.id})">Eliminar</button>
                </td>
            <tr>
        `
    ));
}

ObtenerPersonas();


//Procesos para agreagar un nuevo registro.
const modal = document.getElementById("modalAgregar"); //Cuadro de dialogo

const btnAgregar = document.getElementById("btnAbrirModal"); // + para abrir

const btnCerrar = document.getElementById("btnCerrarModal"); //X para cerrar 

btnAgregar.addEventListener("click", () =>{
    modal.showModal();
});

btnCerrar.addEventListener("click", () => {
    modal.close();
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async  e => {
    e.preventDefault(); // "e" repesenta el evento submit --- evita que el formulario se envie sin nada.

    //Capturamos los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const Correo = document.getElementById("email").value.trim();

    if(!nombre || !apellido || !edad || !Correo){
        alert("Complete todos los campos");
        return; //Evita que los campos vengan vacion y se siga ejecutando
    }

    //Llamar a la API para enviar el Ususario
    const respuesta = await fetch(API_URL, {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, edad, Correo})
    });

    if(respuesta .ok){
        alert("El Registro fue agregado recientemente")
        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();
        //Cerrar el formulario
        modal.close();
        //Para Recargar la tabla
        ObtenerPersonas();
    }
    else{
        alert("Hubo un eror al Agregar");
    }

});//Fin del formulario





//Para eliminar Registros

async function EliminarRegistros(id) { //Se pide ID para borrar
    if(confirm("¿Estas seguro de que deseas borrar el Registro?")){
        await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        ObtenerPersonas(); //Para Obtener la Lista Actualizada
    }
}



//Proceso para editar los Registros
const ModalEditar = document.getElementById("modalEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");


//EventListener para cerrar el Modal de Editar
btnCerrarEditar.addEventListener("click",() =>{
    ModalEditar.close(); //Cerrar el formulario
});


function AbrirModalEditar(id,nombre,apellido,edad,Correo){
    //Colocamos directamente el valor a los input con la propiedad "value"
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("edadEditar").value = edad;
    document.getElementById("emailEditar").value = Correo;

    ModalEditar.showModal(); //El modal se abre cuando ya tiene los valores ingresados
}


document.getElementById("frmEditarIntegrante").addEventListener("submit", async e =>{
    e.preventDefault();//Evitamos que el formulario se envie de inmediato

    //Capturamos los valores del formulario
    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar").value.trim();
    const apellido = document.getElementById("apellidoEditar").value.trim();
    const edad = document.getElementById("edadEditar").value.trim();
    const Correo = document.getElementById("emailEditar").value.trim();

    //Validar que los campos esten bien
    if(!nombre || !apellido || !edad || !Correo || !id){
        alert("Complete todos los Campos. Por favor 😡🤬😡🤬😡");
        return;
    }

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},  
        body: JSON.stringify({edad, Correo, nombre, apellido})
    });


    if(respuesta.ok){
        alert("Registro Actualizado Completamente");
        ModalEditar.close(); //Cerramos el modal
        ObtenerPersonas();//Recargamos la lista
    }
    else{
        alert("Error al Actualizar");
    }
});









