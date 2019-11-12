<?php
    
    if(isset($_POST['funcion'])){
        if($_POST["funcion"]=="listar"){
            listar_productos();
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
            var_dump($_POST);
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
                    var_dump($_FILES);
                    //var_dump($_POST);
                    //modificar_producto($_POST,$foto);
                }
                else{
                    echo "no se puedo introducir la imagen";
                }
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
    

    function listar_productos(){
        require "../../src/Modelo.php";
        $base = new BBDD;
        $productos= Producto::listarProductos($base->conexion);
        $listproductos= array();
        foreach ($productos as $funcion) {
            array_push($listproductos,$funcion);
        }
        echo json_encode($listproductos);
    }

    function datos_producto($idProducto){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $producto=new Producto();
        $producto->idProducto=$idProducto;
        $producto->SelectProducto($base->conexion);
        $datosproducto["idProducto"]=$producto->idProducto;
        $datosproducto["nombre"]=$producto->nombre;
        $datosproducto["marca"]=$producto->marca;
        $datosproducto["categoria"]=$producto->categoria;
        $datosproducto["precio"]=$producto->precio;
        echo json_encode($datosproducto);
    }
    
    function añadir_producto($datos,$foto){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $producto= new Producto;
            $producto->nombre=$datos["nombre"];
            $producto->marca=$datos["marca"];
            $producto->categoria=$datos["categoria"];
            $producto->precio=$datos["precio"];
            $producto->foto=$foto;
        $estado=$producto->InsertProducto($base->conexion);
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
                $dir = "../img/productos/";
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
        $Producto=new Producto();
        $Producto->idProducto=$idProducto;
        $Producto->deleteproducto($base->conexion);
        echo "Se elimino el cliente ".$idProducto;
    }

    function modificar_producto($datos,$foto){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $producto= new Producto;
            $producto->idProducto = $datos["idProducto"];
            $producto->nombre = $datos["nombre"];
            $producto->marca=$datos["marca"];
            $producto->categoria=$datos["categoria"];
            $producto->precio=$datos["precio"];
            $producto->foto=$foto;
        
        $producto->updateproducto($base->conexion);
        /*$producto->SelectProducto($base->conexion);
        $datosproducto["idProducto"]=$producto->idProducto;
        $datosproducto["nombre"]=$producto->nombre;
        $datosproducto["marca"]=$producto->marca;
        $datosproducto["categoria"]=$producto->categoria;
        $datosproducto["precio"]=$producto->precio;
        echo json_encode($datosproducto);*/
        //echo "Se ha modificado el producto ".$producto->nombre;
    }