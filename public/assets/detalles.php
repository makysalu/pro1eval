<section class="seccion_detalles">
    <article class="detalles_Producto">
        <div id="imgProducto">
            <img src="./img/productos/<?php echo $producto->foto;?>" alt="">
        </div>
        <form class="valores_Producto" class="valores" action="Vercarrito.php" method="post" enctype="multipart/form-data" onsubmit="return comprobarLogin('fromlogin')">
            <div class="valores">
                <input type="hidden" name="idProducto" value="<?php echo $producto->idProducto;?>" readonly>
                <input type="hidden" name="foto" value="<?php echo $producto->foto;?>" readonly>
                <input type="text" name="marca" value="<?php echo $producto->marca;?>" readonly><br>
                <input type="text" name="nombre" value="<?php echo $producto->nombre;?>" readonly>
                <br><br>
                <input type="text" name="precio" value="<?php echo $producto->precio;?>" readonly><br>
                <span><label for="cantidad">Cantidad: <input type="number" name="cantidad" min="1" max="100" value="1" required><br></span>
                <span>Incl Iva más envío</span>
            </div>
            <div>
                <input type="button" value="Elegir Talla">
                <br><br>
                <input type="submit" value="Comprar" name="Comprar">
            </div>
        </form>
    </article>
</section>