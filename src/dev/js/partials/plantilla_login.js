var plantillas = plantillas || {};

plantillas.login = '<div class="login_users"><div id="error" class="error"></div><label for="user">Email: </label>'
		+ '<input id="login_user_input" type="email" name="login_user_input" value="" required>'
		+ '<label for="pass">Contraseña: </label>'
		+ '<input id="login_pass_input" type="password" name="login_pass_input" value="" required><div style="float:left;clear:both"></div>'
		+ '<a id="dologin" href="#">Entrar</a>'
		+ '<br><a id="goregistro" href="#"> Crear cuenta</a></div>';

module.exports = plantillas;