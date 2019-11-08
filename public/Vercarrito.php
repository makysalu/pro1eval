<?php 
        session_start();
        if(isset($_SESSION["dni"])){
            if(isset($_POST["Comprar"])){
                $valor=$_SESSION["total"];
                $valor+=1;
                $_SESSION["total"]=$valor;
                $_SESSION["Carro"]["idProducto"][$_SESSION["total"]]=$_POST["idProducto"];
                //$_SESSION["Carro"]["foto"][$_SESSION["total"]]=$_POST["foto"];
                $_SESSION["Carro"]["nombre"][$_SESSION["total"]]=$_POST["nombre"];
                $_SESSION["Carro"]["precio"][$_SESSION["total"]]=$_POST["precio"];
                $_SESSION["Carro"]["cantidad"][$_SESSION["total"]]=$_POST["cantidad"];
            }
            require "./assets/inicioHTML.php";
            include "./assets/header.php";
            if(isset($_SESSION["Carro"])){
                include "./assets/carro.php";
            }
            require "./assets/cierreHTML.php";
        }
        else{
            
        }
    ?>