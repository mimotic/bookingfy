var plantillas = plantillas || {};

plantillas.usuarios_tabla = '{{#if models}}<table class="mis-reservas-table-view"><thead><tr>'
            +'<th>Nombre</th>'
            +'<th>Apellidos</th>'
            +'<th>Expediente</th>'
            +'<th>DNI</th>'
            +'<th>email</th>'
            +'<th>Rol</th>'
            +'<th>Fecha alta</th>'
            +'</tr></thead>'
        	+'<tbody>'
        	+'{{#each models}}'
        	+'<tr data-cid={{cid}} class="anulado{{anulado}}">'
        	+'<td>{{{nombre}}}</td>'
        	+'<td>{{{apellidos}}}</td>'
            +'<td>{{expediente}}</td>'
            +'<td>{{dni}}</td>'
            +'<td>{{mail}}</td>'
            +'<td>{{rol}}</td>'
            +'<td class="fecha_log_reserva">{{fecha_alta}}</td>'
        	+'</tr>'
        	+'{{/each}}'
    		+'</tbody></table>{{/if models}}';

module.exports = plantillas;