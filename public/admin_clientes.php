<?php
    session_start();
    if(!isset($_SESSION["admin"])){
        header("location:validar.php");
    }
    require "./assets/admin/inicioHTML.php";
    require "./assets/admin/header_admin.php";
    require "./assets/admin/modal_cliente.php";
?>
   <section id='listado_usuario'>
        <table id="lista_clientes">
            <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Operaciones</th>
            </tr>               
        </table>
        <input class="boton_nuevo" type="button" value="Nuevo Cliente">
    </section>
<?php 
    require "./assets/admin/footer_admin.php";
    require "./assets/admin/cierreHTML.php";
         
