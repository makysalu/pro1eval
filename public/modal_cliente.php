<?php
    require "./assets/admin/inicioHTML.php";
    require "./assets/admin/header_admin.php";
?>

<div id="modal_cliente">
    
    <form action="">
        <h2>Modificar Cliente</h2>
        <label for="modal_dni"><strong>DNI: </strong></label><input id="modal_dniCliente" type="text"><br><br>
        <label for="modal_nombre"><strong>Nombre: </strong></label><input id="modal_nombre" type="text"><br><br>
        <label for="modal_direccion"><strong>Direccion: </strong></label><input id="modal_direccion" type="text"><br><br>
        <label for="modal_email"><strong>Email: </strong></label><input id="modal_email" type="text"><br><br>
        <span><input class="boton_cancelar" type="button" value="Borrar"><input class="boton_modificar" type="button" value="Modificar"></span>
    </form>
   
</div>
    <!--<h2>Modificar Usuario</h2>
    

<?php
    require "./assets/admin/footer_admin.php";
    require "./assets/admin/cierreHTML.php";
?>