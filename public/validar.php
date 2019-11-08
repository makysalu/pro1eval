  <?php 
    session_start();
        require "./assets/inicioHTML.php";
         if(isset($_POST["Loguear"])){
             $datos=limpiardatos($_POST);
             require "../src/Modelo.php";
             $base=new BBDD;
             $usuario= new Usuario;
             $usuario->dniCliente=$datos["DNI"];
             $usuario->pwd=$datos["Password"];
             var_dump($usuario->dniCliente);
             $usuario->ComprobarCliente($base->conexion);
             if ($usuario===false) {
                $base->cerrarconexion();
                require "./assets/msgCuenta.php";
                require "./assets/login.php";
             }
             else{
                if($usuario["admin"]==1){
                    $_SESSION["dni"]=$usuario["dniCliente"];
                    $_SESSION["nombre"]=$usuario["nombre"];
                    $_SESSION["admin"]=$usuario["admin"];
                    $base->cerrarconexion();
                    header("location:panelAdmin.php");
                    //var_dump($_SESSION["admin"]);
                }
                else{
                    $_SESSION["dni"]=$usuario["dniCliente"];
                    $_SESSION["nombre"]=$usuario["nombre"];
                    $_SESSION["total"]=0;
                    $base->cerrarconexion();
                    header("location:principal.php");
                }
             }
         }
         else {
            require "./assets/login.php";
         }
        
        require "./assets/cierreHTML.php";

        function limpiardatos($post){
            $datos=array();
            foreach ($post as $key => $value){  
                if($key!="Enviar"){
                    $datos[$key]=htmlentities($value);
                }
            }
            return $datos;
        }
    ?>
    
    