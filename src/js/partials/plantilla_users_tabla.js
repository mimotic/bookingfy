var plantillas = plantillas || {};

plantillas.usuarios_tabla = '<table class="mis-reservas-table-view"><thead><tr>'
            +'<th>Nombre</th>'
            +'<th>Apellidos</th>'
            +'<th>Expediente</th>'
            +'<th>DNI</th>'
            +'<th>Mail</th>'
            +'<th>Tipo</th>'
            +'<th>Fecha</th>'
            +'</tr></thead>'
        	+'<tbody>'
        	+'{{#each models}}'
        	+'<tr data-cid={{cid}} class="rol{{rol}}">'
        	+'<td>{{{nombre}}}</td>'
        	+'<td>{{{apellidos}}}</td>'
            +'<td>{{expediente}}</td>'
            +'<td>{{dni}}</td>'
            +'<td>{{mail}}</td>'
            +'<td data-rol="{{rol}}"><span><i class="demo-icon icon-user">&#xe845;</i><i class="demo-icon icon-user">&#xe81b;</i></span></td>'
            +'<td class="fecha_log_reserva">{{fecha_alta}}</td>'
        	+'</tr>'
        	+'{{/each}}'
    		+'</tbody></table>';

module.exports = plantillas;