<?php
session_start();
require "./../src/BBDD.php";
require "./../src/Usuario.php";
require "./../src/Artista.php";
$error;
$u = new Usuario();
$a = new Artista();
if (empty($_GET)){
    if (isset($_POST["enviar"])){
        $error=$u->comprobarCampos($_POST);
        if ($error===true) {
            $error=$u->conexion();
            if ($error===true){
                $error=$u->comprobarCorreo($_POST);
                if($error===true){   
                    $datos=$u->limpiardatos($_POST);
                    $_SESSION=$datos;
                    require "./assets/inicioHTML.php";
                    include "./assets/header.php";
                    include "./assets/SelecionRegistro.php";
                    require "./assets/cierreHTML.php";
                }
                else{
                    require "./assets/inicioHTML.php";
                    include "./assets/header.php";
                    include "./assets/msgCuenta.php";
                    include "./assets/registro.php";
                    require "./assets/cierreHTML.php";
                }
            }
        }
        else{
            require "./assets/inicioHTML.php";
            include "./assets/header.php";
            include "./assets/registro.php";
            require "./assets/cierreHTML.php"; 
        }
        
    }
    else{
        require "./assets/inicioHTML.php";
        include "./assets/header.php";
        include "./assets/registro.php";
        require "./assets/cierreHTML.php"; 
    }
}
else{   
    $datos=$_SESSION;
    var_dump($datos);
    if($_GET["opcion"]=="usuario"){
        $error=$u->conexion();
        if ($error===true){
            $error=$u->insertarusuario($datos);
            if ($error===true){
                header("Location:index.php");
            }
        }
    }
    if($_GET["opcion"]=="artista"){
        $error=$u->conexion();
        if ($error===true){
            $error=$u->insertarusuario($datos);
            if ($error===true){
                $u->SacarId_user($_SESSION['Email']);
                $a->conexion();
                $a->insertarartista($u->Id_usuario);
                header("Location:index.php");
            }
            
        }
    }
    
}

?>
