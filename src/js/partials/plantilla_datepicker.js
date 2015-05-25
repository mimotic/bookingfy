var plantillas = plantillas || {};

plantillas._datepicker = '<div id="pasar_fecha" class="calendario" data-fecha={{fecha}}>'
					+ '<input id="placeDatepicker" class="demo-icon icon-user" placeholder="&#xe813; {{fechaEs}}" />'
					+ '<input type="hidden" id="datePickerVal" />'
					+ '</div>';

module.exports = plantillas;