var plantillas = plantillas || {};

plantillas._datepicker = '<div id="pasar_fecha" class="calendario" data-fecha={{fecha}}>'
					+ '<div id="placeDatepicker"></div>'
					+ '<input type="hidden" id="datePickerVal" />'
					+ '</div>';

module.exports = plantillas;