<?php 
        session_start();
        $total=0;  
        if(isset($_SESSION["dni"])){
            $total=0;
            if(isset($_POST["Comprar"])){
                require "../src/Modelo.php";
                Carrito::añadirLinea($_POST["idProducto"],$_POST["nombre"],$_POST["precio"],$_POST["cantidad"]);
            }
            else if(isset($_POST["actualizar"])){
                require "../src/Modelo.php";
                Carrito::ActualizarCarro($_POST["cantidad"]);
            }
            if(isset($_SESSION["Carro"])){
                for ($cont=0; $cont < $_SESSION["total"]; $cont++) {
                    $precio=$_SESSION["Carro"]["precio"][$cont];
                    $cantidad=$_SESSION["Carro"]["cantidad"][$cont];
                    $total=$total+($precio*$cantidad);
                }
            }
            require "./assets/inicioHTML.php";
            include "./assets/header.php";
            include "./assets/carro.php";
            require "./assets/cierreHTML.php";
        }
        else{
            header("location:validar.php");
        }
    ?>
