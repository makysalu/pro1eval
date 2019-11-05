<?php
  class BBDD {
    public $conexion=null;

    function __construct(){
    }

    public function conexion(){
      $this->conexion = new  mysqli("localhost", "root", "", "artshop");
        if ($this->conexion->connect_errno) {
            echo "Fallo al conectar a MySQL: (" . $this->conexion->connect_errno . ") " . $this->conexion->connect_error;
            $error=false;
        }
        else{
            $error=true;
        }
        return $error;
    }
}
 