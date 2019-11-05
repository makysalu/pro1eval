<section id="login">
    <header id="cabecera_login">
        Iniciar Sesion
    </header>
    <article id="formlogin">
        <form  class="login" action="" method="post" enctype="multipart/form-data" onsubmit="return comprobarLogin('fromlogin')">
            <label for="DNI"><strong>DNI: </strong></label><input type="text" name="DNI" id="DNI"><br><br>
            <label for="Password"><strong>Contraseña: </strong></label><input type="password" name="Password" id="Password"><br><br>       
            <div id="boton_login">
                <input type="submit" value="ENVIAR" name='Loguear'>  
            </div>
        </form>
    </article>
</section>