var plantillas = plantillas || {};

plantillas.tiempo = '<p class="eltimepop"><i class="demo-icon icon-user ffos">&#xe806;</i> El tiempo, próximos días</p><ul id="list-ul-time">'
			+'{{#each days}}'
			+ '<li>'
			+'<p>{{date}}</p>'
			+'<p>{{temp}} ºC</p>'
			+'<img data-icon src="{{icon}}" alt="" class="weather-card_image">'
			+ '</li>'
			+'{{/each}}'
			+ '</ul>';

module.exports = plantillas;