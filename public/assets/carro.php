<section id="carro">
    <form action="" method="post">
    <article id="productos_carro">
        <span class="titulo_elemento">IMAGEN</span>
        <span class="titulo_elemento">PRODUCTO</span>
        <span class="titulo_elemento">UNIDADES</span>
        <span class="titulo_elemento">VALOR</span>
        <span class="titulo_elemento">BORRAR</span>
        <?php
            for ($cont=0; $cont < $_SESSION["total"]; $cont++) {
                //echo "<span class='imagen_elemento'><img src="."'./img/productos/".$_SESSION["Carro"]['foto'][$cont]."' alt='fotoejem'></span>";
                echo "<span class='imagen_elemento'><img src='./img/productos/BoxLogo.jpg' alt='fotoejem'></span>";
                echo "<span class='atributo_elemento'>".$_SESSION["Carro"]["nombre"][$cont]."</span>";
                echo "<span class='atributo_elemento'><input type='number' name='cantidad[]' min='0' max='100' value='".$_SESSION['Carro']['cantidad'][$cont]."' required></span>";
                echo "<span class='atributo_elemento'>".$_SESSION["Carro"]["precio"][$cont]."</span>";
                echo "<span class='atributo_elemento'><input type='button' value='Borrar'></span>";
            }
        ?>
        <span class=""></span>
    </article>
    <input type="submit" value="Actualizar" name="actualizar"><br>
    <a href="confirmar.php"><input type='button' value='Confirmar Pedido'></a>
    <a href="principal.php"><input type='button' value='Seguir Comprando'></a>
    </form>
</section>