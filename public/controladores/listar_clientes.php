<?php
    if(isset($_POST["cliente"])){
        if($_POST["cliente"]=="listar"){
            listar_cliente();
        }
        if($_POST["cliente"]=="datos"){
            if(isset($_POST["dniCliente"])){
                datos_cliente($_POST["dniCliente"]);
            }
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

    function datos_cliente($dniCliente){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $cliente= Usuario::SacarDatos($base->conexion,$dniCliente);
        echo json_encode($cliente);
    }
    
    function añadir_cliente($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $datos=$_POST;
        $cliente= new Usuario($datos["dniCliente"],$datos["nombre"],$datos["direccion"],$datos["email"],"1111");
        $cliente->InserCliente($base->conexion);
        if ($cliente==false) {
            echo json_encode("Error en la introducion del Cliente");
        }
    }
     