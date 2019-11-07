<section id="carro">
    <article id="productos_carro">
        <span class="titulo_elemento">IMAGEN</span>
        <span class="titulo_elemento">PRODUCTO</span>
        <span class="titulo_elemento">UNIDADES</span>
        <span class="titulo_elemento">VALOR</span>
        <span class="titulo_elemento">BORRAR</span>
        <?php
            for ($cont=1; $cont <= $_SESSION["total"]; $cont++) { 
                //echo "<span class='imagen_elemento'><img src="."'./img/productos/".$_SESSION["Carro"]['foto'][$cont]."' alt='fotoejem'></span>";
                echo "<span class='imagen_elemento'><img src='./img/productos/BoxLogo.jpg' alt='fotoejem'></span>";
                echo "<span class='atributo_elemento'>".$_SESSION["Carro"]["nombre"][$cont]."</span>";
                echo "<span class='atributo_elemento'><input type='number' name='cantidad' min='1' max='100' value='".$_SESSION['Carro']['cantidad'][$cont]."' required></span>";
                echo "<span class='atributo_elemento'>".$_SESSION["Carro"]["precio"][$cont]."</span>";
                echo "<span class='atributo_elemento'>Borrar</span>";
            }
        ?>
    </article>
</section>