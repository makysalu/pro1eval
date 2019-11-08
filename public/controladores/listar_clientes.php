<?php
    if(isset($_POST["accion"])){
        if($_POST["accion"]=="listar"){
            listar_cliente();
        }
        if($_POST["accion"]=="datos"){
            if(isset($_POST["dniCliente"])){
                datos_cliente($_POST["dniCliente"]);
            }
        }
        if($_POST["accion"]=="añadir"){
            var_dump($_POST);
            echo "<br>";
            if(isset($_POST["dniCliente"])){
                echo $_POST["dniCliente"];
            }
            else{
                echo "error dni";
            }
            if(isset($_POST["nombre"])){
                echo $_POST["nombre"];
            }
            else{
                echo "error nombre";
            }
            if(isset($_POST["direccion"])){
                echo $_POST["direccion"];
            }
            else{
                echo "error direccion";
            }
            if(isset($_POST["email"])){
                echo $_POST["email"];
            }
            else{
                echo "error email";
            }
        }
    }
    

    function listar_cliente(){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $clientes= Usuario::getAll($base->conexion);
        $listclientes= array();
        foreach ($clientes as $accion) {
            array_push($listclientes,$accion);
        }
        echo json_encode($listclientes);
    }

    function datos_cliente($dniCliente){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $accion= Usuario::SacarDatos($base->conexion,$dniCliente);
        echo json_encode($accion);
    }
    
    function añadir_cliente($datos){
        require "../../src/Modelo.php";
        $base = new BBDD();
        $datos=$_POST;
        $accion= new Usuario($datos["dniCliente"],$datos["nombre"],$datos["direccion"],$datos["email"],"1111");
        $accion->InserCliente($base->conexion);
        if ($accion==false) {
            echo json_encode("Error en la introducion del Cliente");
        }
    }
     