var io = io("http://localhost:3000");

io.on("sensores-list", function (data) {
  let contentSensores = document.getElementById("sensores-content");
  contentSensores.innerHTML = "";
  for (let sensor of data) {
    let sensorDiv = document.createElement("div");
    sensorDiv.className = "sensor";
    sensorDiv.innerHTML = `<h2>Sensor ${sensor.tipo}</h2>`;
    sensorDiv.innerHTML += `<p id="${sensor.tipo}-value">Valor: ${sensor.valor} ${sensor.unidad}</p>`;
    contentSensores.appendChild(sensorDiv);
    io.on(`${sensor.tipo}-valor`, function (data) {
      console.log(data.valor);
      console.log(
        "Camgio en el sensor " +
          sensor.tipo +
          ": " +
          data.valor +
          " " +
          data.unidad
      );
      let valorSensor = document.getElementById(`${sensor.tipo}-value`);
      valorSensor.innerHTML = `Valor: ${data.valor} ${data.unidad}`;
    });
  }
});

io.on("actuadores-list", function (data) {
  let contentActuadores = document.getElementById("actuadores-content");
  contentActuadores.innerHTML = "";

  for (let actuador of data) {
    let actuadorDiv = document.createElement("div");
    actuadorDiv.className = "actuador";
    actuadorDiv.innerHTML = `<h2>Actuador ${actuador.nombre}</h2>`;
    let valorActuador = document.createElement("p");
    valorActuador.id = `${actuador.nombre}-value`;
    valorActuador.innerHTML = `Activado: ${actuador.activado ? "Sí" : "No"}`;
    valorActuador.dataset.estado = actuador.activado;
    actuadorDiv.appendChild(valorActuador);
    let toggleButton = document.createElement("button");
    toggleButton.innerHTML = "Cambiar";
    toggleButton.onclick = function () {
      let newValue = valorActuador.dataset.estado == "true" ? false : true;
      io.emit(`${actuador.nombre}-toggle`, newValue);
      valorActuador.dataset.estado = newValue;
      console.log(newValue);
      valorActuador.innerHTML = `Activado: ${newValue ? "Sí" : "No"}`;
    };
    actuadorDiv.appendChild(toggleButton);
    contentActuadores.appendChild(actuadorDiv);
    io.on(`${actuador.nombre}-toggle`, function (data) {
      console.log("Cambio en el actuador " + actuador.nombre + ": " + data);
      let valorActuador = document.getElementById(`${actuador.nombre}-value`);
	  valorActuador.dataset.estado = data;
      valorActuador.innerHTML = `Activado: ${data ? "Sí" : "No"}`;
    });
  }
});

io.on("database-info", function (data) {
  let databaseTableBody = document.getElementById("database-table-body");
  databaseTableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = databaseTableBody.insertRow(0);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    cell0.innerHTML = i;
    cell1.innerHTML = data[i].sensor;
    cell2.innerHTML = data[i].valorAnterior;
    cell3.innerHTML = data[i].nuevoValor;
    cell4.innerHTML = data[i].fecha;
  }

  console.log(data);
});

io.on("agente-alert", function (data) {
  console.log(data);
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add("text-bg-danger");
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.innerHTML = `<div class="toast-header text-bg-danger-subtle">
  <!-- <img src="..." class="rounded me-2" alt="..."> -->
  <strong class="me-auto">ALERTA</strong>
  <small></small>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
<div class="toast-body">
  ${data}
</div>`;
  const alertsContainer = document.getElementById("alerts-container");
  alertsContainer.appendChild(toast);

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toast.addEventListener("hidden.bs.toast", function () {
	toast.remove();
  });
  toastBootstrap.show();
});
