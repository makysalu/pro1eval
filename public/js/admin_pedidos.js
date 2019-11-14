function listarPedidos() {
    if($("#lista_admin").length){
        console.log("existe");
        
        $("#lista_admin").remove();
        $("#boton_lista").remove();
    }
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){   
            let respuesta=JSON.parse(response);       
            let table=document.createElement("div");
            table.id="lista_admin";
                let span=document.createElement("span");
                span.id="fila-0";
                    div = document.createElement("div");
                    div.innerText="ID Pedido";
                    div.className="Titulo_lista";
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText="Fecha";
                    div.className="Titulo_lista";
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText="Direccion";
                    div.className="Titulo_lista";
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText="Cliente";
                    div.className="Titulo_lista";
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText="Operaciones";
                    div.className="Titulo_lista";
                span.append(div);
            table.append(span)       
            for(let i in respuesta){ 
                span=document.createElement("span");
                    div = document.createElement("div");
                    div.innerText=respuesta[i].idPedido;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].fecha;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].dirEntrega;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].dniCliente;
                    span.append(div);                
                    div = document.createElement("div");
                        img=document.createElement("img");
                        img.setAttribute("src","img/menu.png");
                        img.className="menu-lineas";
                        img.onclick=function(){Mostrar_lineas($(this))};
                        img.id="menu-lineas."+respuesta[i].idPedido;
                        div.append(img);
                        let input = document.createElement("input");
                        input.id="boton_editar."+respuesta[i].idPedido;
                        input.className = "boton_editar";
                        input.onclick=function(){MODeditar_pedido(this)};
                        input.setAttribute("type","button");
                        input.setAttribute("value","Modificar");
                    div.append(input);
                        input = document.createElement("input");
                        input.id="boton_eliminar."+respuesta[i].idPedido;
                        input.className ="boton_eliminar";
                        input.onclick=function(){confirmar_deletePe($(this))};
                        input.setAttribute("type","button");
                        input.setAttribute("value","Eliminar");
                    div.append(input);
                span.append(div);
                table.append(span);
            }  
                    input = document.createElement("input");
                    input.id="boton_lista";
                    input.className = "boton_nuevo";
                    input.onclick=function(){MODañadir_pedido($(this))};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo Pedido");
                $("#gestion_pedidos").append(table);
                $("#gestion_pedidos").append(input);
            botones_pedido();
        }
    });
}

function botones_pedido(){
    $(".boton_cancelar").click(ocultar_modal);
    $(".cerrar_msg").click(cerrarMSG);
}

function MODañadir_pedido(boton) {
    $("#titulo_modal").text("Añadir Pedido");
    $(".modal_pedido").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_idPedidoSpan").css("display","none");
    $("#modal_direccion").val("");
    $("#select_dniCliente").val("");
    $(".boton_añadir").unbind();
    $(".boton_añadir").click(añadir_pedido);

    
}

function añadir_pedido() {
    let direccion=$("#modal_direccion").val();
    let dniCliente=$("#select_dniCliente").val();
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "añadir",direccion,dniCliente},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");  
            if(respuesta[0]){
                $("#contenido_msg").text("Se ha Añadido un Nuevo Pedido");
                PintarPedido(respuesta[1],respuesta[2],respuesta[3],respuesta[4]);
            }
            else{
                $("#contenido_msg").text("Error Campos Vacios");
            }
        }
    });
}

function PintarPedido(idPedido,fecha,direccion,dniCliente){
    span=document.createElement("span");
                div = document.createElement("div");
                div.innerText=idPedido;
                span.append(div);
                div = document.createElement("div");
                div.innerText=fecha;
                span.append(div);
                div = document.createElement("div");
                div.innerText=direccion;
                span.append(div);
                div = document.createElement("div");
                div.innerText=dniCliente;
                span.append(div);
                div = document.createElement("div");
                    img=document.createElement("img");
                    img.setAttribute("src","img/menu.png");
                    img.className="menu-lineas";
                    img.id="menu-lineas."+idPedido;
                div.append(img);
                    let input = document.createElement("input");
                    input.id="boton_editar."+idPedido;
                    input.className = "boton_editar";
                    input.onclick=function(){MODeditar_pedido(this)};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Modificar");
                div.append(input);
                    input = document.createElement("input");
                    input.id="boton_eliminar."+"idPedido";
                    input.className = "boton_eliminar";
                    input.onclick=function(){confirmar_deletePe($(this))};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                div.append(input);
                span.append(div);
    $("#lista_admin").append(span);
}

function MODeditar_pedido(boton){
    $("#titulo_modal").text("Modificar Pedido");
    $(".modal_pedido").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
    $("#modal_idPedidoSpan").css('display','block');
    $("#modal_idPedido").attr('readonly', true);
    $("#modal_idPedido").css('background-color', "#6d6d6d4b");

    boton=boton.id;
    boton = boton.split(".");
    idPedido=boton[1];
    datospedido(idPedido);
    
}

function datospedido(idPedido) {
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "datos",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            $("#modal_idPedido").val(idPedido);
            $("#modal_direccion").val(respuesta["direccion"]);
            $("#select_dniCliente").val(respuesta["dniCliente"]);    
        }
    });
}

function confirmar_deletePe(boton){
    let idProducto=boton.attr("id");
    idProducto = idProducto.split(".");
    idProducto=idProducto[1];
    $("#modalconfirmar").css("display","block");
    $("#confirmar-valor").val(idProducto);
    $(".confirmar_msg").unbind();
    $(".confirmar_msg").click(function(){eliminar_pedido(boton)});
}

function eliminar_pedido(boton) {
    let idPedido=$("#confirmar-valor").val();
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "eliminar",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            if(respuesta){
                $("#contenido_msg").text("El Pedido se Elimino Correctamente");
            } 
            boton.parent().parent().remove();
        }
    });
   
}

function modificar_pedido() {
    let idPedido=$("#modal_idPedido").val();
    let direccion=$("#modal_direccion").val();
    let dniCliente=$("#select_dniCliente").val();
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion:"modificar",idPedido,direccion,dniCliente},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            let respuesta=JSON.parse(response);
            if(respuesta){
                $("#contenido_msg").text("Se a Modificado el Pedido "+idPedido);
            }
            else{
                $("#contenido_msg").text("Error Campos vacios");
            }
            listarPedidos();
        }
    });
}

function Mostrar_lineas(boton){
    let idPedido=boton.attr("id");
    idPedido = idPedido.split(".");
    idPedido=idPedido[1];
    if($("#fila-"+idPedido).length){
        $("#fila-"+idPedido).remove();
    }
    else{
        lineas_pedido(idPedido,boton);
    }   
}

function lineas_pedido(idPedido, boton){
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "listar_productos",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            console.log(respuesta);
            fila=document.createElement("span");
            fila.id="fila-"+idPedido;
            let table=document.createElement("div");
            table.id="lista_lineas";
            let span=document.createElement("span");
                span.id="fila-0";
                div = document.createElement("div");
                div.innerText="#ID";
                div.className="Titulo_lineas";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Producto";
                div.className="Titulo_lineas";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Cantidad";
                div.className="Titulo_lineas";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Operaciones";
                div.className="Titulo_lineas";
                span.append(div);
            table.append(span);
            for(let i in respuesta){
                span=document.createElement("span");
                    div = document.createElement("div");
                    div.innerText=respuesta[i].nlinea;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].idProducto;
                    span.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].cantidad;
                    span.append(div);
                    div = document.createElement("div");
                    div.id="linea-"+respuesta[i].nlinea;
                        input = document.createElement("input");
                        input.id="boton_eliminar."+respuesta[i].idPedido+"."+respuesta[i].nlinea;
                        input.className="eliminar_linea";
                        input.onclick=function(){eliminar_linea($(this))};
                        input.setAttribute("type","button");
                        input.setAttribute("value","Eliminar");
                    div.append(input);
                span.append(div);
                table.append(span);
            }
            span=document.createElement("span");           
                div = document.createElement("div");
                span.append(div);
                div = document.createElement("div");
                span.append(div);
                div = document.createElement("div");
                span.append(div);
                div = document.createElement("div");
                    input = document.createElement("input");
                    input.className = "mod_linea";
                    input.id="boton_nuevo."+idPedido;
                    input.onclick=function(){MODañadir_linea($(this))};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Añadir");
                div.append(input);
                span.append(div);
            table.append(span);
            fila.append(table);
            boton.parent().parent().after(fila);
        }
    });
}

function eliminar_linea(boton) {
    let idPedido=boton.attr("id");
    idPedido = idPedido.split(".");
    nlinea=idPedido[2];
    idPedido=idPedido[1];
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "eliminar_linea",idPedido, nlinea},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            let respuesta=JSON.parse(response);
            if(respuesta){
                $("#contenido_msg").text("Se a elimininado la linea "+nlinea+" del pedido "+idPedido);
            }
            boton.parent().parent().remove();
        }
    });
}

function MODañadir_linea(boton) {
    botonid=boton.attr("id");
    botonid = botonid.split(".");
    idPedido=botonid[1];
    $("#titulo_modal").text("Añadir Producto");
    $(".modal_linea").css("display","block");
    $("#modal_idPedido_linea").val(idPedido);
    $("#modal_idPedido").val();
    $("#modal_cantidad").val("");
    $(".añadir_linea").unbind();
    $(".añadir_linea").click(function(){añadir_linea(boton)});
    
}

function añadir_linea(boton) {
    let idPedido=$("#modal_idPedido_linea").val();
    let idProducto=$("#select_Productos").val();
    let nombre=$("#select_Productos option:selected").text();
    let cantidad=$("#modal_cantidad").val();
    console.log(nombre);
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "añadir_linea",idPedido,idProducto,cantidad},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            let respuesta=JSON.parse(response);
            if(respuesta){
                let nlinea=respuesta[1];
                $("#contenido_msg").text("Se a Añadido un producto al "+idPedido);
                PintarLinea(nlinea,nombre,cantidad,boton);
            }
            
        }
    });

   
}

function PintarLinea(nlinea,idProducto,cantidad,boton){
    span=document.createElement("span");
        div = document.createElement("div");
        div.innerText=nlinea;
        span.append(div);
        div = document.createElement("div");
        div.innerText=idProducto;
        span.append(div);
        div = document.createElement("div");
        div.innerText=cantidad;
        span.append(div);
        div = document.createElement("div");
            input = document.createElement("input");
            input.id="boton_eliminar."+nlinea;
            input.className = "boton_eliminar";
            input.onclick=function(){eliminar_linea($(this))};
            input.setAttribute("type","button");
            input.setAttribute("value","Eliminar");
        div.append(input);
    span.append(div);
    boton.parent().parent().before(span);
}

function ocultar_modal() {
    $(".modal_form").css("display","none");
    $("#modalIMG").css("display","none");
    $(".modal_pedido").css("display","none");
    $(".modal_linea").css("display","none");
}

function cerrarMSG(){
    $(".modalMSG").css("display","none");
}

function SelectDNIs() {
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            for (let i in respuesta){
                $("#select_dniCliente").append('<option value='+respuesta[i].dniCliente+'>'+respuesta[i].direccion+'</option>');
            }
        }
    });
}

function SelectProductos() {
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            for (let i in respuesta){ 
                $("#select_Productos").append('<option value='+respuesta[i]["idProducto"]+'>'+respuesta[i]["nombre"]+'</option>');          
            }
        }
    });
}