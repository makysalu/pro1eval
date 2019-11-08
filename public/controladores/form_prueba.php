<?php
    require "../assets/admin/inicioHTML.php";
?>
<div id="modal_cliente">
    
    <form id="form_modal" action="listar_clientes.php" method="post">
        <h2 id="titulo_modal">Modificar Cliente</h2>
        <label for="modal_dniCliente"><strong>Cliente </strong></label><input id="modal_dniCliente" name="cliente" type="text" value="añadir"><br><br>
        <label for="modal_dniCliente"><strong>DNI: </strong></label><input id="modal_dniCliente" name="dniCliente" type="text" value=""><br><br>
        <label for="modal_nombre"><strong>Nombre: </strong></label><input id="modal_nombre" name="nombre" type="text"value=""><br><br>
        <label for="modal_direccion"><strong>Direccion: </strong></label><input id="modal_direccion" name="direccion" type="text" value=""><br><br>
        <label for="modal_email"><strong>Email: </strong></label><input id="modal_email" name="email" type="text" value=""><br><br>
        <span><input class="boton_añadir" type="submit" value="Añadir"></span>
    </form>
   
</div>
<?php
    require "../assets/admin/footer_admin.php";
    require "../assets/admin/cierreHTML.php";
?>