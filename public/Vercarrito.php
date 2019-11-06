<?php 
        session_start();
        if(isset($_SESSION["dni"])){
            
            if(isset($_POST["Comprar"])){
               if(isset($_SESSION["Carro"][$_POST["idProducto"]])){
                    $_SESSION["Carro"][$_POST["idProducto"]]=[[$_POST["nombre"]],[$_POST["precio"]],[$_POST["cantidad"]]];
                    var_dump($_SESSION["Carro"]);
               }
               else{
                   $_SESSION["Carro"][$_POST["idProducto"]]=[[$_POST["nombre"]],[$_POST["precio"]],[$_POST["cantidad"]]];
                }
            }
            
        }
        else{
            
        }
    ?>