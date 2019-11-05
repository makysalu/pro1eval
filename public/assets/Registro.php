<section id="registro">
            <header>
                    Registro 
            </header>
            <article>
                <form id="formregistro" class="registro" action="registro.php" method="post" enctype="multipart/form-data" onsubmit="return comprobarRegistro('formregistro')">
                <label for="Nombre"><strong>Nombre: </strong></label><input type="text" name="Nombre" id="Nombre"><br></br>
                <label for="Apellidos"><strong>Apellidos: </strong></label><input type="text" name="Apellidos" id="Apellidos"><br></br>
                <label for="Pais"><strong>País: </strong></label><input type="text" name="Pais" id="Pais"><br></br>
                <label for="Email"><strong>Email: </strong></label><input type="text" name="Email" id="Email"><br></br>
                <label for="Password"><strong>Contraseña: </strong></label><input type="text" name="Password" id="Password"><br></br>
                <label for="Password2"><strong>Repite la Contraseña: </strong></label><input type="text" id="Password2"><br></br>
                <p id="condicionesP">
                    <input name="Condiciones" id="Condiciones" type="checkbox" required/>
                    Aceptas las <a href="condiciones.html">condiciones</a> de servicio.
                </p>
                <div>
                    <input type="submit" value="ENVIAR" name='enviar'>
                </div>
                </form>
            </article>
        </section>