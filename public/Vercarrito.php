<?php 
        session_start();
        if(isset($_SESSION["dni"])){
            if(isset($_POST["Comprar"])){
                require "../src/Modelo.php";
                Carrito::añadirLinea($_POST["idProducto"],$_POST["nombre"],$_POST["precio"],$_POST["cantidad"]);
            }
            if(isset($_POST["actualizar"])){
                require "../src/Modelo.php";
                Carrito::ActualizarCarro($_POST["cantidad"]);
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