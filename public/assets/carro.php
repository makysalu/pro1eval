<section id="carro">
    <form action="" method="post">
    <article id="productos_carro">
        <div class="titulo_elemento">IMAGEN</div>
        <div class="titulo_elemento">PRODUCTO</div>
        <div class="titulo_elemento">UNIDADES</div>
        <div class="titulo_elemento">VALOR</div>
        <div class="titulo_elemento">BORRAR</div>
        <?php
            for ($cont=0; $cont < $_SESSION["total"]; $cont++) {
                echo "<div class='imagen_elemento'><img src="."'./img/productos/".$_SESSION["Carro"]['foto'][$cont]."' alt='fotoejem'></div>";
                //echo "<div class='imagen_elemento'><img src='./img/productos/BoxLogo.jpg' alt='fotoejem'></div>";
                echo "<div class='atributo_elemento'>".$_SESSION["Carro"]["nombre"][$cont]."</div>";
                echo "<div class='atributo_elemento'><input type='number' name='cantidad[]' min='0' max='100' value='".$_SESSION['Carro']['cantidad'][$cont]."' required></div>";
                echo "<div class='atributo_elemento'>".$_SESSION["Carro"]["precio"][$cont]."</div>";
                echo "<div class='atributo_elemento'><img id='logo_close' src='./img/close.png' alt='fotocierre'></div>";
            }
            echo "<div><a href='principal.php'><input id='boton_seguirComprando' type='button' value='Seguir Comprando'></a></div>";
            echo "<div></div><div></div><div></div>";
            echo "<div class='total_carro'>";
                echo "<div><span class='titulo_carroTotal'>Subtotal</span><span class='valor_carroTotal'>".$total."</span></div>";
                echo "<div><span class='titulo_carroTotal'>Gastos trasporte</span><span class='valor_carroTotal'>0</span></div>";
                echo "<div id='Total_Carro'><span class='titulo_carroTotal'>Precio total</span><span class='valor_carroTotal'>".$total."</span></div>";
                echo "<div>";
                    echo "<input id='boton_actualizarCarro' type='submit' value='Actualizar' name='actualizar'>";
                    echo "<a href='confirmar.php'><input id='boton_confirmarCarro' type='button' value='Confirmar'></a>";
                echo "</div>";
            echo "</div>";
        ?>
    </article>
    
    
    </form>
</section>