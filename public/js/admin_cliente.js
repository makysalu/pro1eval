/*Pintamos los clientes*/
function listarClientes() {
    //si estiste lo elimina
    if($(".lista_admin")){
        $(".lista_admin").remove();
        $("#boton_lista").remove();
    }
    //Realiza peticion ajax para sacar todos los clientes
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){ 
            let respuesta=JSON.parse(response); 
            let table=document.createElement("div");
            table.className="lista_admin";
            let span=document.createElement("span");
                span.id="fila-0";
                let div = document.createElement("div");
                div.innerText="DNI";
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Nombre";
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Direccion";
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Email";
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Operaciones";
                div.className="Titulo_lista";
                span.append(div);
            table.append(span)
                let cont=1;
            for(let i in respuesta){
                span=document.createElement("span");
                span.id="fila-"+cont;
                    div = document.createElement("div");
                    div.innerText=respuesta[i].dniCliente;
                    div.id="columna_dni";
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].nombre;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].direccion;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].email;
                    span.append(div);
                    div = document.createElement("div");
                    div.id="fila-"+cont;
                        //crea boton para eliminar cliente con el dni del cliente
                        img=document.createElement("img");
                        img.setAttribute("src","img/close.png");
                        img.id="boton_eliminar."+respuesta[i].dniCliente;
                        img.className = "boton_eliminar boton-menu";
                        //le añadimos la funcionalidad
                        img.onclick=function(){confirmar_deleteC($(this))};
                    div.append(img);
                        //crea boton para modificar cliente con el dni del cliente
                        img=document.createElement("img");
                        img.setAttribute("src","img/writing.png");
                        img.id="boton_editar."+respuesta[i].dniCliente;
                        img.className = "boton_editar boton-menu";
                        //le añade la funcionalidad
                        img.onclick=function(){MODeditar_cliente(this)};
                    div.append(img);
                span.append(div);
            table.append(span);
            cont++;
            }       
                    //pintamos boton para añadir cliene
                    input = document.createElement("input");
                    input.id="boton_lista";
                    input.className = "boton_nuevo";
                    //añadimos funcionalidad
                    input.onclick=function(){MODañadir_cliente(this)};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo");
                
                $("#gestion_usuario").append(table);
                $("#gestion_usuario").append(input);
            botones_cliente();
        }
    });
}

/*Modal añadir cliente*/
function MODañadir_cliente() {
    //mostramos modal añadir cliente
    $("#titulo_modal").text("Añadir Cliente");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_dniCliente").attr('readonly', false);
    $("#modal_dniCliente").css('background-color', "white");
    $("#modal_pwdSpan").css('display','block');
    //limpiamos botones
    $("#modal_dniCliente").val("");
    $("#modal_nombre").val("");
    $("#modal_direccion").val("");
    $("#modal_email").val("");
    $("#modal_pwd").val("");
    //añadimos el boton añadir
    $(".boton_añadir").unbind();
    $(".boton_añadir").click(añadir_cliente);
}

/*Añadir cliente*/
function añadir_cliente() {
    //sacamos valor del modal añadir cliente
    let dniCliente=$("#modal_dniCliente").val();
    let nombre=$("#modal_nombre").val();
    let direccion=$("#modal_direccion").val();
    let email=$("#modal_email").val();
    let pwd=$("#modal_pwd").val();
    //comprobamos campos vacios
    if((dniCliente=="")||(nombre==""),(direccion==""),(email=="")){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios");  
    }
    else{
        //realizapeticion para añadir cliente
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_clientes.php",
            data: {funcion:"añadir",dniCliente,nombre,direccion,email,pwd},
            success: function(response){
                let respuesta=JSON.parse(response);
                //sacamos respuesta de la peticion
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                if(respuesta[0]==false){
                    if(respuesta[1]==1){
                        $("#contenido_msg").text("Error Campos Vacios");  
                    }
                    if(respuesta[1]==2){
                        $("#contenido_msg").text("No se ha podido Introducir el Cliente"); 
                    } 
                }
                else{
                    $("#contenido_msg").text("Se ha Introducido un Nuevo Cliente");
                    PintarCliente(dniCliente,nombre,direccion,email);
                }   
            }
        });
    }
}

/*Pintar cliente*/
function PintarCliente(dniCliente,nombre,direccion,email){
    span=document.createElement("span");
        div = document.createElement("div");
        div.innerText=dniCliente;
        span.append(div);
        div = document.createElement("div");
        div.innerText=nombre;
        span.append(div);
        div = document.createElement("div");
        div.innerText=direccion;
        span.append(div);
        div = document.createElement("div");
        div.innerText=email;
        span.append(div);
        div = document.createElement("div");
            //creamos boton para eliminar cliente con el dnicliente
            img=document.createElement("img");
            img.setAttribute("src","img/close.png");
            img.id="boton_eliminar."+dniCliente;
            img.className = "boton_eliminar boton-menu";
            //añadimos funcionalidad
            img.onclick=function(){confirmar_deleteC($(this))};
        div.append(img);
            //pintamos boton modificar cliente con el dnicliente
            img=document.createElement("img");
            img.setAttribute("src","img/writing.png");
            img.id="boton_editar."+dniCliente;
            img.className = "boton_editar boton-menu";
            //añadimos funcionalidad
            img.onclick=function(){MODeditar_cliente(this)};
        div.append(img);
            
    span.append(div);
    $(".lista_admin").append(span);
    botones_cliente();
}

function MODeditar_cliente(boton){
    //sacamos el dni del cliente
    boton=boton.id;
    boton = boton.split(".");
    dniCliente=boton[1];
    //mostramos modal para editar cliente
    $("#titulo_modal").text("Modificar Cliente");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
    $("#modal_dniCliente").val(dniCliente);
    $("#modal_dniCliente").attr('readonly', true);
    $("#modal_dniCliente").css('background-color', "#6d6d6d4b");
    $("#modal_pwdSpan").css('display','none');
    
    //añadimos funcion modificar cliente
    $(".boton_modificar").unbind();
    $(".boton_modificar").click(modificar_cliente);
    datoscliente(dniCliente);
    
}

/*Sacar datos Cliente*/
function datoscliente(dniCliente) {
    //sacamos informacion del cliente
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data: {funcion: "datos",dniCliente:dniCliente},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            //rellenamos el modal modificar pedido
            $("#modal_dniCliente").val(respuesta["dniCliente"]);
            $("#modal_nombre").val(respuesta["nombre"]);
            $("#modal_direccion").val(respuesta["direccion"]);
            $("#modal_email").val(respuesta["email"]);
            
        }
    });
}

/*Confirmamos la eliminacion*/
function confirmar_deleteC(boton){ 
    //sacamos dniCliente
    let dniCliente=boton.attr("id");
    dniCliente = dniCliente.split(".");
    dniCliente=dniCliente[1];
    //mostramos confirmar
    $("#modalconfirmar").css("display","block");
    //añadir funcionalidad
    $(".confirmar_msg").unbind();
    $(".confirmar_msg").click(function(){eliminar_cliente(boton,dniCliente)});   
}

/*Eliminamos Cliente*/
function eliminar_cliente(boton,dniCliente){
    //realizamos la peticion para eliminar cliente
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data: {funcion: "eliminar",dniCliente},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            //sacamos la respuesta
            if(respuesta){
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                $("#contenido_msg").text("As eliminado el Cliente "+dniCliente);
                boton.parent().parent().remove();
            }
        }
    });
    
}

/*modificamos cliente*/
function modificar_cliente() {
    //sacamos valores del modal modificar cliente
    let dniCliente=$("#modal_dniCliente").val();
    let nombre=$("#modal_nombre").val();
    let direccion=$("#modal_direccion").val();
    let email=$("#modal_email").val();
    //comprobamos campos vacios
    if((dniCliente=="")||(nombre==""),(direccion==""),(email=="")){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios");  
    }
    else{
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_clientes.php",
            data: {funcion:"modificar",dniCliente,nombre,direccion,email},
            datatype:"json",
            success: function(response){     
                let respuesta=JSON.parse(response);
                //sacar respuesta
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                console.log(respuesta);
                if(respuesta[0]==false){
                    $("#contenido_msg").text("Error Campos Vacios");
                }
                else{
                    $("#contenido_msg").text("Se ha Modificado el Cliente "+dniCliente);
                }  
                listarClientes(); 
            }
        });
    }
}

/*botones para modales*/
function botones_cliente(){
    $(".boton_cancelar").click(ocultar_modal);
    $(".cerrar_msg").click(cerrarMSG);
}
/*oculta modal*/
function ocultar_modal() {
    $(".modal_form").css("display","none");
}
/*Cierra mensaje*/
function cerrarMSG(){
    $(".modalMSG").css("display","none");
}