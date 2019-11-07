<?php
    session_start();
    if(!isset($_SESSION["admin"])){
        header("location:validar.php");
    }
    require "./assets/admin/inicioHTML.php";
    require "./assets/admin/header_admin.php";
    
    echo "<section id='listado_usuario'>";
        echo "<table>";
            echo "<tr>";
                echo "<th>DNI</th>";
                    echo "<th>Nombre</th>";
                    echo "<th>Email</th>";
                    echo "<th>Operaciones</th>";
                echo "</tr>";
                require "../src/Modelo.php";
                $base = new BBDD();
                $clientes= Usuario::getAll($base->conexion);
                foreach ($clientes as $producto) {
                    echo "<tr>";
                        echo "<td>".$producto["dniCliente"]."</td>";
                        echo "<td>".$producto["nombre"]."</td>";
                        echo "<td>".$producto["email"]."</td>";
                        echo "<td><input id='boton_editar' type='button' value='Editar'><input id='boton_eliminar' type='button' value='Borrar'></td>";
                    echo "</tr>";
                }
                echo "</table>";
            echo "</section>";    
                require "./assets/admin/footer_admin.php";
                require "./assets/admin/cierreHTML.php";