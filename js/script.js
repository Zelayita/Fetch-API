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