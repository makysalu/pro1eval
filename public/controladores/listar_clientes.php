<?php
    if(isset($_GET["cliente"])){
        if($_GET["cliente"]=="listar"){
            listar_cliente();
        }
    }

    function listar_cliente(){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $clientes= Usuario::getAll($base->conexion);
        $listclientes= array();
        foreach ($clientes as $cliente) {
            array_push($listclientes,$cliente);
        }
        echo json_encode($listclientes);
    }
     