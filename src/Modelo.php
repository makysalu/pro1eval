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
    private $admin;
    
    function __construct($dniCliente,$nombre,$direccion,$email,$pwd,$admin){
        $this->dniCliente=$dniCliente;
        $this->nombre=$nombre;
        $this->direccion=$direccion;
        $this->email=$email;
        $this->pwd=$pwd;
        $this->admin=$admin;
    }

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
        $consulta="SELECT * FROM clientes WHERE dniCliente = "."'".$this->dniCliente."'";
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if ($row_cnt==0){
            return false;
        }
        else{
            $cliente=$resultado->fetch_assoc();
            $this->dniCliente = $cliente["dniCliente"];
            $this->nombre = $cliente["nombre"];
            $this->direccion=$cliente["direccion"];
            $this->email=$cliente["email"];
            $this->pwd=$cliente["pwd"];
            $this->admin=$cliente["admin"];
        }
    }

    public function SacarDatos($conexion){
        $consulta="SELECT * FROM clientes WHERE dniCliente = "."'".$this->dniCliente."'";
        $resultado=$conexion->query($consulta);
        $cliente=$resultado->fetch_assoc();
        return $cliente;
    }

    public function InsertCliente($conexion){
        $consulta="SELECT * FROM clientes WHERE dniCliente = "."'".$this->dniCliente."'";
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if($row_cnt==0){
            $consulta="insert into clientes (dniCliente,nombre,direccion,email,pwd) values ("."'".$this->dniCliente."'".","."'".$this->nombre."'".","."'".$this->direccion."'".","."'".$this->email."'".","."'".$this->pwd."'".")";
            $conexion->query($consulta);
            return true;
        }
        else{
            return false;
        }
    }

    public function deleteClient($conexion){
        $consulta="DELETE FROM clientes WHERE dniCliente = "."'".$this->dniCliente."'";
        $conexion->query($consulta);
    }

    public function updateClient($conexion){
        $consulta="UPDATE clientes SET nombre = "."'".$this->nombre."'".", direccion="."'".$this->direccion."'".", email="."'".$this->email."'"." WHERE dniCliente="."'".$this->dniCliente."'";
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

    public function __get($var){
        return $this->$var;
    }

    public function __set($var,$valor){
      $this->$var=$valor;
    }

    static function listarProductos($conexion){
        $consulta="SELECT * FROM productos";
        return $result=$conexion->query($consulta);
    }

    public function InsertProducto($conexion){
        $consulta="insert INTO productos (nombre,foto,marca,categoria,precio) VALUES ("."'".$this->nombre."'".","."'".$this->foto."'".","."'".$this->marca."'".","."'".$this->categoria."'".","."'".$this->precio."'".")";
        $resultado=$conexion->query($consulta);
        $this->idProducto=mysqli_insert_id($conexion);
        return true;
    }

    public function SelectProducto($conexion){
        $consulta="SELECT * from productos WHERE productos.idProducto=".$this->idProducto;
        $resultado=$conexion->query($consulta);
        $row_cnt = $resultado->num_rows;
        if ($row_cnt==0){
            return false;
        }
        else{
            $producto=$resultado->fetch_assoc();
            $this->idProducto=$producto["idProducto"];
            $this->nombre=$producto["nombre"];
            $this->foto=$producto["foto"];
            $this->marca=$producto["marca"];
            $this->categoria=$producto["categoria"];
            $this->unidades=$producto["unidades"];
            $this->precio=$producto["precio"];
        }
    }

    public function deleteProducto($conexion){
        $consulta="DELETE FROM productos WHERE idProducto = "."'".$this->idProducto."'";
        $conexion->query($consulta);
    }

    public function updateproducto($conexion){
        $consulta="UPDATE productos SET nombre = "."'".$this->nombre."'".", foto="."'".$this->foto."'".", marca="."'".$this->marca."'".", categoria="."'".$this->categoria."'".", precio="."'".$this->precio."'"." WHERE idProducto=".$this->idProducto;
        $conexion->query($consulta);
    }

 }

 class Carrito{

    static function añadirLinea($idProducto,$nombre,$precio,$cantidad){
        $_SESSION["Carro"]["idProducto"][$_SESSION["total"]]=$_POST["idProducto"];
        $_SESSION["Carro"]["foto"][$_SESSION["total"]]=$_POST["foto"];
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
            $_SESSION["Carro"]["foto"]=array_values($_SESSION["Carro"]["foto"]);
            unset($_SESSION["Carro"]["foto"][$key]);
            $_SESSION["Carro"]["cantidad"]=array_values($_SESSION["Carro"]["cantidad"]);
            $_SESSION["total"]=$_SESSION["total"]-1;
           }
           
       }
    }
 }

 class Pedido{
     private $idPedido;
     private $fecha;
     private $dirEntrega;
     private $nTarjeta;
     private $fechaCaducidad;
     private $matriculaRepartidor;
     private $dniCliente;

     function __construct($idPedido,$fecha,$dirEntrega,$nTarjeta,$fechaCaducidad,$matriculaRepartidor,$dniCliente){
        $this->idPedido=$idPedido;
        $this->fecha=$fecha;
        $this->dirEntrega=$dirEntrega;
        $this->nTarjeta=$nTarjeta;
        $this->fechaCaducidad=$fechaCaducidad;
        $this->matriculaRepartidor=$matriculaRepartidor;
        $this->dniCliente=$dniCliente;
    }

     public function __get($var){
        return $this->$var;
    }

    public function __set($var,$valor){
      $this->$var=$valor;
    }

    static function listarPedidos($conexion){
        $consulta="SELECT * FROM pedidos";
        return $result=$conexion->query($consulta);
    }

    public function listarLineasPedidos($conexion){
        $consulta="SELECT * FROM lineaspedidos WHERE idPedido=".$this->idPedido;
       // var_dump($consulta);
        return $result=$conexion->query($consulta);
    }

    public function mostrarPedido($conexion){
        $consulta="SELECT * FROM pedidos WHERE idPedido=".$this->idPedido;
        $resultado=$conexion->query($consulta);
        $pedido=$resultado->fetch_assoc();
        $this->fecha=$pedido["fecha"];
        $this->dirEntrega=$pedido["dirEntrega"];
        $this->nTarjeta=$pedido["nTarjeta"];
        $this->fechaCaducidad=$pedido["fechaCaducidad"];
        $this->matriculaRepartidor=$pedido["matriculaRepartidor"];
        $this->dniCliente=$pedido["dniCliente"];
    }
    
    public function altaPedido($conexion){
        $consulta="SELECT MAX(idPedido) AS idPedido FROM pedidos";
        $idPedido=$conexion->query($consulta);
        
        $idPedido=$idPedido->fetch_assoc();
        $newId=($idPedido["idPedido"]+1);
        $this->idPedido=$newId;

        $consulta="INSERT INTO pedidos (idPedido,fecha,dirEntrega,dniCliente) VALUES ("."'".$this->idPedido."'".","."'".$this->fecha."'".","."'".$this->dirEntrega."'".","."'".$this->dniCliente."'".")";
        $conexion->query($consulta);
    }

    public function altaLineaPedido($conexion){
         for ($cont=$_SESSION["total"]-1; $cont > 0 ; $cont--) { 
             $consulta="INSERT INTO lineaspedidos (idPedido,nlinea,idProducto,cantidad) VALUES ("."'".$this->idPedido."'".","."'".$cont."'".","."'".$_SESSION["Carro"]["idProducto"][$cont]."'".","."'".$_SESSION["Carro"]["cantidad"][$cont]."'".")";
             
             $conexion->query($consulta);
         }
    }

    static function añadirLineaPedido($conexion, $idPedido,$idProducto,$cantidad){
        $consulta="SELECT MAX(nlinea) AS nlinea FROM lineaspedidos WHERE idPedido=".$idPedido;
        $nlinea=$conexion->query($consulta);
        $nlinea=$nlinea->fetch_assoc();
        $newlinea=($nlinea["nlinea"]+1);
        $consulta="INSERT INTO lineaspedidos (idPedido,nlinea,idProducto,cantidad) VALUES ("."'".$idPedido."'".","."'".$newlinea."'".","."'".$idProducto."'".","."'".$cantidad."'".")";
        $conexion->query($consulta);
        return $newlinea;
   }

    public function eliminarLineaPedido($conexion, $nlinea){
        $consulta="DELETE FROM lineaspedidos WHERE idPedido ='".$this->idPedido."' && nlinea=$nlinea";
        $conexion->query($consulta);
    }

    public function deletePedido($conexion){
        $consulta="DELETE FROM lineaspedidos WHERE idPedido = "."'".$this->idPedido."'";
        $conexion->query($consulta);
        $consulta="DELETE FROM pedidos WHERE idPedido = "."'".$this->idPedido."'";
        $conexion->query($consulta);
    }

    public function updatepedido($conexion){
        $consulta="UPDATE pedidos SET dirEntrega = "."'".$this->dirEntrega."'".", dniCliente="."'".$this->dniCliente."'"." WHERE idPedido=".$this->idPedido;
        $conexion->query($consulta);
    }

 }