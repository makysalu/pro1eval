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
            if(isset($_POST["idProducto"])){
                datos_producto($_POST["idProducto"]);
            }
        }
        if($_POST["funcion"]=="añadir"){
            $error= array();
            foreach ($_POST as $key => $value) {     
                if(empty($_POST[$key])){
                    array_push($error,$key);
                } 
            }
            if(($_FILES['file']['name'])===""){
                array_push($error,"file");
            }
            if (empty($error)){
                $foto=introducirarchivo();
                if($foto){
                    añadir_producto($_POST,$foto);
                }
                else{
                    echo "no se puedo introducir la imagen";
                }
            }
            else{
                echo "Existen campos vacios";
            }
        }
        if($_POST["funcion"]=="eliminar"){
            if(isset($_POST["idProducto"])){
                eliminar_producto($_POST["idProducto"]);
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
                modificar_producto($_POST);
            }
            else{
                echo "Existen campos vacios";
            }
        }
    }
    else{
        var_dump($_FILES);
        var_dump($_POST);
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

    function datos_producto($idProducto){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos=new Pedido();
        $pedidos->idProducto=$idProducto;
        $pedidos->SelectProducto($base->conexion);
        $datosproducto["idProducto"]=$pedidos->idProducto;
        $datosproducto["nombre"]=$pedidos->nombre;
        $datosproducto["marca"]=$pedidos->marca;
        $datosproducto["categoria"]=$pedidos->categoria;
        $datosproducto["precio"]=$pedidos->precio;
        echo json_encode($datosproducto);
    }
    
    function añadir_producto($datos,$foto){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos= new Pedido;
            $pedidos->nombre=$datos["nombre"];
            $pedidos->marca=$datos["marca"];
            $pedidos->categoria=$datos["categoria"];
            $pedidos->precio=$datos["precio"];
            $pedidos->foto=$foto;
        $estado=$pedidos->InsertProducto($base->conexion);
        if (!$estado) {
            echo "Error en la introducion del Cliente";
        }
        else{
            echo "Se Introducido sin problemas";
        }
    }
    
    function introducirarchivo(){
       //echo "type:".$_FILES['file']['type'];
        if (is_uploaded_file ($_FILES['file']['tmp_name'] )){
            $partes=explode('.',$_FILES['file']['name']);
            $npartes=count($partes);
            $nombrefile=$_FILES['file']['name'];
            if ($partes>0) {
                $dir = "../img/pedidos/";
                if (is_file($dir.$_FILES['file']['name'])){
                    $idUnico = time();
                    $nombrefile=$partes[0];
                    for ($cont=1; $cont < $npartes-1; $cont++) { 
                        $nombrefile.=".".$partes[$cont];
                    }
                    $nombrefile.="_".$idUnico.".".$partes[$npartes-1];
                }
            }
            $nombreCompleto = $dir.$nombrefile;
            move_uploaded_file ($_FILES['file']['tmp_name'],$nombreCompleto);
            return $nombrefile;

        }
        else{
            false;
        }
    }

    function eliminar_producto($idProducto){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Pedido=new Pedido();
        $Pedido->idProducto=$idProducto;
        $Pedido->deleteproducto($base->conexion);
        echo "Se elimino el cliente ".$idProducto;
    }

    function modificar_producto($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $pedidos= new Pedido;
            $pedidos->idProducto = $datos["idProducto"];
            $pedidos->nombre = $datos["nombre"];
            $pedidos->marca=$datos["marca"];
            $pedidos->categoria=$datos["categoria"];
            $pedidos->precio=$datos["precio"];
        $pedidos->updateproducto($base->conexion);
        /*$pedidos->SelectProducto($base->conexion);
        $datosproducto["idProducto"]=$pedidos->idProducto;
        $datosproducto["nombre"]=$pedidos->nombre;
        $datosproducto["marca"]=$pedidos->marca;
        $datosproducto["categoria"]=$pedidos->categoria;
        $datosproducto["precio"]=$pedidos->precio;
        echo json_encode($datosproducto);*/
        echo "Se ha eliminado el producto ".$pedidos->nombre;
    }