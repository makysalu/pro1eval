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
            $error= array();
            foreach ($_POST as $key => $value) {     
                if(empty($_POST[$key])){
                    array_push($error,$key);
                }
            }
            if (empty($error)){
                añadir_cliente($_POST);
            }
            else{
                echo "Existen campos vacios";
            }
        }
        if($_POST["funcion"]=="eliminar"){
            if(isset($_POST["dniCliente"])){
                eliminar_cliente($_POST["dniCliente"]);
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
                modificar_cliente($_POST);
            }
            else{
                echo "Existen campos vacios";
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
        $usuario=new Usuario();
        $usuario->dniCliente=$dniCliente;
        echo json_encode($usuario->SacarDatos($base->conexion));
    }
    
    function añadir_cliente($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        //var_dump($datos);
        $usuario= new Usuario;
            $usuario->dniCliente = $datos["dniCliente"];
            $usuario->nombre = $datos["nombre"];
            $usuario->direccion=$datos["direccion"];
            $usuario->email=$datos["email"];
            $usuario->pwd=$datos["pwd"];
            $usuario->admin=0;
        $estado=$usuario->InsertCliente($base->conexion);
        if (!$estado) {
            echo "Error en la introducion del Cliente";
        }
        else{
            echo "Se Introducido sin problemas";
        }
    }
    
    function eliminar_cliente($dniCliente){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $usuario=new Usuario();
        $usuario->dniCliente=$dniCliente;
        $usuario->deleteClient($base->conexion);
        echo "Se elimino el cliente ".$dniCliente;
    }

    function modificar_cliente($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $usuario= new Usuario;
            $usuario->dniCliente = $datos["dniCliente"];
            $usuario->nombre = $datos["nombre"];
            $usuario->direccion=$datos["direccion"];
            $usuario->email=$datos["email"];
        $usuario->updateClient($base->conexion);
        echo "se modifico el cliente ".$usuario->nombre." con DNI ".$usuario->dniCliente;
        //echo json_encode($usuario->SacarDatos($base->conexion));
    }