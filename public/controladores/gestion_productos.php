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
            $respuesta=array();
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
                    añadir_producto($_POST,$foto,$respuesta);
                }
                else{
                    array_push($respuesta,false);
                    array_push($respuesta,2);
                    echo json_encode($respuesta);
                }
            }
            else{
                array_push($respuesta,false);
                array_push($respuesta,1);
                echo json_encode($respuesta);
            }
        }
        if($_POST["funcion"]=="eliminar"){
            if(isset($_POST["idProducto"])){
                eliminar_producto($_POST["idProducto"]);
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
            if(($_FILES['file']['name'])===""){
                array_push($error,"file");
            }
            if (empty($error)){
                $foto=introducirarchivo();
                if($foto){
                    modificar_producto($_POST,$foto,$respuesta);
                }
                else{
                    array_push($respuesta,false);
                    array_push($respuesta,2);
                    echo json_encode($respuesta);
                }
            }
            else{
                array_push($respuesta,false);
                array_push($respuesta,1);
                echo json_encode($respuesta);
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
        $producto=new Producto($idProducto,"","","","","","");
        $producto->SelectProducto($base->conexion);
        $datosproducto["idProducto"]=$producto->idProducto;
        $datosproducto["nombre"]=$producto->nombre;
        $datosproducto["marca"]=$producto->marca;
        $datosproducto["categoria"]=$producto->categoria;
        $datosproducto["precio"]=$producto->precio;
        echo json_encode($datosproducto);
    }
    
    function añadir_producto($datos,$foto,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $producto=new Producto("",$datos["nombre"],$foto,$datos["marca"],$datos["categoria"],"",$datos["precio"]);
        $estado=$producto->InsertProducto($base->conexion);
        if (!$estado) {
            array_push($respuesta,false);
            array_push($respuesta,3);
            echo json_encode($respuesta);
        }
        else{
            array_push($respuesta,true);
            echo json_encode($respuesta);
        }
    }
    
    function introducirarchivo(){
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
        $respuesta=array();
        require "../../src/Modelo.php";
        $base = new BBDD();
        $Producto=new Producto($idProducto,"","","","","","");
        $Producto->deleteproducto($base->conexion);
        array_push($respuesta,true);
        echo json_encode($respuesta);
    }

    function modificar_producto($datos,$foto,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $producto=new Producto($datos["idProducto"],$datos["nombre"],$foto,$datos["marca"],$datos["categoria"],"",$datos["precio"]);
        $producto->updateproducto($base->conexion);
        array_push($respuesta,true);
        echo json_encode($respuesta);
        /*$producto->SelectProducto($base->conexion);
        $datosproducto["idProducto"]=$producto->idProducto;
        $datosproducto["nombre"]=$producto->nombre;
        $datosproducto["marca"]=$producto->marca;
        $datosproducto["categoria"]=$producto->categoria;
        $datosproducto["precio"]=$producto->precio;
        echo json_encode($datosproducto);*/
        //echo "Se ha modificado el producto ".$producto->nombre;
    }