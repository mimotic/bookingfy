var plantillas = plantillas || {};

plantillas.registro_admin = '<div class="login_users">'
		+ '<span class="title-span">Crear Nuevo Usuario</span>'
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
		+ '<input type="checkbox" id="rolAdmin" name="rolAdmin"> ¿Dar permisos de Administrador?'
		+ '<div class="clear"></div>'
		+ '<a id="doregister" href="#">Nuevo Usuario</a>'
		+ '<div class="clear"></div>'
		+ '<div id="error" class="error"></div>'
		+ '<div id="no-error" class="error"></div>'
		+ '</div>';

module.exports = plantillas;