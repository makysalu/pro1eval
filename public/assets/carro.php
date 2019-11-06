<section id="carro">
    <article id="productos_carro">
        <span>PRODUCTO</span>
        <span>DESCRIPCIÓN</span>
        <span>UNIDADES</span>
        <span>VALOR</span>
        <span>BORRAR</span>
        <?php

            for ($cont=0; $cont < $_SESSION["total"]; $cont++) { 
                echo "<img src="."'./img/productos/".$_SESSION["Carro"]['foto'][$cont]."' alt=''>";
                echo "<span>".$_SESSION["Carro"]["nombre"][$cont]."</span>";
                echo "<span>".$_SESSION["Carro"]["cantidad"][$cont]."</span>";
                echo "<span>".$_SESSION["Carro"]["precio"][$cont]."</span>";
                echo "<span>Borrar</span>";
            }
        ?>
    </article>
</section>