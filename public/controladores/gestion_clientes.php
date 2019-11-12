<?php
    

    if(isset($_POST['funcion'])){
        if($_POST["funcion"]=="listar"){
            listar_cliente();
        }
        if($_POST["funcion"]=="datos"){
            if(isset($_POST["dniCliente"])){
                datos_cliente($_POST["dniCliente"]);
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
            if (empty($error)){
                añadir_cliente($_POST,$respuesta);
            }
            else{
                array_push($respuesta,false);
                array_push($respuesta,1);
                echo json_encode($respuesta);
            }
        }
        if($_POST["funcion"]=="eliminar"){
            if(isset($_POST["dniCliente"])){
                eliminar_cliente($_POST["dniCliente"]);
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
                modificar_cliente($_POST,$respuesta);
            }
            else{
                array_push($respuesta,false);
                echo json_encode($respuesta);
            }
        }
    }
    

    function listar_cliente(){
        require "../../src/Modelo.php";
        $base = new BBDD;
        $clientes= Usuario::listarClientes($base->conexion);
        $listclientes= array();
        foreach ($clientes as $funcion) {
            array_push($listclientes,$funcion);
        }
        echo json_encode($listclientes);
    }

    function datos_cliente($dniCliente){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $usuario= new Usuario($dniCliente,"","","","","");
        echo json_encode($usuario->SacarDatos($base->conexion));
    }
    
    function añadir_cliente($datos,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $password=password_hash($datos["pwd"], PASSWORD_DEFAULT);
        $usuario= new Usuario($datos["dniCliente"],$datos["nombre"],$datos["direccion"],$datos["email"],$password,0);
        
        $estado=$usuario->InsertCliente($base->conexion);
        if (!$estado) {
            array_push($respuesta,false);
            array_push($respuesta,2);
            echo json_encode($respuesta);
        }
        else{
            array_push($respuesta,true);
            echo json_encode($respuesta);
        }
    }
    
    function eliminar_cliente($dniCliente){
        $respuesta=array();
        require "../../src/Modelo.php";
        $base = new BBDD();
        $usuario= new Usuario($dniCliente,"","","","","");
        $usuario->deleteClient($base->conexion);
        array_push($respuesta,true);
        echo json_encode($respuesta);
    }

    function modificar_cliente($datos,$respuesta){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $usuario= new Usuario($datos["dniCliente"],$datos["nombre"],$datos["direccion"],$datos["email"],"","");
        $usuario->updateClient($base->conexion);
        array_push($respuesta,true);
        echo json_encode($respuesta);
        //echo json_encode($usuario->SacarDatos($base->conexion));
    }