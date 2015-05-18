var plantillas = plantillas || {};

plantillas.login = '<div class="login_users">'
		+ '<span class="title-span">Alquiler de Pistas Deportivas</span>'
		+ '<input id="login_user_input" type="email" name="login_user_input" value="{{mail}}" placeholder="Email" required>'
		+ '<div class="clear"></div>'
		+ '<input id="login_pass_input" type="password" name="login_pass_input" value="" placeholder="Password" required>'
		+ '<div style="float:left;clear:both"></div>'
		+ '<div class="clear"></div>'
		+ '<a id="dologin" href="#">Login</a><div class="clear"></div>'
		+ '<span>¿No tiene una cuenta? <a id="goregistro" href="#">regístrese</a><span>'
		+ '<div id="error" class="error">{{msg}}</div>'
		+ '<div id="no-error" class="error">{{msg}}</div>'
		+ '</div>';

module.exports = plantillas;