	<?php
	echo "<form action='' >";
	echo "Nombre: <input type='text' name='nombre' value='".$valortxt['nombre']."'>".$errortxt['nombre']."<br>";
	echo "apellidos: <input type='text' name='apellidos' value='".$valortxt['apellidos']."'>".$errortxt['apellidos']."<br>";
	echo "domicilio: <input type='text' name='domicilio' value='".$valortxt['domicilio']."'>".$errortxt['domicilio']."<br>";
	echo "<input type='submit' name='enviar'><br>";
	echo "</form>";