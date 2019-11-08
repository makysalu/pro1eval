<?php
session_start();
if (isset($_SESSION['nombre'])){
	echo "Ya está validado";
}else{
	if (isset($_POST['enviar'])){
		if ($_POST['dni']=1 && $_POST['nombre']=1){
			$_SESSION['nombre']='paquito';
			echo "<a href='validar.php'>volver</a>";
		}

	}else require ('formulario.php');
}