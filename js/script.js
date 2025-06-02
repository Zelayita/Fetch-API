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
                    <button>Editar</button>
                    <button>Eliminar</button>
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







