  <?php 
    session_start();
        require "./assets/inicioHTML.php";
         if(isset($_POST["Loguear"])){
             $datos=limpiardatos($_POST);
             require "../src/Modelo.php";
             $base=new BBDD;
             $usuario=Usuario::ComprobarCliente($base->conexion,$datos["DNI"],$datos["Password"]);
             if ($usuario===false) {
                require "./assets/msgCuenta.php";
                require "./assets/login.php";
             }
             else{
                if($usuario["admin"]==1){
                    $_SESSION["dni"]=$usuario["dniCliente"];
                    $_SESSION["nombre"]=$usuario["nombre"];
                    $_SESSION["admin"]=$usuario["admin"];
                    header("location:panelAdmin.php");
                    //var_dump($_SESSION["admin"]);
                }
                else{
                    $_SESSION["dni"]=$usuario["dniCliente"];
                    $_SESSION["nombre"]=$usuario["nombre"];
                    $_SESSION["total"]=0;
                    header("location:index.php");
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
    
    