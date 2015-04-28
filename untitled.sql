<br />
<b>Warning</b>:  PDOStatement::execute(): SQLSTATE[HY093]: Invalid parameter number: number of bound variables does not match number of tokens in <b>/Users/imike/www/bookingfy/src/dev/api/Api.php</b> on line <b>284</b><br />
<br />
<b>Warning</b>:  Cannot modify header information - headers already sent by (output started at /Users/imike/www/bookingfy/src/dev/api/Api.php:284) in <b>/Users/imike/www/bookingfy/src/dev/api/Rest.php</b> on line <b>16</b><br />
<br />
<b>Warning</b>:  Cannot modify header information - headers already sent by (output started at /Users/imike/www/bookingfy/src/dev/api/Api.php:284) in <b>/Users/imike/www/bookingfy/src/dev/api/Rest.php</b> on line <b>17</b><br />
[{"id":"1","nombre":"nombreEjemploPista","id_deporte":"1","precio_pista":"10","precio_luz":"6","horas":[]}]





INSERT INTO `reservas`( `id_usuario`, `id_pista`, `id_hora`, `fecha_pista`, `luz`, `fecha_log`, `anulado`) VALUES (1,2,3,'2015-05-12',1,NOW(),1)

obtener pistas

SELECT * FROM pistas WHERE id_deporte = 2

SELECT * FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista = 2


SELECT * FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista IN (SELECT id FROM pistas WHERE id_deporte = 2)




	SELECT * FROM reservas AS r
	WHERE r.id_pista
	IN (SELECT id FROM pistas WHERE id_deporte = 2)
	AND r.fecha_pista = '2015-05-12' AND r.anulado = 0




SELECT * FROM
(SELECT * FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista = 2 AND r.anulado = 0 AND r.fecha_pista = '2015-05-12'
UNION
SELECT id,inicio,null,null,null,null,null,null,null,null FROM horarios AS h)
GROUP BY inicio





SELECT * FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista = 1 AND r.anulado = 0



UNION
SELECT * FROM horarios AS h
RIGHT JOIN reservas AS r
ON h.id = r.id_hora
AND r.id_pista = 1







SELECT * FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
UNION
SELECT * FROM horarios AS h
RIGHT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista IN (SELECT id FROM pistas WHERE id_deporte = 2)


SELECT id, inicio,null,null,null,null,null,null,null,null,null FROM horarios AS h
UNION SELECT null, null, id as id_reserva,id_usuario ,id_pista,id_hora,fecha_pista,luz,fecha_log,anulado
FROM reservas AS r
WHERE r.id_pista IN (SELECT id FROM pistas WHERE id_deporte = 2)



RESERVAS


r.id_usuario, r.id_pista, r.id_hora, r.fecha_pista, r.luz, r.fecha_log, r.anulado






SELECT * FROM
(SELECT h.id,h.inicio,r.id_usuario, r.id_pista, r.id_hora, r.fecha_pista, r.luz, r.fecha_log, r.anulado
FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista = IN (SELECT id FROM pistas WHERE id_deporte = 2) AND r.anulado = 0 AND r.fecha_pista = '2015-05-12'
UNION
SELECT id,inicio,null,null,null,null,null,null,null FROM horarios) as kk GROUP BY id



SELECT h.id,h.inicio,r.id_usuario, r.id_pista, r.id_hora, r.fecha_pista, r.luz, r.fecha_log, r.anulado
FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista = 2 AND r.anulado = 0 AND r.fecha_pista = '2015-05-12'
UNION
SELECT id,inicio,null,null,null,null,null,null,null FROM horarios







SELECT * FROM
(SELECT h.id,h.inicio,r.id_usuario, r.id_pista, r.id_hora, r.fecha_pista, r.luz, r.fecha_log, r.anulado
FROM horarios AS h
LEFT JOIN reservas AS r
ON h.id = r.id_hora
WHERE r.id_pista = 2 AND r.anulado = 0 AND r.fecha_pista = '2015-05-12'
UNION
SELECT id,inicio,null,null,null,null,null,null,null FROM horarios) as kk GROUP BY id




