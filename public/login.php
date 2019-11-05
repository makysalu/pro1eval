
        <!--<div id="login">
            <dt>
                INICIAR SESION
            </dt>
            <Dd>
                <form action="" method="post">
                    <input type="text" placeholder=" Email"/>
                    <input type="text" placeholder=" Constraseña"/>
                    <input type="submit" value="Iniciar Sesion"/>
                </form>
            </Dd>
        </div>-->
  <?php 
        require "./assets/inicioHTML.php";
        include "./assets/header.php";
    ?>
        <script>
             pintarlogin();
             function pintarlogin(){
    var div = document.createElement("div");
    div.id="login";
        var dt=document.createElement("dt");
        dt.innerHTML="INICIAR SESION";
        var dd=document.createElement("dd");
        var form=document.createElement("form");
        dd.appendChild(form);
            var input=document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("placeholder"," Email");
            form.appendChild(input);
            var input=document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("placeholder"," Constraseña");
            form.appendChild(input);
            var input=document.createElement("input");
            input.setAttribute("type","submit");
            input.setAttribute("value","Enviar");
            form.appendChild(input);

    
    div.appendChild(dt);
    div.appendChild(dd);
    document.write(div);
    console.log(div);
    
}
        </script>
    <?php    
        require "./assets/cierreHTML.php";
    ?>
    
       