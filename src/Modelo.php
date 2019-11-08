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
  //coje
  public function __get($var){
      return $this->$var;
  }
  //set
  public function __set($var,$valor){
    $this->$var=$valor;
  }
}

class Usuario{
    private $dniCliente;
    private $nombre;
    private $direccion;
    private $email;
    private $pwd;
    
    public function __get($var){
        return $this->$var;
    }

    public function __set($var,$valor){
      $this->$var=$valor;
    }

    public function listarClientes($conexion){
        $consulta="SELECT * FROM clientes";
        return $result=$conexion->query($consulta);
    }

    public function ComprobarCliente($conexion){
        $consulta="SELECT * FROM clientes WHERE dniCliente = "."'".$this->dniCliente."'"." AND pwd = "."'".$this->pwd."'";
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if ($row_cnt==0){
            return false;
        }
        else{
            $cliente=$resultado->fetch_assoc();
            $this->dniCliente = $cliente[dniCliente""];
            $this->nombre = $cliente[dniCliente""];
            private $direccion;
            private $email;
            private $pwd;
        }
    }

    public function SacarDatos($conexion,$dni){
        $consulta="SELECT * FROM clientes WHERE dniCliente = "."'".$dni."'";
        $resultado=$conexion->query($consulta);
        $cliente=$resultado->fetch_assoc();
        return $cliente;
    }

    public function InsertCliente($conexion){
        $consulta="insert into clientes values ("."'".$this->dniCliente."'".","."'".$this->nombre."'".","."'".$this->direccion."'".","."'".$this->email."'".","."'".$this->pwd."'".")";
        $conexion->query($consulta);
        return true;
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

    public function __get($var){
        return $this->$var;
    }

    public function __set($var,$valor){
      $this->$var=$valor;
    }

    static function SelectAll($conexion){
        $consulta="SELECT * from productos";
        $resultado=$conexion->query($consulta);
        return $resultado;
    }

    public function SelectProducto($conexion, $id){
        $consulta="SELECT * from productos WHERE productos.idProducto=$id";
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if ($row_cnt==0){
            return false;
        }
        else{
            $producto=$resultado->fetch_assoc();
            return $producto;
        }
    }

 }

 class Carrito{

    static function añadirLinea($idProducto,$nombre,$precio,$cantidad){
        $_SESSION["Carro"]["idProducto"][$_SESSION["total"]]=$_POST["idProducto"];
        //$_SESSION["Carro"]["foto"][$_SESSION["total"]]=$_POST["foto"];
        $_SESSION["Carro"]["nombre"][$_SESSION["total"]]=$_POST["nombre"];
        $_SESSION["Carro"]["precio"][$_SESSION["total"]]=$_POST["precio"];
        $_SESSION["Carro"]["cantidad"][$_SESSION["total"]]=$_POST["cantidad"];
        $_SESSION["total"]=$_SESSION["total"]+1;
    }
    static function ActualizarCarro($cantidad){
       foreach ($cantidad as $key => $value) {
           if($value>0){
                $_SESSION["Carro"]["cantidad"][$key]=$value;  
           }
           else{
            unset($_SESSION["Carro"]["idProducto"][$key]);
            $_SESSION["Carro"]["idProducto"]=array_values($_SESSION["Carro"]["idProducto"]);
            unset($_SESSION["Carro"]["nombre"][$key]);
            $_SESSION["Carro"]["nombre"]=array_values($_SESSION["Carro"]["nombre"]);
            unset($_SESSION["Carro"]["precio"][$key]);
            $_SESSION["Carro"]["precio"]=array_values($_SESSION["Carro"]["precio"]);
            unset($_SESSION["Carro"]["cantidad"][$key]);
            $_SESSION["Carro"]["cantidad"]=array_values($_SESSION["Carro"]["cantidad"]);
            $_SESSION["total"]=$_SESSION["total"]-1;
           }
           
       }
    }
 }

 class Pedido{
     private $idPedido;
     private $fecha;
     private $direntrega;
     private $nTarjeta;
     private $fechaCaducidad;
     private $matriculaRepartidor;
     private $dniCliente;

     public function __get($var){
        return $this->$var;
    }

    public function __set($var,$valor){
      $this->$var=$valor;
    }

     public function altaPedido($dniCliente, $conexion){
        $consulta="SELECT MAX(idPedido) AS idPedido FROM pedidos";
        $idPedido=$conexion->query($consulta);
        $idPedido=$idPedido->fetch_assoc();
        $newId=($idPedido["idPedido"]+1);

        $consulta="INSERT INTO pedidos (idPedido,fecha,dniCliente) VALUES ("."'".$newId."'".",NOW(),"."'".$dniCliente."'".")";
        $conexion->query($consulta);
     }
 }