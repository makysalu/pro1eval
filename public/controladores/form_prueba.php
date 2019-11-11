<?php
    require "../assets/admin/inicioHTML.php";
?>
<div id="modal_cliente">
    
    <form id="form_modal" action="listar_clientes.php" method="post" enctype="multipart/form-data">
        <h2 id="titulo_modal">Modificar Cliente</h2>
        <label for="modal_dniCliente"><strong>Cliente </strong></label><input id="modal_dniCliente" name="funcion" type="text" value="añadir"><br><br>
        <input id="modal_idProducto" name="dniCliente" type="text" value=""><br><br>
        <span><label for="modal_nombre"><strong>Nombre: </strong></label><input id="modal_nombre" name="nombre" type="text"value=""></span><br><br>
        <span><label for="modal_marca"><strong>Marca: </strong></label><input id="modal_marca" name="direccion" type="text" value=""></span><br><br>
        <span><label for="modal_categoria"><strong>Categoria: </strong></label><input id="modal_categoria" name="email" type="text" value=""></span><br><br>
        <span><label for="modal_precio"><strong>Precio: </strong></label><input id="modal_precio" name="pwd" type="text" value=""></span><br><br>
        <span id="modal_fileSpan"><label for="modal_imagen"><strong>Imagen: </strong></label><input id="modal_imagen" name="archivo" type="file" value=""></span><br><br>
        <span><input class="boton_añadir" type="submit" value="enviarr"></span>
    </form>
   
</div>
<?php
    require "../assets/admin/footer_admin.php";
    require "../assets/admin/cierreHTML.php";
?>