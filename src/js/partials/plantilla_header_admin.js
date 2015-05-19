var plantillas = plantillas || {};

plantillas.header = '<a id="logotipoLink" href="#">'
		+ '<figure class="logo">'
		+ '<img src="img/logo_white.png" alt="logo" />'
		+ '</figure>'
		+ '</a>'
		+ '<ul>'
		+ '<li><a id="user-welcome" class="user-welcome" href="#"><i class="demo-icon icon-user">&#xe800;</i> {{{nombre}}} {{{apellidos}}}</a></li>'
		+ '<li><a id="reservasAdmin" href="#"><i class="demo-icon icon-user">&#xe843;</i> Reservas</a></li>'
		+ '<li><a id="usuariosAdmin" href="#"><i class="demo-icon icon-user">&#xe801;</i> Usuarios</a></li>'
		+ '<li><a id="nuevoUsuarioAdmin" href="#"><i class="demo-icon icon-user">&#xe802;</i> Nuevo Usuario</a></li>'
		+ '<li><a id="pistasAdmin" href="#"><i class="demo-icon icon-user">&#xe819;</i> Gestión de Pistas</a></li>'
		+ '<li><a id="estadisticasAdmin" href="#"><i class="demo-icon icon-user">&#xe82e;</i> Estadísticas</a></li>'
		+ '<li><a id="logout" href="#"><i class="demo-icon icon-user">&#xe804;</i> logout</a></li>'
		+ '</ul>';

module.exports = plantillas;