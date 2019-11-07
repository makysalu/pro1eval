<?php
session_start();
if(isset($_SESSION["admin"])){
    require "./assets/admin/inicioHTML.php";
    require "./assets/admin/header_admin.php";
    require "./assets/admin/footer_admin.php";
    require "./assets/admin/cierreHTML.php";
}
else{
    header("location:validar.php");
}
                    
              
?>
