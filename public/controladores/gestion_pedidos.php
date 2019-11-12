<?php
    if(isset($_POST['funcion'])){
        if($_POST["funcion"]=="listar"){
            listar_pedidos();
        }
        if($_POST["funcion"]=="listar_productos"){
            if(isset($_POST["idPedido"])){
                listar_productos($_POST["idPedido"]);
            }
        }
        if($_POST["funcion"]=="datos"){
            if(isset($_POST["idPedido"])){
                datos_pedido($_POST["idPedido"]);
            }
        }
        if($_POST["funcion"]=="añadir"){
            if((isset($_POST["direccion"]))&&(isset($_POST["dniCliente"]))){
                añadir_pedido($_POST);
            }
            else{
                echo "Existen campos vacios";
            }
        }
        if($_POST["funcion"]=="eliminar"){
            if(isset($_POST["idPedido"])){
                eliminar_pedido($_POST["idPedido"]);
            }
        }
        if($_POST["funcion"]=="modificar"){
            $error= array();
            foreach ($_POST as $key => $value) {     
                if(empty($_POST[$key])){
                    array_push($error,$key);
                } 
            }
            if (empty($error)){
                modificar_pedido($_POST);
            }
            else{
                echo "Existen campos vacios";
            }
        }
        if($_POST["funcion"]=="eliminar_linea"){
            if((isset($_POST["idPedido"]))&&(isset($_POST["nlinea"]))){
                eliminar_linea($_POST);
            }
            else{
                echo "Existen campos vacios";
            }
        }
        if($_POST["funcion"]=="añadir_linea"){
            if((isset($_POST["idProducto"]))&&(isset($_POST["cantidad"]))){
                añadir_linea($_POST);
            }
            else{
                echo "Existen campos vacios";
            }
        }
    }
    

    function listar_pedidos(){
        require "../../src/Modelo.php";
        $base = new BBDD;
        $pedidos= Pedido::listarPedidos($base->conexion);
        $listpedidos= array();
        foreach ($pedidos as $funcion) {
            array_push($listpedidos,$funcion);
        }
        echo json_encode($listpedidos);
    }

    function listar_productos($idPedido){
        require "../../src/Modelo.php";
        $base = new BBDD;
        $pedido= new Pedido;
        $pedido->idPedido=$idPedido;
        $pedidos=$pedido->listarLineasPedidos($base->conexion);
        $listpedidos= array();
        foreach ($pedidos as $funcion) {
            array_push($listpedidos,$funcion);
        }
        echo json_encode($listpedidos);
    }

    function datos_pedido($idPedido){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos=new Pedido();
        $pedidos->idPedido=$idPedido;
        $pedidos->mostrarPedido($base->conexion);
        $datospedido["idPedido"]=$pedidos->idPedido;
        $datospedido["direccion"]=$pedidos->dirEntrega;
        $datospedido["dniCliente"]=$pedidos->dniCliente;
        echo json_encode($datospedido);
    }
    
    function añadir_pedido($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedido= new Pedido;
            $pedido->dirEntrega=$datos["direccion"];
            $pedido->dniCliente=$datos["dniCliente"];
        $pedido->altaPedido($base->conexion);
        echo "Pedido dado de alta";
    }
    

    function eliminar_pedido($idPedido){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Pedido=new Pedido();
        $Pedido->idPedido=$idPedido;
        $Pedido->deletePedido($base->conexion);
        echo "Se elimino el pedido ".$idPedido;
    }

    function modificar_pedido($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos= new Pedido;
            $pedidos->idPedido = $datos["idPedido"];
            $pedidos->dirEntrega = $datos["direccion"];
            $pedidos->dniCliente = $datos["dniCliente"];
        $pedidos->updatepedido($base->conexion);
        echo "Se modifico correctamente";
    }

    function eliminar_linea($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Pedido= new Pedido();
        $Pedido->idPedido=$datos["idPedido"];
        $Pedido->eliminarLineaPedido($base->conexion,$datos["nlinea"]);
        echo "Se elimino la linea ".$datos["nlinea"]." del pedido ".$Pedido->idPedido;
    }

    function añadir_linea($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Pedido= new Pedido();
        Pedido::añadirLineaPedido($base->conexion,$datos["idPedido"],$datos["idProducto"],$datos["cantidad"]);
        echo "Se introducido un nuevo producto";
    }