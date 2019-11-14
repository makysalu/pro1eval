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
            $respuesta=array();
            if((isset($_POST["direccion"]))&&(isset($_POST["dniCliente"]))){
                añadir_pedido($_POST,$respuesta);
            }
            else{
                array_push($respuesta,false);
                echo json_encode($respuesta);
            }
        }
        if($_POST["funcion"]=="eliminar"){
            if(isset($_POST["idPedido"])){
                eliminar_pedido($_POST["idPedido"]);
            }
        }
        if($_POST["funcion"]=="modificar"){
            $respuesta=array();
            $error= array();
            foreach ($_POST as $key => $value) {     
                if(empty($_POST[$key])){
                    array_push($error,$key);
                } 
            }
            if (empty($error)){
                modificar_pedido($_POST,$respuesta);
            }
            else{
                array_push($respuesta,false);
                echo json_encode($respuesta);
            }
        }
        if($_POST["funcion"]=="eliminar_linea"){
            $respuesta=array();
            if((isset($_POST["idPedido"]))&&(isset($_POST["nlinea"]))){
                eliminar_linea($_POST,$respuesta);
            }
            else{
                array_push($respuesta,false);
                echo json_encode($respuesta);
            }
        }
        if($_POST["funcion"]=="añadir_linea"){
            $respuesta=array();
            if((isset($_POST["idProducto"]))&&(isset($_POST["cantidad"]))){
                añadir_linea($_POST,$respuesta);
            }
            else{
                array_push($respuesta,false);
                echo json_encode($respuesta);
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
        $pedido= new Pedido($idPedido,"","","","","","");
        $pedidos=$pedido->listarLineasPedidos($base->conexion);
        $listpedidos= array();
        $cont=0;
        foreach ($pedidos as $funcion) {
            array_push($listpedidos,$funcion);
            $producto=new Producto($funcion["idProducto"],"","","","","","");
            $producto->SelectProducto($base->conexion);
            $listpedidos[$cont]["idProducto"]=$producto->nombre;
            $cont++;
        }
        echo json_encode($listpedidos);
    }

    function datos_pedido($idPedido){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos=new Pedido($idPedido,"","","","","","","");
        $pedidos->idPedido=$idPedido;
        $pedidos->mostrarPedido($base->conexion);
        $datospedido["idPedido"]=$pedidos->idPedido;
        $datospedido["direccion"]=$pedidos->dirEntrega;
        $datospedido["dniCliente"]=$pedidos->dniCliente;
        echo json_encode($datospedido);
    }
    
    function añadir_pedido($datos,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedido=new Pedido("",date("y-m-d"),$datos["direccion"],"1","1","1",$datos["dniCliente"]);
        $pedido->altaPedido($base->conexion);
        array_push($respuesta,false);
        array_push($respuesta,$pedido->idPedido,$pedido->fecha,$pedido->dirEntrega,$pedido->dniCliente);
        echo json_encode($respuesta);
    }
    

    function eliminar_pedido($idPedido){
        $respuesta=array();
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedido=new Pedido($idPedido,"","","","","","");
        $pedido->deletePedido($base->conexion);
        array_push($respuesta,true);
        echo json_encode($respuesta);
    }

    function modificar_pedido($datos,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos=new Pedido($datos["idPedido"],"",$datos["direccion"],"","","",$datos["dniCliente"]);
        $pedidos->updatepedido($base->conexion);
        array_push($respuesta,true);
        echo json_encode($respuesta);
    }

    function eliminar_linea($datos,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Pedido= new Pedido($datos["idPedido"],"","","","","","");
        $Pedido->eliminarLineaPedido($base->conexion,$datos["nlinea"]);
        array_push($respuesta,true);
        echo json_encode($respuesta);
    }

    function añadir_linea($datos,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Pedido= new Pedido("","","","","","","");
        Pedido::añadirLineaPedido($base->conexion,$datos["idPedido"],$datos["idProducto"],$datos["cantidad"]);
        array_push($respuesta,true);
        echo json_encode($respuesta);
        $base->cerrarconexion();
    }