var plantillas = plantillas || {};

plantillas.registro = '<label for="reg_name">Nombre: </label>'
		+ '<input id="reg_name" type="text" name="" value="">'
		+ '<label for="reg_surname">Apellidos: </label>'
		+ '<input id="reg_surname" type="text" name="" value="">'
		+ '<label for="reg_dni">DNI: </label>'
		+ '<input id="reg_dni" type="text" name="" value="">'
		+ '<label for="reg_expediente">Id. expediente: </label>'
		+ '<input id="reg_expediente" type="text" name="" value="">'
		+ '<label for="reg_email">Email: </label>'
		+ '<input id="reg_email" type="text" name="" value="">'
		+ '<label for="reg_pass">Contraseña: </label>'
		+ '<input id="reg_pass" type="password" name="" value="">'
		+ '<a id="doregister" href="#">Registrarse</a>';

module.exports = plantillas;