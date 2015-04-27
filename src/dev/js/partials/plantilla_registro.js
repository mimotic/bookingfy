var plantillas = plantillas || {};

plantillas.registro = '<div id="error" class="error"></div>'
		+ '<label for="reg_name">Nombre: </label>'
		+ '<input data-validado="" id="reg_name" type="text" name="" value="">'
		+ '<label for="reg_surname">Apellidos: </label>'
		+ '<input data-validado="" id="reg_surname" type="text" name="" value="">'
		+ '<label for="reg_dni">DNI: </label>'
		+ '<input data-validado="" id="reg_dni" type="text" name="" value="">'
		+ '<label for="reg_expediente">Id. expediente: </label>'
		+ '<input data-validado="" id="reg_expediente" type="text" name="" value="">'
		+ '<label for="reg_email">Email: </label>'
		+ '<input data-validado="" id="reg_email" type="text" name="" value="">'
		+ '<label for="reg_pass">Contraseña: </label>'
		+ '<input data-validado="" id="reg_pass" type="password" name="" value="">'
		+ '<a id="doregister" href="#">Registrarse</a>'
		+ '<br><a id="gologin" href="#">ir a login</a>';

module.exports = plantillas;