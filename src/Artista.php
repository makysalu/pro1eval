<?php
class Artista extends BBDD{
    private $Id_artista;
    private $Id_usuario;
    
    public $datos=array();
    
    public function comprobarCorreo($post){
        $consulta="select * from usuario where usuario.Email='".$post['Email']."'";
        $resultado=$this->conexion->query($consulta);
        foreach ($resultado as $usuario) {
            $usuario['Id_usuario'];
        }
        if(empty($usuario['Id_usuario'])){
            return true;
        }
        else{
            return false;
        }
    }

    /* Introducir Usuarios*/
    public function insertarartista($id){
        $consulta="insert into artista (Id_usuario) values (".$id.")";
        echo $consulta;
        $this->conexion->query($consulta);
        return true;
    }
    
}