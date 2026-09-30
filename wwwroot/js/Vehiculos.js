const API_URL = "/api";

function ObtenerVehiculos() {
    fetch(`${API_URL}/CargaVehiculo`)
    .then((respuesta) => respuesta.json())
    .then((data) => {
        console.log(data);
        MostrarVehiculos(data);
    })
    .catch((error) => console.error(error));
}

function MostrarVehiculos(data) {
    const tbody = document.getElementById("Vehiculos");
    tbody.innerHTML = "";

    data.forEach((element) => {
        console.log("Elemento:", element);
        console.log("ID:", element.vehiculoid);
        let tr = tbody.insertRow();
        tr.insertCell(0).innerHTML = element.marca;
        tr.insertCell(1).innerHTML = element.modelo;
        tr.insertCell(2).innerHTML = element.año;
        tr.insertCell(3).innerHTML = element.patente;
        tr.insertCell(4).innerHTML = element.kilometraje;
        tr.insertCell(5).innerHTML = element.fechaIngreso.split("T")[0]; //mostrar fecha sin hora en el front-end
        let tdEstado = tr.insertCell(6);
        if (element.disponible){
            tdEstado.innerHTML = '<span class= "badge bg-success">Disponible</span>';
        }
        else{
             tdEstado.innerHTML = '<span class="badge bg-danger">No disponible</span>';
        }

        let eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.classList.add("btn", "btn-danger");

        eliminar.onclick = function () {
            ValidacionEliminarVehiculo(element.vehiculoID, element.disponible);
        };

        let tdEliminar = tr.insertCell(7);
        tdEliminar.appendChild(eliminar);

        // Botón editar
        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.classList.add("btn", "btn-primary");

        editar.onclick = function () {
            BuscarValoresVehiculo(element.vehiculoID);
        };

        let tdEditar = tr.insertCell(8);
        tdEditar.appendChild(editar);
    });
}

function AgregarVehiculo() {
    var nuevoVehiculo = {
        marca: document.getElementById("Marca").value.trim(),
        modelo: document.getElementById("Modelo").value.trim(),
        año: document.getElementById("Año").value.trim(),
        patente: document.getElementById("Patente").value.trim(),
        fechaingreso: document.getElementById("FechaIngreso").value.trim(),
        kilometraje: document.getElementById("Kilometraje").value.trim(),
    };
    if(
        Kilometraje.value < 0
    ){
        alert("El kilometraje del vehículo no puede ser negativo");
        return;
    }
    if(
        nuevoVehiculo.modelo.length < 3 || nuevoVehiculo.modelo.length > 20
    ){
        alert("El modelo del vehículo debe tener entre 3 y 20 caracteres");
        return;
    }
    if ( //validacion para verificar que el año del vehiculo sea mayor a 0
        nuevoVehiculo.año <= 0
    ) {
        alert("El año del vehículo debe ser mayor a 0");
        return;
    }
    if ( //validacion para verificar que todos los campos esten completos
        nuevoVehiculo.marca === "" ||
        nuevoVehiculo.modelo === "" ||
        nuevoVehiculo.año === "" ||
        nuevoVehiculo.patente === "" ||
        nuevoVehiculo.fechaingreso === "" ||
        nuevoVehiculo.kilometraje === ""
    ) {
        alert("Debe completar todos los campos para agregar un nuevo vehiculo");
        return;
    }

    fetch(`${API_URL}/CargaVehiculo`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVehiculo),
    })
        .then((respuesta) => respuesta.json())
        .then((data) => {
            document.getElementById("Marca").value = "";
            document.getElementById("Modelo").value = "";
            document.getElementById("Año").value = "";
            document.getElementById("Patente").value = "";
            document.getElementById("FechaIngreso").value = "";
            document.getElementById("Kilometraje").value = "";
            ObtenerVehiculos(); //llamado a la funcion para agregar el vehiculo
        })
}

function BuscarValoresVehiculo(id) {
    fetch(`${API_URL}/CargaVehiculo/${id}`)
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then((data) => {
        console.log("Datos del vehículo:", data);

        document.getElementById("VehiculoID").value = data.vehiculoID;
        document.getElementById("MarcaEditar").value = data.marca;
        document.getElementById("ModeloEditar").value = data.modelo;
        document.getElementById("AñoEditar").value = data.año;
        document.getElementById("PatenteEditar").value = data.patente;
        document.getElementById("KilometrajeEditar").value = data.kilometraje;
        document.getElementById("FechaIngresoEditar").value = data.fechaIngreso.split("T")[0];
        document.getElementById("EstadoEditar").value = data.disponible;

        let modal = new bootstrap.Modal(document.getElementById("editarVehiculo"));
        modal.show();
    })
    .catch((error) => {
        console.error("No se pudo acceder a la API:", error);
    });
}

function EditarVehiculo() {
    let id = document.getElementById("VehiculoID").value;
    let editarVehiculo = {
        vehiculoID: document.getElementById("VehiculoID").value,
        marca: document.getElementById("MarcaEditar").value.trim(),
        modelo: document.getElementById("ModeloEditar").value.trim(),
        año: document.getElementById("AñoEditar").value.trim(),
        patente: document.getElementById("PatenteEditar").value.trim(),
        fechaingreso: document.getElementById("FechaIngresoEditar").value.trim(),
        kilometraje: document.getElementById("KilometrajeEditar").value.trim(),
        disponible: document.getElementById("EstadoEditar").value === "true",
    };

    if(
        KilometrajeEditar.value < 0
    ){
        alert("El kilometraje del vehículo no puede ser negativo");
        return;
    }
    if(
        editarVehiculo.modelo.length < 3 || editarVehiculo.modelo.length > 20
    ){
        alert("El modelo del vehículo debe tener entre 3 y 20 caracteres");
        return;
    }
    if ( //validacion para verificar que el año del vehiculo sea mayor a 0
        editarVehiculo.año <= 0
    ) {
        alert("El año del vehículo debe ser mayor a 0");
        return;
    }
    if ( //validacion para verificar que todos los campos esten completos
        editarVehiculo.marca === "" ||
        editarVehiculo.modelo === "" ||
        editarVehiculo.año === "" ||
        editarVehiculo.patente === "" ||
        editarVehiculo.fechaingreso === "" ||
        editarVehiculo.kilometraje === ""
    ) {
        alert("Debe completar todos los campos para guardar los cambios");
        return;
    }
    fetch(`${API_URL}/CargaVehiculo/${id}`, {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editarVehiculo),
    })
        .then(() => {
            document.getElementById("MarcaEditar").value = "";
            document.getElementById("ModeloEditar").value = "";
            document.getElementById("AñoEditar").value = "";
            document.getElementById("PatenteEditar").value = "";
            document.getElementById("FechaIngresoEditar").value = "";
            document.getElementById("KilometrajeEditar").value = "";
            
            const modalElemento = document.getElementById("editarVehiculo");
            bootstrap.Modal.getOrCreateInstance(modalElemento).hide();
            ObtenerVehiculos(); //ahora llamo a la funcion para actualizar la tabla

        })
        .catch((error) => {
            console.error("No se pudo acceder a la API:", error);
        })
}

function ValidacionEliminarVehiculo(id, disponible) {
    if(
        disponible == true
    ){
        alert("No se puede eliminar un vehículo que está disponible");
        return;   
    }
    var siElimina = confirm ("¿Está seguro que desea eliminar este vehiculo?");
    if (siElimina == true) {
        EliminarVehiculo(id);
    } 
}

function EliminarVehiculo(id) {
    fetch(`${API_URL}/CargaVehiculo/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            ObtenerVehiculos(); //nuevamente llamo a la funcion para eliminar el vehiculo
        })
        .catch((error) => console.error("No se pudo acceder a la API:", error));
}

ObtenerVehiculos(); //acá uso la funcion para mostrar los vehiculos en la web