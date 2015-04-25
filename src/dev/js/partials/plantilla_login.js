var plantillas = plantillas || {};

plantillas.login = '<label for="user">Email: </label>'
		+ '<input id="login_user_input" type="email" name="login_user_input" value="" required>'
		+ '<label for="pass">Contraseña: </label>'
		+ '<input id="login_pass_input" type="password" name="login_pass_input" value="" required>'
		+ '<a id="dologin" href="#">Entrar</a>'
		+ '<br><a id="goregistro" href="registro"> Crear cuenta</a>';

module.exports = plantillas;