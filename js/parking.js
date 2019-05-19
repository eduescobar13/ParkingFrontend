// Script para el control del parking y las funciones necesarias.

// DECLARACIÓN DE CONSTANTES
const PLAZAS_PARKING_INICIAL = 100;
const MILISEG_OCUPACION = 5000;

// DECLARACIÓN DE VARIABLES GLOBALES
var plazas_totales = PLAZAS_PARKING_INICIAL;

$(document).ready(function() {
  document.getElementById('plazas-totales').innerHTML = PLAZAS_PARKING_INICIAL;
  rellenar_tabla_ocupacion();
  obtener_usuarios();
  Concurrent.Thread.create(comprobar_ocupacion_plazas);
});

function rellenar_tabla_ocupacion() {
  for (var i = 1; i <= plazas_totales; i++) {
    insertar_ocupacion_plazas(i);
  };
}

function insertar_ocupacion_plazas(identificador) {
    var formato_plaza_disponible = "<div class='celda-plaza'>" +
                                     "<div class='identificador'>PLAZA " + identificador + "</div>" +
                                     "<div class='estado' id='" + identificador + "'><div class='disponible'></div></div>" +
                                   "</div>";
		document.getElementById('tabla-plazas').innerHTML += formato_plaza_disponible;
}

function comprobar_ocupacion_plazas() {
  while (true) {
    obtener_ocupacion_plazas();
  }
}

function obtener_ocupacion_plazas() {
  var plazas_disponibles = PLAZAS_PARKING_INICIAL;
  $.ajax({
      type: 'GET',
      url: RUTA_OCUPACION_PLAZAS,
      dataType: 'json',
      headers: {'Authorization': 'application/json'},
      success: function(datos) {
        $(datos).each(function(i, valor) {
            actualizar_plaza_ocupada(valor.parkingLotId, valor.state);
            if (valor.state == false) {
              plazas_disponibles -= 1;
            }
        });
      }
  }).done(function() {
    document.getElementById('plazas-disponibles').innerHTML = plazas_disponibles + " DISPONIBLES";
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert("Error: " + jqXHR.status);
  });
}

function actualizar_plaza_ocupada(identificador, estado) {
  var formato_plaza_ocupada = "<div class='ocupada'></div>";
  if (estado == false) {
    document.getElementById(identificador).innerHTML = formato_plaza_ocupada;
  }
}

function obtener_usuarios() {
  $.ajax({
      type: 'GET',
      url: RUTA_USUARIOS,
      dataType: 'json',
      headers: {'Authorization': 'application/json'},
      success: function(datos) {
        $(datos).each(function(i, valor) {
            insertar_usuario(valor.userId, valor.username);
        });
      }
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert("Error: " + jqXHR.status);
  });
}

function insertar_usuario(identificador, nombre) {
    var formato_usuario = "<div class='celda-usuario' onclick='mostrar_datos_usuario(" + identificador + ")'>" + nombre + "</div>";
		document.getElementById('tabla-usuarios').innerHTML += formato_usuario;
}

function mostrar_datos_usuario(identificador) {
	$.ajax({
				type: 'GET',
				url: RUTA_DATOS_USUARIO + "/" + identificador,
				dataType: 'json',
        headers: {'Authorization': 'application/json'},
				success: function(datos) {
					$(datos).each(function(i, valor) {
            insertar_datos_usuarios(valor.email, valor.Vehicle, valor.parkingLotId);
					});
				}
	}).done(function() {
    $('.contenedor-mensaje').fadeOut("fast", function() {
      $('.contenedor-informacion').fadeIn("fast");
    });
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert("Error: " + jqXHR.status);
  });
}

function insertar_datos_usuarios(correo, vehiculo, id_plaza) {
  document.getElementById('texto-correo').innerHTML = correo;
  document.getElementById('texto-vehiculo').innerHTML = vehiculo.brand + " " + vehiculo.model + " " + vehiculo.colour;
  document.getElementById('texto-plaza').innerHTML = "ALQUILANDO PLAZA " + id_plaza;
}
