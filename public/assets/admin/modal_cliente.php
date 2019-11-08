<?php
    require "./assets/admin/inicioHTML.php";
    require "./assets/admin/header_admin.php";
?>
<div id="modal_cliente">
    
    <form id="form_modal" action="">
        <h2 id="titulo_modal">Modificar Cliente</h2>
        <label for="modal_dniCliente"><strong>DNI: </strong></label><input id="modal_dniCliente" type="text" value=""><br><br>
        <label for="modal_nombre"><strong>Nombre: </strong></label><input id="modal_nombre" type="text"value=""><br><br>
        <label for="modal_direccion"><strong>Direccion: </strong></label><input id="modal_direccion" type="text" value=""><br><br>
        <label for="modal_email"><strong>Email: </strong></label><input id="modal_email" type="text" value=""><br><br>
        <span><input class="boton_cancelar" type="button" value="Cancelar"><input class="boton_modificar" type="button" value="Modificar"><input class="boton_añadir" type="button" value="Añadir"></span>
    </form>
   
</div>
<?php
    require "./assets/admin/footer_admin.php";
    require "./assets/admin/cierreHTML.php";
?>