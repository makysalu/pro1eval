<?php
    session_start();
        if(isset($_SESSION["dni"])){
           if(isset($_SESSION["Carro"])){
               require "../src/Modelo.php";
               $base = new BBDD;
               Pedido::altaPedido($_SESSION["dni"],$base->conexion);
           }
        }
        else{
            header("location:validar.php");
        }          
?>