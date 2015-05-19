var plantillas = plantillas || {};

plantillas.header = '<a id="logotipoLink" href="#">'
		+ '<figure class="logo">'
		+ '<img src="img/logo_white.png" alt="logo" />'
		+ '</figure>'
		+ '</a>'
		+ '<ul>'
		+ '<li><a id="user-welcome" class="user-welcome" href="#"><i class="demo-icon icon-user">&#xe800;</i> {{{nombre}}} {{{apellidos}}}</a></li>'
		+ '<li><a id="logout" href="#"><i class="demo-icon icon-user">&#xe804;</i> logout</a></li>'
		+ '</ul>';

module.exports = plantillas;