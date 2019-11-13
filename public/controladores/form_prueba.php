<?php
    require "../assets/admin/inicioHTML.php";
?>
<div id="modal_cliente">
    
    <!--<form id="form_modal" action="gestion_clientes.php" method="post" enctype="multipart/form-data">
        <h2 id="titulo_modal">Modificar Cliente</h2>
        <label for="modal_dniCliente"><strong>Funcion </strong></label><input id="modal_dniCliente" name="funcion" type="text" value=""><br><br>
        <span><label for="modal_dniCliente"><strong>DNI: </strong></label><input id="modal_dniCliente" name="dniCliente" type="text" value=""></span>
        <span><label for="modal_nombre"><strong>Nombre: </strong></label><input id="modal_nombre" name="nombre" type="text"value=""></span>
        <span><label for="modal_direccion"><strong>Direccion: </strong></label><input id="modal_direccion" name="direccion" type="text" value=""></span>
        <span><label for="modal_email"><strong>Email: </strong></label><input id="modal_email" name="email" type="text" value=""></span>
        <span id="modal_pwdSpan"><label for="modal_pwd"><strong>Contraseña: </strong></label><input id="modal_pwd" name="pwd" type="password" value=""></span>
        <span><input class="boton_añadir" type="submit" value="enviarr"></span>
    </form>-->
    <!--<form id="form_modal" action="gestion_productos.php" method="post" enctype="multipart/form-data">
        <h2 id="titulo_modal">Modificar Productos</h2>
        <label for="modal_dniCliente"><strong>Funcion </strong></label><input id="modal_dniCliente" name="funcion" type="text" value=""><br><br>
        <span><label for="modal_idProducto"><strong>ID Producto: </strong></label><input id="modal_idProducto" name="idProducto" type="text" value=""></span>
        <span><label for="modal_nombre"><strong>Nombre: </strong></label><input id="modal_nombre" name="nombre" type="text"value=""></span>
        <span><label for="modal_marca"><strong>Marca: </strong></label><input id="modal_marca" name="marca" type="text" value=""></span>
        <span><label for="modal_Precio"><strong>Categoria: </strong></label><input id="modal_categoria" name="categoria" type="text" value=""></span>
        <span><label for="modal_Precio"><strong>Precio: </strong></label><input id="modal_precio" name="precio" type="text" value=""></span>
        <span id="modal_fileSpan"><label for="modal_file"><strong>Imagen: </strong></label><input id="modal_file" name="file" type="file" value=""></span>
        <span><input class="boton_añadir" type="submit" value="enviarr"></span>
    </form>-->
    <form id="form_modal" action="gestion_pedidos.php" method="post" enctype="multipart/form-data">
        <h2 id="titulo_modal">Pedidos</h2>
        <label for="modal_dniCliente"><strong>Funcion </strong></label><input id="modal_dniCliente" name="funcion" type="text" value=""><br><br>
        <input id="modal_idProducto" name="idPedido" type="text" value=""><br><br>
        <span><label for="modal_nombre"><strong>Fecha: </strong></label><input id="modal_nombre" name="fecha" type="text"value=""></span><br><br>
        <span><label for="modal_marca"><strong>Direccion: </strong></label><input id="modal_marca" name="direccion" type="text" value=""></span><br><br>
        <span><label for="modal_marca"><strong>dniCliente: </strong></label><input id="modal_marca" name="dniCliente" type="text" value=""></span><br><br>
        <span><input class="boton_añadir" type="submit" value="enviarr"></span>
    </form>
    <!--<form id="form_modal" action="gestion_pedidos.php" method="post" enctype="multipart/form-data">
        <h2 id="titulo_modal">Pedidos</h2>
        <input id="modal_idProducto" name="idPedido" type="text" value=""><br><br>
        <label for="modal_dniCliente"><strong>Funcion </strong></label><input id="modal_dniCliente" name="funcion" type="text" value=""><br><br>
        <span><label for="modal_nombre"><strong>Producto: </strong></label><input id="modal_nombre" name="idProducto" type="text"value=""></span><br><br>
        <span><label for="modal_marca"><strong>Cantidad: </strong></label><input id="modal_marca" name="cantidad" type="text" value=""></span><br><br>
        <span><input class="boton_añadir" type="submit" value="enviarr"></span>
    </form>-->
   
</div>
<?php
    require "../assets/admin/footer_admin.php";
    require "../assets/admin/cierreHTML.php";
?>