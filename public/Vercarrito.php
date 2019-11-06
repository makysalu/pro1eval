<?php 
        session_start();
        if(isset($_SESSION["dni"])){
            var_dump($_SESSION["Carro"]);
            if(isset($_POST["Comprar"])){
               if(isset($_SESSION["Carro"][$_POST["idProducto"]])){
                    $_SESSION["Carro"][$_POST["idProducto"]]=["nombre"=>$_POST["nombre"],"precio"=>$_POST["precio"],"cantidad"=>$_POST["cantidad"]];
               }
               else{
                    $_SESSION["Carro"][$_POST["idProducto"]]=["nombre"=>$_POST["nombre"],"precio"=>$_POST["precio"],"cantidad"=>$_POST["cantidad"]];
                }
            }
            require "./assets/inicioHTML.php";
            //include "./assets/header.php";
            if(isset($_SESSION["Carro"])){
                include "./assets/carro.php";
            }
            require "./assets/cierreHTML.php";

        }
        else{
            
        }
    ?>