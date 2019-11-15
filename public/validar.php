  <?php 
    session_start();
        require "./assets/inicioHTML.php";
         if(isset($_POST["Loguear"])){
             $datos=limpiardatos($_POST);
             require "../src/Modelo.php";
             $base=new BBDD;
             $usuario= new Usuario($datos["DNI"],"","","","","");
             $estadoLogin=$usuario->ComprobarCliente($base->conexion);
             if ($estadoLogin===false) {
                $base->cerrarconexion();
                require "./assets/msgCuenta.php";
                require "./assets/login.php";
             }
             else{
                if(password_verify($datos["Password"],$usuario->pwd)){
                    $_SESSION["dni"]=$usuario->dniCliente;
                    $_SESSION["nombre"]=$usuario->nombre;
                    if($usuario->admin==1){
                        $_SESSION["admin"]=$usuario->admin;
                        $base->cerrarconexion();
                        header("location:panelAdmin.php");
                    }
                    else{
                        $_SESSION["total"]=0;
                        $base->cerrarconexion();
                        header("location:principal.php");
                    }
                }
                else{
                    require "./assets/msgCuenta.php";
                    require "./assets/login.php";
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
    
    