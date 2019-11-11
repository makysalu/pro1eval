<?php
    session_start();
    if(!isset($_SESSION["admin"])){
        header("location:validar.php");
    }
    require "./assets/admin/inicioHTML.php";
    require "./assets/admin/header_admin.php";
    require "./assets/admin/modal_cliente.php";
    require "./assets/admin/modal_mensaje.php";
?>
    <section id='gestion_pedidos'>
        
    </section>
    <?php
    require "./assets/admin/footer_admin.php";
    require "./assets/admin/cierreHTML.php";
?>