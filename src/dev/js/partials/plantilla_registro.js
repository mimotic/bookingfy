var plantillas = plantillas || {};

plantillas.registro = '<div class="login_users">'
		+ '<span class="title-span">Crear Nuevo Usuario<span>'
		+ '<input data-validado="" id="reg_name" type="text" name="" value="" placeholder="Nombre">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_surname" type="text" name="" value="" placeholder="Apellidos">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_dni" type="text" name="" value="" placeholder="DNI">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_expediente" type="text" name="" value="" placeholder="Expediente">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_email" type="text" name="" value="" placeholder="Email">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_pass" type="password" name="" value="" placeholder="Password">'
		+ '<div class="clear"></div>'
		+ '<a id="doregister" href="#">Registrarse</a>'
		+ '<div class="clear"></div>'
		+ '<span>¿Ya está registrado? <a id="gologin" href="#">loguearse</a><span>'
		+ '<div id="error" class="error"></div>'
		+ '</div>';

module.exports = plantillas;