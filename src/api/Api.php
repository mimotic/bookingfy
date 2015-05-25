<?php

require_once("Rest.php");


class Api extends Rest {

   // ************************************ \\
   //              CONEXIÓN                \\
   // ************************************ \\

 const servidor = "@@servidor";
 const usuario_db = "@@usuario_db";
 const pwd_db = "@@pwd_db";
 const nombre_db = "@@nombre_db";
 private $_conn = NULL;
 private $_metodo;
 private $_argumentos;
 public function __construct() {
   parent::__construct();
   $this->conectarDB();
 }
 private function conectarDB() {
   $dsn = 'mysql:dbname=' . self::nombre_db . ';host=' . self::servidor;
   try {
     $this->_conn = new PDO($dsn, self::usuario_db, self::pwd_db);
   } catch (PDOException $e) {
     echo 'Falló la conexión: ' . $e->getMessage();
   }
 }

   // ************************************ \\
   //              ERRORES                 \\
   // ************************************ \\


 private function devolverError($id) {
   $errores = array(
       array('estado' => "error", "msg" => "petición no encontrada"), // 0
       array('estado' => "error", "msg" => "petición no aceptada"), // 1
       array('estado' => "error", "msg" => "petición sin contenido"), // 2
       array('estado' => "error", "msg" => "email o password incorrectos"), // 3
       array('estado' => "error", "msg" => "error borrando usuario"), // 4
       array('estado' => "error", "msg" => "error actualizando datos de usuario"), // 5
       array('estado' => "error", "msg" => "error buscando usuario por email"), // 6
       array('estado' => "error", "msg" => "error creando usuario"), // 7
       array('estado' => "error", "msg" => "usuario ya existe"), // 8
       array('estado' => "error", "msg" => "error anulando reserva"), // 9
       array('estado' => "error", "msg" => "petición no aceptada, faltan valores o son incorrectos"), // 10
       array('estado' => "error", "msg" => "Ya existe otro usuario con mismo email, dni o expediente. Si considera que alguien ha robado su identidad por favor, contacte con soporte de la universidad."), // 11
       array('estado' => "error", "msg" => "No se han modificado datos, son iguales a los encontrados en la base de datos"), // 12
       array('estado' => "error", "msg" => "Password incorrecta"), // 13
       array('estado' => "error", "msg" => "Error cargando estadisticas") // 14
       );
return $errores[$id];
}

   // ************************************ \\
   //           FILTRAR LLAMADA            \\
   // ************************************ \\

public function procesarLLamada() {
 if (isset($_REQUEST['url'])) {
       //si por ejemplo pasamos explode('/','////controller///method////args///') el resultado es un array con elem vacios;
       //Array ( [0] => [1] => [2] => [3] => [4] => controller [5] => [6] => [7] => method [8] => [9] => [10] => [11] => args [12] => [13] => [14] => )
   $url = explode('/', trim($_REQUEST['url']));
       //con array_filter() filtramos elementos de un array pasando función callback, que es opcional.
       //si no le pasamos función callback, los elementos false o vacios del array serán borrados
       //por lo tanto la entre la anterior función (explode) y esta eliminamos los '/' sobrantes de la URL
   $url = array_filter($url);
   $this->_metodo = strtolower(array_shift($url));
   $this->_argumentos = $url;
   $func = $this->_metodo;
   if ((int) method_exists($this, $func) > 0) {
     if (count($this->_argumentos) > 0) {
       call_user_func_array(array($this, $this->_metodo), $this->_argumentos);
         } else {//si no lo llamamos sin argumentos, al metodo del controlador
           call_user_func(array($this, $this->_metodo));
         }
       }
       else
         $this->mostrarRespuesta($this->convertirJson($this->devolverError(0)), 404);
     }
     $this->mostrarRespuesta($this->convertirJson($this->devolverError(0)), 404);
   }
   private function convertirJson($data) {
     return json_encode($data);
   }

   // ************************************ \\
   //              ENDPOINTS               \\
   // ************************************ \\


   // NUEVO USUARIO [POST]
   // curl -d "nombre=nuevoUsuario&apellidos=Apeliidos&expediente=123456789&dni=123456h&mail=user@user.com&password=asd123" http://bookingfy.dev/api/nuevoUsuario
   private function nuevoUsuario() {
     if ($_SERVER['REQUEST_METHOD'] != "POST") {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
     }
     if (isset($this->datosPeticion['nombre'], $this->datosPeticion['apellidos'], $this->datosPeticion['expediente'], $this->datosPeticion['dni'], $this->datosPeticion['mail'], $this->datosPeticion['password'] )) {

       $nombre = $this->datosPeticion['nombre'];
       $apellidos = $this->datosPeticion['apellidos'];
       $expediente = $this->datosPeticion['expediente'];
       $dni = $this->datosPeticion['dni'];
       $password = $this->datosPeticion['password'];
       $mail = $this->datosPeticion['mail'];

       if (!$this->existeUsuario($mail)) {
         $query = $this->_conn->prepare("INSERT into usuarios (nombre,apellidos,expediente,dni,mail,password) VALUES (:nombre,:apellidos,:expediente,:dni,:mail,:password)");
         $query->bindValue(":nombre", $nombre);
         $query->bindValue(":apellidos", $apellidos);
         $query->bindValue(":expediente", $expediente);
         $query->bindValue(":dni", $dni);
         $query->bindValue(":mail", $mail);
         $query->bindValue(":password", sha1($password));
         $query->execute();
         if ($query->rowCount() == 1) {
           $id = $this->_conn->lastInsertId();
           $respuesta['estado'] = 'correcto';
           $respuesta['msg'] = 'usuario creado correctamente';
           $respuesta['usuario']['id'] = $id;
           $respuesta['usuario']['nombre'] = $nombre;
           $respuesta['usuario']['mail'] = $mail;
           $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
         }
         else
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 200);
       }
       else
         $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 200);
     } else {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
     }
   }

   // NUEVO USUARIO ADMINISTRADOR [POST]
   // curl -d "nombre=ignacio&apellidos=rodriguez&expediente=1234as56&dni=12344256h&mail=ignacio@algo.com&password=asd123" http://bookingfy.dev/api/nuevoAdmin
   private function nuevoAdmin() {
     if ($_SERVER['REQUEST_METHOD'] != "POST") {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
     }
     if (isset($this->datosPeticion['nombre'], $this->datosPeticion['apellidos'], $this->datosPeticion['expediente'], $this->datosPeticion['dni'], $this->datosPeticion['mail'], $this->datosPeticion['password'] )) {

       $nombre = $this->datosPeticion['nombre'];
       $apellidos = $this->datosPeticion['apellidos'];
       $expediente = $this->datosPeticion['expediente'];
       $dni = $this->datosPeticion['dni'];
       $password = $this->datosPeticion['password'];
       $mail = $this->datosPeticion['mail'];
       $rol = 1;

       if (!$this->existeUsuario($mail) && !$this->existeUsuario($dni) && !$this->existeUsuario($expediente)) {
         $query = $this->_conn->prepare("INSERT into usuarios (nombre,apellidos,expediente,dni,mail,password,rol) VALUES (:nombre,:apellidos,:expediente,:dni,:mail,:password,:rol)");
         $query->bindValue(":nombre", $nombre);
         $query->bindValue(":apellidos", $apellidos);
         $query->bindValue(":expediente", $expediente);
         $query->bindValue(":dni", $dni);
         $query->bindValue(":mail", $mail);
         $query->bindValue(":password", sha1($password));
         $query->bindValue(":rol", $rol);
         $query->execute();
         if ($query->rowCount() == 1) {
           $id = $this->_conn->lastInsertId();
           $respuesta['estado'] = 'correcto';
           $respuesta['msg'] = 'usuario administrador creado correctamente';
           $respuesta['usuario']['id'] = $id;
           $respuesta['usuario']['nombre'] = $nombre;
           $respuesta['usuario']['mail'] = $mail;
           $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
         }
         else
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(12)), 200);
       }
       else
         $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 400);
     } else {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
     }
   }

   // AÑADIR HORA [POST]
   // curl -d "inicio=09:00" http://bookingfy.dev/api/nuevaHora
   private function nuevaHora() {
     if ($_SERVER['REQUEST_METHOD'] != "POST") {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
     }
     if (isset( $this->datosPeticion['inicio'] )) {

       $inicio = $this->datosPeticion['inicio'];

       if (!$this->existeUsuario($mail)) {
         $query = $this->_conn->prepare("INSERT into horarios (inicio) VALUES (:inicio)");
         $query->bindValue(":inicio", $inicio);
         $query->execute();
         if ($query->rowCount() == 1) {
           $id = $this->_conn->lastInsertId();
           $respuesta['estado'] = 'correcto';
           $respuesta['msg'] = 'Horario creado correctamente';
           $respuesta['horas']['id'] = $id;
           $respuesta['horas']['inicio'] = $inicio;
           $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
         }
         else
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
       }
       else
         $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 400);
     } else {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
     }
   }

   // AÑADIR DEPORTE [POST]
   // curl -d "nombre=Hockey" http://bookingfy.dev/api/nuevoDeporte
   private function nuevoDeporte() {
     if ($_SERVER['REQUEST_METHOD'] != "POST") {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
     }
     if (isset( $this->datosPeticion['nombre'] )) {

       $nombre = $this->datosPeticion['nombre'];

       if (!$this->existeUsuario($mail)) {
         $query = $this->_conn->prepare("INSERT into deporte (nombre) VALUES (:nombre)");
         $query->bindValue(":nombre", $nombre);
         $query->execute();
         if ($query->rowCount() == 1) {
           $id = $this->_conn->lastInsertId();
           $respuesta['estado'] = 'correcto';
           $respuesta['msg'] = 'Deporte creado correctamente';
           $respuesta['horas']['id'] = $id;
           $respuesta['horas']['nombre'] = $nombre;
           $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
         }
         else
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
       }
       else
         $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 400);
     } else {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
     }
   }


   // LISTAR DEPORTES [GET]
   // curl http://bookingfy.dev/api/deportes
   private function deportes() {
     if ($_SERVER['REQUEST_METHOD'] != "GET") {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
     }
     $query = $this->_conn->query("SELECT d.id, d.nombre FROM deporte AS d INNER JOIN pistas AS p ON p.id_deporte = d.id GROUP BY d.id");
     $filas = $query->fetchAll(PDO::FETCH_ASSOC);
     $num = count($filas);
     if ($num > 0) {
       // $respuesta['estado'] = 'correcto';
       // $respuesta['deportes'] = $filas;
       $respuesta = $filas;
       $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
     }
     $this->mostrarRespuesta($this->devolverError(2), 400);
   }

   // [GET] LISTAR PISTAS DE UN DEPORTE Y CON RESEVAS DE UN DÍA [GET]
   // curl http://bookingfy.dev/api/pistas
   private function pistas() {
     if ($_SERVER['REQUEST_METHOD'] != "POST") {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
     }
     if (isset( $this->datosPeticion['id'], $this->datosPeticion['fecha_pista']  )) {

      $id = $this->datosPeticion['id'];
      $fecha_pista = $this->datosPeticion['fecha_pista'];

      $query = $this->_conn->prepare("SELECT * FROM pistas WHERE id_deporte = :id");
      $query->bindValue(":id", $id);
      $query->execute();
      $filas = $query->fetchAll(PDO::FETCH_ASSOC);
      $num = count($filas);
      if ($num > 0) {
        for ($i=0; $i < $num; $i++) {
         $id_pista = $filas[$i]['id'];
               //echo $fecha_pista;
         $query2 = $this->_conn->prepare("SELECT * FROM (SELECT h.id,h.inicio,r.id AS id_reserva, r.id_usuario, r.id_pista, r.id_hora, r.fecha_pista, r.luz, r.fecha_log FROM horarios AS h LEFT JOIN reservas AS r ON h.id = r.id_hora WHERE r.id_pista = :id_pista AND r.anulado = 0 AND r.fecha_pista = :date_pista UNION SELECT id,inicio,null,null,null,null,null,null,null FROM horarios) as kk GROUP BY id");
         $query2->bindValue(":id_pista", $id_pista);
         $query2->bindValue(":date_pista", $fecha_pista);
         $query2->execute();
         $filos = $query2->fetchAll(PDO::FETCH_ASSOC);

         $filas[$i]['horas'] = $filos;
       }

       $respuesta = $filas;
       $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
     } else $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
   } else {
     $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
   }
 }

   // RESERVA [POST]
   // curl -d "inicio=09:00" http://bookingfy.dev/api/reserva
 private function reserva() {
  if ($_SERVER['REQUEST_METHOD'] != "POST") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 if (isset( $this->datosPeticion['id_usuario'],$this->datosPeticion['id_pista'],$this->datosPeticion['id_hora'], $this->datosPeticion['fecha_pista'], $this->datosPeticion['luz'] )) {

  $id_usuario = $this->datosPeticion['id_usuario'];
  $id_pista = $this->datosPeticion['id_pista'];
  $id_hora = $this->datosPeticion['id_hora'];
  $fecha_pista = $this->datosPeticion['fecha_pista'];
  $luz = $this->datosPeticion['luz'];
  $anulado = $this->datosPeticion['anulado'];

  $query = $this->_conn->prepare("INSERT INTO reservas( id_usuario, id_pista, id_hora, fecha_pista, luz, fecha_log, anulado) VALUES (:id_usuario,:id_pista,:id_hora,:fecha_pista,:luz,NOW(),0)");

  $query->bindValue(":id_usuario", $id_usuario);
  $query->bindValue(":id_pista", $id_pista);
  $query->bindValue(":id_hora", $id_hora);
  $query->bindValue(":fecha_pista", $fecha_pista);
  $query->bindValue(":luz", $luz);
  $query->execute();

  if ($query->rowCount() == 1) {
   $respuesta['estado'] = 'correcto';
   $respuesta['msg'] = 'Su pista ha sido reservada, ¡que gane el mejor!';
   $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
 } else $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);

} else $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);

}

   // ANULAR RESERVA [PUT]
private function anularReserva() {
 if ($_SERVER['REQUEST_METHOD'] != "PUT") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 if (isset($this->datosPeticion['id_reserva'])) {
   $id = $this->datosPeticion['id_reserva'];
   $id = (int)$id;
   $anulado = 1;
   if ($id > 0) {
     $query = $this->_conn->prepare("update reservas set anulado=:anulado WHERE id=:id");
     $query->bindValue(":id", $id);
     $query->bindValue(":anulado", $anulado);
     $query->execute();
     $filasActualizadas = $query->rowCount();
     if ($filasActualizadas == 1) {
       $resp = array('estado' => "correcto", "msg" => "Su reserva ha sido anulada correctamente.");
       $this->mostrarRespuesta($this->convertirJson($resp), 200);
     } else {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(9)), 200);
     }
   }
 }
 $this->mostrarRespuesta($this->convertirJson($this->devolverError(10)), 400);
}

   // LISTAR USUARIOS [GET]
   // curl http://bookingfy.dev/api/usuarios
private function usuarios() {
 if ($_SERVER['REQUEST_METHOD'] != "GET") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 $query = $this->_conn->query("SELECT id, nombre, apellidos, expediente,dni, mail, rol, fecha_alta FROM usuarios");
 $filas = $query->fetchAll(PDO::FETCH_ASSOC);
 $num = count($filas);
 if ($num > 0) {
   // $respuesta['estado'] = 'correcto';
   // $respuesta['usuarios'] = $filas;
   $respuesta = $filas;
   $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
 }
 $this->mostrarRespuesta($this->devolverError(2), 204);
}

   // LOGIN [POST]
   // curl -d "mail=ignacio@algo.com&password=2891baceeef1652ee698294da0e71ba78a2a4064" http://bookingfy.dev/api/login
   // password sha1 from front
private function login() {
 if ($_SERVER['REQUEST_METHOD'] != "POST") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 if (isset($this->datosPeticion['mail'], $this->datosPeticion['password'])) {
    //el constructor del padre ya se encarga de sanear los datos de entrada
   $mail = $this->datosPeticion['mail'];
   $password = $this->datosPeticion['password'];
   if (!empty($mail) and !empty($password)) {
     if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
           //consulta preparada ya hace mysqli_real_escape()
       $query = $this->_conn->prepare("SELECT id, nombre, apellidos, mail, expediente, dni, rol FROM usuarios WHERE
         mail=:mail AND password=:password ");
       $query->bindValue(":mail", $mail);
       $query->bindValue(":password", $password);
       $query->execute();
       if ($fila = $query->fetch(PDO::FETCH_ASSOC)) {
         $respuesta['estado'] = 'correcto';
         $respuesta['msg'] = 'datos pertenecen a usuario registrado';
         $respuesta['usuario']['id_usuario'] = $fila['id'];
         $respuesta['usuario']['nombre'] = $fila['nombre'];
         $respuesta['usuario']['apellidos'] = $fila['apellidos'];
         $respuesta['usuario']['mail'] = $fila['mail'];
         $respuesta['usuario']['rol'] = $fila['rol'];
         $respuesta['usuario']['dni'] = $fila['dni'];
         $respuesta['usuario']['expediente'] = $fila['expediente'];

         $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
       }
     }
   }
 }
 $this->mostrarRespuesta($this->convertirJson($this->devolverError(3)), 200);
     // $this->mostrarRespuesta($this->convertirJson($this->datosPeticion['mail']), 200);
}



    // NUEVO USUARIO [POST]
   // curl -d "nombre=nuevoUsuario&apellidos=Apeliidos&expediente=123456789&dni=123456h&mail=user@user.com&password=asd123" http://bookingfy.dev/api/nuevoUsuario
private function reservasUsuario() {
 if ($_SERVER['REQUEST_METHOD'] != "POST") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 if (isset($this->datosPeticion['id_usuario'])) {

   $id_usuario = $this->datosPeticion['id_usuario'];

   $query = $this->_conn->prepare("SELECT r.id,r.fecha_pista,r.luz,r.anulado,p.nombre as nombre_pista,p.precio_pista,p.precio_luz,d.nombre as nombre_deporte,h.inicio FROM reservas AS r LEFT JOIN pistas AS p ON r.id_pista = p.id LEFT JOIN deporte AS d ON p.id_deporte = d.id LEFT JOIN horarios AS h ON r.id_hora = h.id WHERE id_usuario=:id_usuario ORDER BY r.fecha_pista DESC, h.inicio DESC");
   $query->bindValue(":id_usuario", $id_usuario);
   $query->execute();
   $filas = $query->fetchAll(PDO::FETCH_ASSOC);
   $num = count($filas);
   if ($num > 0) {
    $respuesta = $filas;
    $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
  }
  else
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 200);
} else {
 $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
}
}

private function actualizarUsuario() {

 if ($_SERVER['REQUEST_METHOD'] != "PUT") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }


 if (isset($this->datosPeticion['id_usuario'])) {


   if (isset($this->datosPeticion['password'])) $isPasword = true;
   else $isPasword = false;

   $nombre = $this->datosPeticion['nombre'];
   $apellidos = $this->datosPeticion['apellidos'];
   $expediente = $this->datosPeticion['expediente'];
   $dni = $this->datosPeticion['dni'];
   if($isPasword) $password = $this->datosPeticion['password'];
   $current_password = $this->datosPeticion['current_password'];
   $mail = $this->datosPeticion['mail'];
   $id_usuario = $this->datosPeticion['id_usuario'];
   $id_usuario = (int)$id_usuario;

   $query = $this->_conn->prepare("SELECT mail FROM usuarios WHERE id=:id_usuario AND password=:current_password");
   $query->bindValue(":current_password", $current_password);
   $query->bindValue(":id_usuario", $id_usuario);
   $query->execute();
   $fila = $query->fetch(PDO::FETCH_ASSOC);

   if($fila !== false){

    $query = $this->_conn->prepare("SELECT mail, expediente, dni FROM usuarios WHERE id != :id_usuario AND (mail=:mail OR expediente=:expediente OR dni=:dni )");

    $query->bindValue(":mail", $mail);
    $query->bindValue(":dni", $dni);
    $query->bindValue(":expediente", $expediente);
    $query->bindValue(":id_usuario", $id_usuario);

    $query->execute();
    $fila = $query->fetch(PDO::FETCH_ASSOC);

    if($fila === false){

      if (!empty($nombre) and $id_usuario > 0) {

       if($isPasword) $queryPassword = ",password=:password";
         $query = $this->_conn->prepare("UPDATE usuarios SET nombre=:nombre,apellidos=:apellidos,expediente=:expediente,dni=:dni,mail=:mail" . $queryPassword . " WHERE id =:id_usuario");
         $query->bindValue(":nombre", $nombre);
         $query->bindValue(":id_usuario", $id_usuario);
         $query->bindValue(":nombre", $nombre);
         $query->bindValue(":apellidos", $apellidos);
         $query->bindValue(":expediente", $expediente);
         $query->bindValue(":dni", $dni);
         $query->bindValue(":mail", $mail);
         if($isPasword) $query->bindValue(":password", $password);
         $query->execute();
         $filasActualizadas = $query->rowCount();
         if ($filasActualizadas > 0) {
           $resp = array('estado' => "correcto", "msg" => "Datos de usuario actualizados.");
           $this->mostrarRespuesta($this->convertirJson($resp), 200);
         } else {
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(12)), 200);
         }
     }
   }else{
    $this->mostrarRespuesta($this->convertirJson($this->devolverError(11)), 200);
  }
}else{
  $this->mostrarRespuesta($this->convertirJson($this->devolverError(13)), 200);
}
}
$this->mostrarRespuesta($this->convertirJson($this->devolverError(5)), 200);
}


private function estadisticas() {
 if ($_SERVER['REQUEST_METHOD'] != "GET") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }

 // reservas por fecha
 $query = $this->_conn->query("SELECT count(id) AS total, fecha_pista AS fecha FROM reservas WHERE anulado=0 GROUP BY fecha_pista");
 $filasReservas = $query->fetchAll(PDO::FETCH_ASSOC);
 $num = count($filasReservas);
 if ($num > 0) {

  // usuarios por fecha
  $query2 = $this->_conn->query("SELECT count(id) AS total, fecha_alta AS fecha FROM usuarios WHERE rol=0 GROUP BY fecha_alta");
  $filasUsuarios = $query2->fetchAll(PDO::FETCH_ASSOC);
  $num = count($filasUsuarios);

  if ($num > 0) {

    // usuarios por fecha
    $query3 = $this->_conn->query("SELECT count(id) AS total, fecha_alta AS fecha FROM usuarios WHERE rol=1 GROUP BY fecha_alta");
    $filasAdmins = $query3->fetchAll(PDO::FETCH_ASSOC);
    $num = count($filasAdmins);

    if ($num > 0) {

      // reservas por deportes
      $query4 = $this->_conn->query("SELECT count(r.id) AS total, d.nombre, r.fecha_pista AS fecha, r.anulado FROM reservas AS r LEFT JOIN pistas AS p ON r.id_pista = p.id LEFT JOIN deporte AS d ON p.id_deporte = d.id WHERE r.anulado=0 GROUP BY r.fecha_pista");
      $filasReservasDeportes = $query4->fetchAll(PDO::FETCH_ASSOC);
      $num = count($filasReservasDeportes);

      if ($num > 0) {

        $respuesta['estado'] = 'correcto';
        $respuesta['reservas'] = $filasReservas;
        $respuesta['usuarios'] = $filasUsuarios;
        $respuesta['administradores'] = $filasAdmins;
        $respuesta['reservasDeportes'] = $filasReservasDeportes;

        $this->mostrarRespuesta($this->convertirJson($respuesta), 200);

      }else $this->mostrarRespuesta($this->devolverError(14), 200);
    }else $this->mostrarRespuesta($this->devolverError(14), 200);
  }else $this->mostrarRespuesta($this->devolverError(14), 200);
 }else $this->mostrarRespuesta($this->devolverError(14), 200);
}












private function actualizarNombre($idUsuario) {
 if ($_SERVER['REQUEST_METHOD'] != "PUT") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
     //echo $idUsuario . "<br/>";
 if (isset($this->datosPeticion['nombre'])) {
   $nombre = $this->datosPeticion['nombre'];
   $id = (int) $idUsuario;
   if (!empty($nombre) and $id > 0) {
     $query = $this->_conn->prepare("update usuario set nombre=:nombre WHERE id =:id");
     $query->bindValue(":nombre", $nombre);
     $query->bindValue(":id", $id);
     $query->execute();
     $filasActualizadas = $query->rowCount();
     if ($filasActualizadas == 1) {
       $resp = array('estado' => "correcto", "msg" => "nombre de usuario actualizado correctamente.");
       $this->mostrarRespuesta($this->convertirJson($resp), 200);
     } else {
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(5)), 400);
     }
   }
 }
 $this->mostrarRespuesta($this->convertirJson($this->devolverError(5)), 400);
}

private function borrarUsuario($idUsuario) {
 if ($_SERVER['REQUEST_METHOD'] != "DELETE") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 $id = (int) $idUsuario;
 if ($id >= 0) {
   $query = $this->_conn->prepare("delete from usuarios WHERE id =:id");
   $query->bindValue(":id", $id);
   $query->execute();
       //rowcount para insert, delete. update
   $filasBorradas = $query->rowCount();
   if ($filasBorradas == 1) {
     $resp = array('estado' => "correcto", "msg" => "usuario borrado correctamente.");
     $this->mostrarRespuesta($this->convertirJson($resp), 200);
   } else {
     $this->mostrarRespuesta($this->convertirJson($this->devolverError(4)), 400);
   }
 }
 $this->mostrarRespuesta($this->convertirJson($this->devolverError(4)), 400);
}

private function existeUsuario($email) {
 if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
   $query = $this->_conn->prepare("SELECT mail from usuarios WHERE mail = :mail");
   $query->bindValue(":mail", $email);
   $query->execute();
   if ($query->fetch(PDO::FETCH_ASSOC)) {
     return true;
   }
 }
 else
   return false;
}


private function crearUsuario() {
 if ($_SERVER['REQUEST_METHOD'] != "POST") {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(1)), 405);
 }
 if (isset($this->datosPeticion['nombre'], $this->datosPeticion['email'], $this->datosPeticion['pwd'])) {
   $nombre = $this->datosPeticion['nombre'];
   $pwd = $this->datosPeticion['pwd'];
   $email = $this->datosPeticion['email'];
   if (!$this->existeUsuario($email)) {
     $query = $this->_conn->prepare("INSERT into usuario (nombre,email,pwd,fRegistro) VALUES (:nombre, :email, :pwd, NOW())");
     $query->bindValue(":nombre", $nombre);
     $query->bindValue(":email", $email);
     $query->bindValue(":pwd", sha1($pwd));
     $query->execute();
     if ($query->rowCount() == 1) {
       $id = $this->_conn->lastInsertId();
       $respuesta['estado'] = 'correcto';
       $respuesta['msg'] = 'usuario creado correctamente';
       $respuesta['usuario']['id'] = $id;
       $respuesta['usuario']['nombre'] = $nombre;
       $respuesta['usuario']['email'] = $email;
       $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
     }
     else
       $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
   }
   else
     $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 400);
 } else {
   $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
 }
}
}
$api = new Api();
$api->procesarLLamada();