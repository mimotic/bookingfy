var plantillas = plantillas || {};

plantillas.perfil = '<div class="login_users">'
		+ '<span class="title-span">Datos de Usuario<span>'
		+ '<input type="hidden" id="reg_id_usuario" name="reg_id_usuario" value="{{id_usuario}}">'
		+ '<i class="demo-icon icon-user">&#xe800;</i> <input data-validado="" id="reg_name" type="text" name="" value="{{nombre}}" placeholder="Nombre">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user">&#xe800;</i> <input data-validado="" id="reg_surname" type="text" name="" value="{{apellidos}}" placeholder="Apellidos">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user">&#xe83e;</i> <input data-validado="" id="reg_dni" type="text" name="" value="{{dni}}" placeholder="DNI">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user">&#xe824;</i> <input data-validado="" id="reg_expediente" type="text" name="" value="{{expediente}}" placeholder="Expediente">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user">&#xe848;</i> <input data-validado="" id="reg_email" type="text" name="" value="{{mail}}" placeholder="Email">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user">&#xe82b;</i> <input data-validado="" id="reg_pass_new" type="password" name="" value="" placeholder="Nueva Password o dejar vacío">'
		+ '<div class="clear"></div>'
		+ '<a id="doactualizar" href="#" class="rotate"><i class="demo-icon icon-user">&#xe833;</i> Actualizar Datos</a>'
		+ '<div class="clear"></div>'
		+ '<div id="error" class="error"></div><div id="no-error" class="error">{{msg}}</div>'
		+ '</div>'
		+ '<div id="actualizarUsuarioModal" class="modal">'
		+ '<i class="demo-icon icon-user">&#xe82b;</i> <input data-validado="" id="reg_pass_old" type="password" name="" value="{{password}}" placeholder="Introduzca su contrase actual">'
		+ '<a id="actualizarUserData" href="#" class="rotate"><i class="demo-icon icon-user">&#xe833;</i> Actualizar Datos</a>'
		+ '</div>';

module.exports = plantillas;