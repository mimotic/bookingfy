var plantillas = plantillas || {};

plantillas.reservas_tabla = '<table class="mis-reservas-table-view"><thead><tr>'
            +'<th>Deporte</th>'
            +'<th>Pista</th>'
            +'<th>Fecha</th>'
            +'<th>Hora</th>'
            +'<th>pista</th>'
            +'<th>luz</th>'
            +'<th> </th>'
            +'<th>Anular</th>'
            +'</tr></thead>'
        	+'<tbody>'
        	+'{{#each models}}'
        	+'<tr data-cid={{cid}} class="anulado{{anulado}}">'
        	+'<td>{{{nombre_deporte}}}</td>'
        	+'<td>{{{nombre_pista}}}</td>'
            +'<td class="fecha_log_reserva">{{fecha_pista}}</td>'
            +'<td>{{inicio}}</td>'
            +'<td>{{precio_pista}} €</td>'
            +'<td>{{precio_luz}} €</td>'
            +'<td class="luz{{luz}}""><i class="demo-icon icon-user">&#xe84f;</i></td>'
            +'<td data-anulado="{{anulado}}"><span><i class="demo-icon icon-user">&#xe811;</i></span></td>'
        	+'</tr>'
        	+'{{/each}}'
    		+'</tbody></table>';

module.exports = plantillas;