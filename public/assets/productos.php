<section>
    <article id="productos_Cliente">
        <?php     
            foreach($productos as $producto){
                echo "<div class='productoCliente'>";
                    echo "<a href='detalle.php?idProducto=".$producto["idProducto"]."'>";
                    echo "<img src="."'./img/productos/".$producto['foto']."' alt=''>";
                    echo "<p>";
                        echo "<span id='datoMarca'>".$producto["marca"]."</span><br>";
                        echo "<span id='datoNombre'>".$producto["nombre"]."</span><br>";
                        echo "<span id='datoPrecio'>".$producto["precio"]."€</span>";
                    echo "</p>";
                    echo "</a>";
                echo "</div>";
            }
        ?>
    </article>
</section>