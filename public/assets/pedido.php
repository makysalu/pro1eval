<section id="seccion_pedido">
    <article>
        <header class="titulo_pedido">Pedido</header>
        <table class="tabla_pedido" id="valores_pedido">
            <thead>
                <th>
                    Id Pedido
                </th>
                <th>
                    Fecha
                </th>
                <th>
                    DNI Cliente
                </th>
            </thead>
            <tbody>
                <td>
                    <?php echo $pedido->idPedido; ?>
                </td>
                <td>
                    <?php echo $pedido->fecha; ?>
                </td>
                <td>
                    <?php echo $pedido->dniCliente; ?>
                </td>
            </tbody>
        </table>
    </article>
    <article>
    <header class="titulo_pedido">Lineas Pedido</header>
        <table class="tabla_pedido" id="lienas_pedido">
            <thead>
                <th>
                    Id Linea
                </th>
                <th>
                    Nombre Producto
                </th>
                <th>
                    Cantidad
                </th>
                <th>
                    Precio
                </th>
            </thead>
            <tbody>
            <?php
                for ($cont=0; $cont < $_SESSION["total"]; $cont++) {
                    echo "<tr>";
                        echo "<td>".$cont."</td>";
                        echo "<td>".$_SESSION["Carro"]["nombre"][$cont]."</td>";
                        echo "<td>".$_SESSION["Carro"]["cantidad"][$cont]."</td>";    
                        echo "<td>".$_SESSION["Carro"]["precio"][$cont]."</td>";
                    echo "</tr>";
                    }
            ?>
                <tr>
                    <td colspan="2" id="confirmar_vacio"></td>
                    <td id="confirmar_total">Precio Total</td>
                    <td id="confirmar_totalres"><?php echo $total; ?></td>
                </tr>
                
            </tbody>
        </table>
    </article>
    
    
</section>