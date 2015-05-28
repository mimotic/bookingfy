var plantillas = plantillas || {};

plantillas.perfil_admin = '<div class="login_users">'
		+ '<h3>Modificar datos del user: <span>{{mail}}</span></h3>'
		+ '<input type="hidden" id="reg_id_usuario" name="reg_id_usuario" value="{{id}}">'
		+ '<i class="demo-icon icon-user in-inputs">&#xe800;</i> <input data-validado="" id="reg_name" type="text" name="" value="{{{nombre}}}" placeholder="Nombre">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe800;</i> <input data-validado="" id="reg_surname" type="text" name="" value="{{{apellidos}}}" placeholder="Apellidos">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe83e;</i> <input data-validado="" id="reg_dni" type="text" name="" value="{{dni}}" placeholder="DNI">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe824;</i> <input data-validado="" id="reg_expediente" type="text" name="" value="{{expediente}}" placeholder="Expediente">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe848;</i> <input data-validado="" id="reg_email" type="text" name="" value="{{mail}}" placeholder="Email">'
		+ '<div class="clear"></div>'
		+ '<i class="demo-icon icon-user in-inputs">&#xe82b;</i> <input data-validado="" id="reg_pass_new" type="password" name="" value="" placeholder="Nueva Password o dejar vacío">'
		+ '<div class="clear"></div>'
		+ '{{#ifCond rol}}'
		+ '<input type="checkbox" id="rolAdmin" name="rolAdmin" checked="checked"> Permisos de Administrador'
		+ '{{else}}'
		+ '<input type="checkbox" id="rolAdmin" name="rolAdmin"> Permisos de Administrador'
		+ '{{/ifCond}}'
		+ '<div class="clear"></div>'
		+ '<a id="doactualizar" href="#" class="rotate"><i class="demo-icon icon-user">&#xe833;</i> Actualizar Datos</a>'
		+ '<div class="clear"></div>'
		+ '<div id="error" class="error"></div><div id="no-error" class="error">{{msg}}</div>'
		+ '</div>';

module.exports = plantillas;
