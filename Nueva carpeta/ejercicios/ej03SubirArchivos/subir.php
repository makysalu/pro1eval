<?php
$nombre=$_FILES['fichero']['name'];
if (is_uploaded_file($_FILES['fichero']['tmp_name'])){
	$partes=explode('.', $nombre);
	$npartes=count($partes);
	if ($npartes>0){
		$dir='img/';
		if(!is_dir($dir)) mkdir($dir);
		if(is_file($dir.$nombre)){
			$idUnico=uniqid();		
			$nombre=$partes[0];
			for ($i=1; $i <$npartes-1 ; $i++) { 
				$nombre.=".".$partes[$i];
			}
			$nombre.="_".$idUnico.".".$partes[$npartes-1];
		}
		move_uploaded_file($_FILES['fichero']['tmp_name'], $dir.$nombre);
		echo "el fichero $nombre se ha subido correctamente";
		
	}
	else echo "el nombre no tiene extensión";
}else 
	echo "no se ha podido subir el fichero";
