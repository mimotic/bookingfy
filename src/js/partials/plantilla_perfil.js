var plantillas = plantillas || {};

plantillas.perfil = '<div class="login_users">'
		+ '<span class="title-span">Datos de Usuario<span>'
		+ '<input data-validado="" id="reg_name" type="text" name="" value="{{nombre}}" placeholder="Nombre">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_surname" type="text" name="" value="{{apellidos}}" placeholder="Apellidos">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_dni" type="text" name="" value="{{dni}}" placeholder="DNI">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_expediente" type="text" name="" value="{{expediente}}" placeholder="Expediente">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_email" type="text" name="" value="{{mail}}" placeholder="Email">'
		+ '<div class="clear"></div>'
		+ '<input data-validado="" id="reg_pass" type="password" name="" value="{{password}}" placeholder="Password">'
		+ '<div class="clear"></div>'
		+ '<a id="doregister" href="#">Modificar Datos</a>'
		+ '<div class="clear"></div>'
		+ '<div id="error" class="error"></div>'
		+ '</div>';

module.exports = plantillas;