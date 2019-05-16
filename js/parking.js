// Script para el control del parking y las funciones necesarias.

// DECLARACIÓN DE CONSTANTES
const PLAZAS_PARKING_INICIAL = 100;

// DECLARACIÓN DE VARIABLES GLOBALES
var plazas_totales = PLAZAS_PARKING_INICIAL;
var plazas_disponibles = PLAZAS_PARKING_INICIAL;

$(document).ready(function() {
  document.getElementById('plazas-totales').innerHTML = PLAZAS_PARKING_INICIAL;
  rellenar_tabla_ocupacion();
  obtener_ocupacion_plazas();
  obtener_usuarios();
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

function obtener_ocupacion_plazas() {
  $.ajax({
      url: RUTA_OCUPACION_PLAZAS,
      dataType: 'json',
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
      url: RUTA_USUARIOS,
      dataType: 'json',
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
				type: 'POST',
				url: RUTA_DATOS_USUARIO2,
				dataType: 'json',
				data: 'identificador='+identificador,
				success: function(datos) {
					$(datos).each(function(i, valor) {
            insertar_datos_usuarios(valor.email, valor.parkingLotId, valor.vehicle);
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

function insertar_datos_usuarios(correo, id_plaza, vehiculo) {
  document.getElementById('texto-correo').innerHTML = correo;
  document.getElementById('texto-vehiculo').innerHTML = vehiculo;
  if (id_plaza == null) {
    document.getElementById('texto-plaza').innerHTML = "NO OCUPA PLAZA";
    $("#texto-plaza").css('background-color', '#3C8F32');
  }
  else {
    document.getElementById('texto-plaza').innerHTML = "OCUPANDO PLAZA " + id_plaza;
  }
}
