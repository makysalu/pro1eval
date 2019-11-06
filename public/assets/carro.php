<section id="carro">
    <article id="productos_carro">
        <?php
            foreach ($_SESSION["Carro"] as $producto) {
                echo $producto["nombre"];
            }
            
        ?>
    </article>
</section>