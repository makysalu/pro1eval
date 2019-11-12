<?php
    session_start();
        if(isset($_SESSION["dni"])){
           if(isset($_SESSION["Carro"])){
               require "../src/Modelo.php";
               $base = new BBDD;
               $pedido=new Pedido("",date("y-m-d"),"","","","","",$_SESSION["dni"]);
               $pedido->altaPedido($base->conexion);
               $pedido->altaLineaPedido($base->conexion);
               $total=0;
                for ($cont=0; $cont < $_SESSION["total"]; $cont++) {
                    $precio=$_SESSION["Carro"]["precio"][$cont];
                    $cantidad=$_SESSION["Carro"]["cantidad"][$cont];
                    $total=$total+($precio*$cantidad);
                }
               require "./assets/inicioHTML.php";
               require "./assets/header.php";
               require "./assets/pedido.php";
               session_destroy();
           }
        }
        else{
            header("location:validar.php");
        }          
?>