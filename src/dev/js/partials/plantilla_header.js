var plantillas = plantillas || {};

plantillas.header = '<a id="logotipoLink" href="#">'
		+ '<figure class="logo">'
		+ '<img src="img/logo.png" alt="logo" />'
		+ '</figure>'
		+ '</a>'
		+ '<a id="logout" href="#">logout</a>'
		+ '<a id="cabecera_usuario" href="#">{{usuaio.nombre}} {{usuaio.apellidos}}</a>';

module.exports = plantillas;