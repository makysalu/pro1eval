<?php
   // $clientes= Usuario::listarClientes($base->conexion);
?>
<div class="modal modal_pedido">
    <form id="form_modal" action="">
        <h2 id="titulo_modal">Modificar Pedido</h2>
        <input type="hidden" id="modal_totallinea" value="">
        <span id=modal_idPedidoSpan><label for="modal_idPedido"><strong>ID Pedido: </strong></label><input id="modal_idPedido" type="text"value=""></span>
        <span><label for="modal_direccion"><strong>Direccion: </strong></label><input id="modal_direccion" type="text" value=""></span>
        <!--<span><label for="modal_dniCliente"><strong>DNI Cliente: </strong></label><input id="modal_dniCliente" type="text" value=""></span>-->
        <span>
            <label for="modal_dniCliente"><strong>DNI Cliente: </strong></label>
            <select id="select_dniCliente">
            </select>
        </span>
        <span><input class="boton_cancelar" type="button" value="Cancelar"><input class="boton_modificar" type="button" value="Modificar"><input class="boton_añadir" type="button" value="Añadir"></span>
    </form>
   
</div>