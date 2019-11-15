function listarClientes() {
    if($("#lista_admin")){
        $("#lista_admin").remove();
        $("#boton_lista").remove();
    }
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){ 
            let respuesta=JSON.parse(response); 
            let table=document.createElement("div");
            table.id="lista_admin";
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
                        let input = document.createElement("input");
                        input.id="boton_editar."+respuesta[i].dniCliente;
                        input.onclick=function(){MODeditar_cliente(this)};
                        input.className = "boton_editar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Modificar");
                    div.append(input);
                        input = document.createElement("input");
                        input.id="boton_eliminar."+respuesta[i].dniCliente;
                        input.onclick=function(){confirmar_deleteC($(this))};
                        input.className = "boton_eliminar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Eliminar");
                    div.append(input);
                span.append(div);
            table.append(span);
            cont++;
            }  
                    input = document.createElement("input");
                    input.id="boton_lista";
                    input.className = "boton_nuevo";
                    input.onclick=function(){MODañadir_cliente(this)};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo Cliente");
                
                $("#gestion_usuario").append(table);
                $("#gestion_usuario").append(input);
            botones_cliente();
        }
    });
}

function MODañadir_cliente() {
    $(".boton_añadir").unbind();
    $(".boton_añadir").click(añadir_cliente);

    $("#titulo_modal").text("Añadir Cliente");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_dniCliente").attr('readonly', false);
    $("#modal_dniCliente").css('background-color', "white");
    $("#modal_pwdSpan").css('display','block');

    $("#modal_dniCliente").val("");
    $("#modal_nombre").val("");
    $("#modal_direccion").val("");
    $("#modal_email").val("");
    $("#modal_pwd").val("");
}

function añadir_cliente() {
    let dniCliente=$("#modal_dniCliente").val();
    let nombre=$("#modal_nombre").val();
    let direccion=$("#modal_direccion").val();
    let email=$("#modal_email").val();
    let pwd=$("#modal_pwd").val();
    
    if((dniCliente=="")||(nombre==""),(direccion==""),(email=="")){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios");  
    }
    else{
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_clientes.php",
            data: {funcion:"añadir",dniCliente,nombre,direccion,email,pwd},
            success: function(response){
                let respuesta=JSON.parse(response);
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
            let input = document.createElement("input");
            input.id="boton_editar."+dniCliente;
            input.className = "boton_editar";
            input.onclick=function(){MODeditar_cliente(this)};
            input.setAttribute("type","button");
            input.setAttribute("value","Modificar");
        div.append(input);
            input = document.createElement("input");
            input.id="boton_eliminar."+dniCliente;
            input.onclick=function(){confirmar_deleteC($(this))};
            input.className = "boton_eliminar";
            input.setAttribute("type","button");
            input.setAttribute("value","Eliminar");
        div.append(input);
    span.append(div);
    $("#lista_admin").append(span);
    botones_cliente();
}

function MODeditar_cliente(boton){
    $(".boton_modificar").unbind();
    $(".boton_modificar").click(modificar_cliente);
    $("#titulo_modal").text("Modificar Cliente");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
    $("#modal_dniCliente").attr('readonly', true);
    $("#modal_dniCliente").css('background-color', "#6d6d6d4b");
    $("#modal_pwdSpan").css('display','none');
    boton=boton.id;
    boton = boton.split(".");
    dniCliente=boton[1];
    $("#modal_dniCliente").val(dniCliente);
    datoscliente(dniCliente);
    
}

function datoscliente(dniCliente) {
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data: {funcion: "datos",dniCliente:dniCliente},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            $("#modal_dniCliente").val(respuesta["dniCliente"]);
            $("#modal_nombre").val(respuesta["nombre"]);
            $("#modal_direccion").val(respuesta["direccion"]);
            $("#modal_email").val(respuesta["email"]);
            
        }
    });
}

function confirmar_deleteC(boton){ 
    let dniCliente=boton.attr("id");
    dniCliente = dniCliente.split(".");
    dniCliente=dniCliente[1];
    
    $("#modalconfirmar").css("display","block");
    $(".confirmar_msg").unbind();
    $(".confirmar_msg").click(function(){eliminar_cliente(boton,dniCliente)});   
}

function eliminar_cliente(boton,dniCliente){
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data: {funcion: "eliminar",dniCliente},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            if(respuesta){
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                $("#contenido_msg").text("As eliminado el Cliente "+dniCliente);
                boton.parent().parent().remove();
            }
        }
    });
    
}

function modificar_cliente() {
    let dniCliente=$("#modal_dniCliente").val();
    let nombre=$("#modal_nombre").val();
    let direccion=$("#modal_direccion").val();
    let email=$("#modal_email").val();
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

function botones_cliente(){
    $(".boton_cancelar").click(ocultar_modal);
    $(".cerrar_msg").click(cerrarMSG);
}

function ocultar_modal() {
    $(".modal_form").css("display","none");
}

function cerrarMSG(){
    $(".modalMSG").css("display","none");
}