function listarClientes() {
    $("#gestion_usuario").html("");
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){ 
            let respuesta=JSON.parse(response); 
            let table=document.createElement("div");
            table.id="lista_admin";
                let div = document.createElement("div");
                div.innerText="DNI";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Nombre";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Direccion";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Email";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Operaciones";
                div.className="Titulo_lista";
                table.append(div);
                
            for(let i in respuesta){
                div = document.createElement("div");
                div.innerText=respuesta[i].dniCliente;
                div.id="columna_dni";
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].nombre;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].direccion;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].email;
                table.append(div);
                div = document.createElement("div");
                    let input = document.createElement("input");
                    input.id="boton_editar."+respuesta[i].dniCliente;
                    input.className = "boton_editar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Modificar");
                div.append(input);
                    input = document.createElement("input");
                    input.id="boton_eliminar."+respuesta[i].dniCliente;
                    input.className = "boton_eliminar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                div.append(input);
                        table.append(div);
            }  
                    input = document.createElement("input");
                    input.className = "boton_nuevo";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo Cliente");
                $("#gestion_usuario").append(table);
                $("#gestion_usuario").append(input);
            botones_cliente();
        }
    });
}

function botones_cliente(){
    $(".boton_editar").click(function(){MODeditar_cliente(this)});
    $(".boton_eliminar").click(function(){eliminar_cliente(this)});
    $(".boton_nuevo").click(function(){MODañadir_cliente(this)});
    $(".boton_añadir").click(añadir_cliente);
    $(".boton_modificar").click(modificar_cliente);
    $(".boton_cancelar").click(ocultar_modal);
}

function MODañadir_cliente(boton) {
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
            }   
            listarClientes();
        }
    });
   
}

function MODeditar_cliente(boton){
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

function eliminar_cliente(boton) {
    boton=boton.id;
    boton = boton.split(".");
    dniCliente=boton[1];
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data: {funcion: "eliminar",dniCliente:dniCliente},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            if(respuesta){
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                $("#contenido_msg").text("As eliminado el Cliente "+dniCliente);
                listarClientes();
            }
        }
    });
}

function modificar_cliente() {
    let dniCliente=$("#modal_dniCliente").val();
    let nombre=$("#modal_nombre").val();
    let direccion=$("#modal_direccion").val();
    let email=$("#modal_email").val();
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data: {funcion:"modificar",dniCliente,nombre,direccion,email},
        datatype:"json",
        success: function(response){     
            let respuesta=JSON.parse(response);
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            if(respuesta[0]==false){
                $("#contenido_msg").text("Error Campos Vacios");
            }
            else{
                $("#contenido_msg").text("Se ha Modificado el Cliente "+dniCliente);
            }  
            //$(".modal_form").css("display","none");
            listarClientes(); 
        }
    });
}

function ocultar_modal() {
    $(".modal_form").css("display","none");
    $("#modalMSG").css("display","none");
}