<?php
session_start();
var_dump($_SESSION["admin"]);
if(isset($_SESSION["admin"])){
    require "./assets/inicioHTML.php";
    echo "Administraccion";
    require "./assets/cierreHTML.php";
}
else{
    header("location:login.php");
}
                    
              
?>
