<header id="cabecera">
    <nav id="navegador_cabecera">
        <ul>
            <li class="menu_cabecera"><?php echo $_SESSION["nombre"];?></li>
            <a href="validar.php"><li class="menu_cabecera">Desconectar</li></a>
        </ul>
    </nav>
    <div id="fondo_cabecera">
        URBAN SHOTS
    </div>
</header>
<nav id="navegador_principal"> 
   <ul>
       <a href="principal.php"><li class="menu_principal">Novedades</li></a>
       <li class="menu_principal">Categorias</li>
       <li class="menu_principal">Marcas</li>
       <a href="Vercarrito.php"><li class="menu_principal imagen_carro"><img src="./img/shopping-cart.png" alt="carrito"><?php echo $_SESSION["total"];?></li></a>
   </ul> 
</nav>