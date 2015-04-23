var plantillas = plantillas || {};

plantillas.registro = '<label for="name">Nombre: </label>'
		+ '<input id="name" type="text" name="" value="">'
		+ '<label for="surname">Apellidos: </label>'
		+ '<input id="surname" type="text" name="" value="">'
		+ '<label for="dni">DNI: </label>'
		+ '<input id="dni" type="text" name="" value="">'
		+ '<label for="expediente">Id. expediente: </label>'
		+ '<input id="expediente" type="text" name="" value="">'
		+ '<label for="email">Email: </label>'
		+ '<input id="email" type="text" name="" value="">'
		+ '<label for="pass">Contraseña: </label>'
		+ '<input id="pass" type="password" name="" value="">'
		+ '<a href="#">Registrarse</a>';

module.exports = plantillas;