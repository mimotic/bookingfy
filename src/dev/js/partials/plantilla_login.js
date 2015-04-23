var plantillas = plantillas || {};

plantillas.login = '<label for="user">Email: </label>'
		+ '<input id="login_user_input" type="text" name="" value="">'
		+ '<label for="pass">Contraseña: </label>'
		+ '<input id="login_pass_input" type="password" name="" value="">'
		+ '<a id="dologin" href="#">Entrar</a>'
		+ '<br><a id="doregistro" href="registro"> Crear cuenta</a>';

module.exports = plantillas;