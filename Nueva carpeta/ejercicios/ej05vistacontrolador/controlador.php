
<?php
require "vistas/inicio.html";
$error=False;
$errortxt['nombre']='';
$errortxt['apellidos']='';
$errortxt['domicilio']='';
$valortxt['nombre']='';
$valortxt['apellidos']='';
$valortxt['domicilio']='';
if (isset($_GET['enviar'])) {
	if (empty($_GET['nombre'])){
		$errortxt['nombre']="No se puede dejar en blanco el nombre";
		$error=True;}
	else $valortxt['nombre']=$_GET['nombre'];
	
	if (empty($_GET['apellidos'])){
		$errortxt['apellidos']="No se puede dejar en blanco el apellidos";
		$error=True;}
	else $valortxt['apellidos']=$_GET['apellidos'];
	if (empty($_GET['domicilio'])){
		$errortxt['domicilio']="No se puede dejar en blanco el domicilio";
		$error=True;}
	else $valortxt['domicilio']=$_GET['domicilio'];
	if (!$error){
		foreach ($_GET as $key => $value) {
			$vector[$key]=$value;
			echo "$key : ".$vector[$key]."<br>";}
		}
	}
	
if (!isset($_GET['enviar']) || $error){	
	require "vistas/formulario.php";
		}	
	require "vistas/fin.html"?>
