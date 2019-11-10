<header id="header_admin">
  <div id="logo">
    <img id="imagen_logo" src="img/icon.png" width="70" height="70"/>
    <div id="logo-header">
        <span class="site-name"><?php echo $_SESSION["nombre"]; ?></span>
        <a href="validar.php"><span class="site-desc">Cerrar</span></a>
    </div>
  </div>
</header>
<nav>
  <ul>
      <a href="admin_clientes.php"><li class="menu_admin menu_select" id="menu_adminclientes"><img src="img/target.png" class="imagenes">Gestion Clientes</li></a>
      <a href="admin_productos.php"><li class="menu_admin" id="menu_productos"><img src="img/box.png" class="imagenes">Gestion Productos</li></a>
      <a href="admin_pedidos.php"><li class="menu_admin" id="menu_pedidos"><img src="img/choices.png" class="imagenes">Gestion Pedidos</li></a>
  </ul>
</nav>