<!DOCTYPE html>
<html>
	<head>
	    <title>Parking</title>
  		<link href="css/style.css" rel="stylesheet" type="text/css">
	    <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
			<script type="text/javascript" src="js/rutas.js"></script>
			<script type="text/javascript" src="js/Concurrent.Thread.js"></script>
			<script type="text/javascript" src="js/parking.js"></script>
	</head>

	<body>
			<div class="contenedor-principal">
				<div class="contenedor-principal-izquierdo">
					<div class="contenedor-tabla-plazas">
						<div id="tabla-plazas"></div>
					</div>
				</div>
				<div class="contenedor-principal-derecho">
					<div class="contenedor-datos-ocupacion">
						<div class="contenedor-plazas-totales">
							<div id="texto-plazas-totales">PLAZAS TOTALES</div>
							<div id="plazas-totales"></div>
						</div>
						<div class="contenedor-plazas-disponibles">
							<div id="plazas-disponibles"></div>
						</div>
					</div>
					<div class="contenedor-tabla-usuarios">
						<div id="tabla-usuarios"></div>
					</div>
					<div class="contenedor-mostrar-usuarios">
						<div class="contenedor-auxiliar">
							<div class="contenedor-informacion">
								<div class="contenedor-correo">
								  <div class="icono-correo"></div>
								  <div id="texto-correo"></div>
								</div>
								<div class="contenedor-vehiculo">
								  <div class="icono-vehiculo"></div>
								  <div id="texto-vehiculo"></div>
								</div>
								<div id="texto-plaza" class="contenedor-plaza"></div>
							</div>
							<div class="contenedor-mensaje">
								<div id="mensaje-pulsar-usuario">Pulsa sobre un usuario para ver sus datos</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	</body>
</html>
