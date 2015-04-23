<?php

 require_once("Rest.php");


 class Api extends Rest {

   // ************************************ \\
   //              CONEXIÓN                \\
   // ************************************ \\

   const servidor = "www";
   const usuario_db = "root";
   const pwd_db = "root";
   const nombre_db = "bookingfy";
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
       array('estado' => "error", "msg" => "petición no encontrada"),
       array('estado' => "error", "msg" => "petición no aceptada"),
       array('estado' => "error", "msg" => "petición sin contenido"),
       array('estado' => "error", "msg" => "email o password incorrectos"),
       array('estado' => "error", "msg" => "error borrando usuario"),
       array('estado' => "error", "msg" => "error actualizando nombre de usuario"),
       array('estado' => "error", "msg" => "error buscando usuario por email"),
       array('estado' => "error", "msg" => "error creando usuario"),
       array('estado' => "error", "msg" => "usuario ya existe")
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
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
       }
       else
         $this->mostrarRespuesta($this->convertirJson($this->devolverError(8)), 400);
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

       if (!$this->existeUsuario($mail)) {
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
           $this->mostrarRespuesta($this->convertirJson($this->devolverError(7)), 400);
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

   // AÑADIR HORA [POST]
   // curl -d "inicio=09:00" http://bookingfy.dev/api/nuevaHora
   private function nuevoDeporte() {
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
       $respuesta['estado'] = 'correcto';
       $respuesta['usuarios'] = $filas;
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
           $query = $this->_conn->prepare("SELECT id, nombre, apellidos, mail, rol FROM usuarios WHERE
           mail=:mail AND password=:password ");
           $query->bindValue(":mail", $mail);
           $query->bindValue(":password", $password);
           $query->execute();
           if ($fila = $query->fetch(PDO::FETCH_ASSOC)) {
             $respuesta['estado'] = 'correcto';
             $respuesta['msg'] = 'datos pertenecen a usuario registrado';
             $respuesta['usuario']['id'] = $fila['id'];
             $respuesta['usuario']['nombre'] = $fila['nombre'];
             $respuesta['usuario']['apellidos'] = $fila['apellidos'];
             $respuesta['usuario']['mail'] = $fila['mail'];
             $respuesta['usuario']['rol'] = $fila['rol'];

             $this->mostrarRespuesta($this->convertirJson($respuesta), 200);
           }
         }
       }
     }
     $this->mostrarRespuesta($this->convertirJson($this->devolverError(3)), 400);
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