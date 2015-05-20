var plantillas = plantillas || {};

plantillas.header = '<a id="logotipoLink" href="#">'
		+ '<figure class="logo">'
		+ '<img src="img/logo_white.png" alt="logo" />'
		+ '</figure>'
		+ '</a>'
		//+ '<a id="user-welcome-2" href="#">reservas</a>'
		+ '<ul>'
		+ '<li></li>'
		+ '<li id="listItemWelcome"><a id="doNothing" class="user-welcome" href="#">{{{nombre}}} {{{apellidos}}}</a><a id="logout" href="#"><i class="demo-icon icon-user">&#xe804;</i></a></li>'
		+ '</ul>';

module.exports = plantillas;