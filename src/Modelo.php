<?php
class BBDD{
  private $conexion;
  function __construct(){
      if(!isset($this->conexion)){
          $this->conexion=new mysqli('localhost','root','root','virtualmarket');
      }
      if($this->conexion->connect_errno){
          $dato="Fallo al conectar la base de datos".$conexion->connect_error;
          require "vistas/mostrar.php";
      }
      else{
          
      }
  }
  public function cerrarconexion(){
      $this->conexion->close();
  }
  function __get($var){
      return $this->$var;
  }
}

Class Usuario{
    private $dniCliente;
    private $nombre;
    private $direccion;
    private $email;
    private $pwd;
    
    function __construct($dniCliente,$nombre,$direccion,$email,$pwd){
        $this->dniCliente=$dniCliente;
        $this->nombre=$nombre;
        $this->direccion=$direccion;
        $this->email=$email;
        $this->pwd=$pwd;
        }
    public function getAll($conexion){
        $consulta="SELECT * FROM clientes";
        return $result=$conexion->query($consulta);
    }
    public function ComprobarDNI($conexion){
        $consulta="SELECT c.dniCliente from clientes c WHERE c.dniCliente=".$this->dniCliente;
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if ($row_cnt==0){
            return true;
        }
        else{
            return false;
        }
    }
    public function ComprobarCliente($conexion,$dni,$pwd){
        $consulta="SELECT * FROM clientes WHERE dniCliente = "."'".$dni."'"." AND pwd = "."'".$pwd."'";
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if ($row_cnt==0){
            return false;
        }
        else{
            $cliente=$resultado->fetch_assoc();
            return $cliente;
        }
    }
    public function SelectAll($conexion){
        $consulta="SELECT * from clientes";
        $resultado=$conexion->query($consulta);
        return $resultado;
    }
    public function SelectClient($conexion,$dni){
        $consulta="SELECT * from clientes WHERE dniCliente =".$dni;
        $resultado=$conexion->query($consulta);
        $cliente=$resultado->fetch_assoc();
        return $cliente;
    }
    public function InserClient($conexion){
        $consulta="insert into clientes values ("."'".$this->dniCliente."'".","."'".$this->nombre."'".","."'".$this->direccion."'".","."'".$this->email."'".","."'".$this->pwd."'".")";
        $conexion->query($consulta);
        return true;
    }
    public function UpadateCliente($conexion){
        $consulta="UPDATE clientes SET nombre="."'".$this->nombre."'".", direccion="."'".$this->direccion."'".", email="."'".$this->email."'"." WHERE dniCliente="."'".$this->dniCliente."'";
        $conexion->query($consulta);
    }
    function deleteClient($conexion){
        $consulta="DELETE FROM clientes WHERE dniCliente="."'".$this->dniCliente."'";
        $conexion->query($consulta);
    }
}

 class Producto{
     private $idProducto;
     private $nombre;
     private $foto;
     private $marca;
     private $categoria;
     private $unidades;
     private $precio;

    function __construct($idProducto,$nombre,$foto,$marca,$categoria,$unidades,$precio){
        $this->idProducto=$idProducto;
        $this->nombre=$nombre;
        $this->foto=$foto;
        $this->marca=$marca;
        $this->categoria=$categoria;
        $this->unidades=$unidades;
        $this->precio=$precio;
    }

    public function SelectAll($conexion){
        $consulta="SELECT * from productos";
        $resultado=$conexion->query($consulta);
        return $resultado;
    }
 }