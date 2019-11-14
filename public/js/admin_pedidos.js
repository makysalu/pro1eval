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
            let cont=1;
                
            for(let i in respuesta){ 
                span=document.createElement("span");
                span.id="fila-"+cont;
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
                    div.id="fila-"+respuesta[i].idPedido;
                        img=document.createElement("img");
                        img.setAttribute("src","img/menu.png");
                        img.className="menu-lineas";
                        img.id="menu-lineas."+respuesta[i].idPedido;
                        div.append(img);
                        let input = document.createElement("input");
                        input.id="boton_editar."+respuesta[i].idPedido;
                        input.className = "boton_editar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Modificar");
                    div.append(input);
                        input = document.createElement("input");
                        input.id="boton_eliminar."+respuesta[i].idPedido;
                        input.className ="boton_eliminar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Eliminar");
                    div.append(input);
                span.append(div);
                table.append(span);
            }  
                    input = document.createElement("input");
                    input.id="boton_lista";
                    input.className = "boton_nuevo";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo Pedido");
                $("#gestion_pedidos").append(table);
                $("#gestion_pedidos").append(input);
            botones_pedido();
        }
    });
}

function botones_pedido(){
    $(".boton_añadir").unbind("click",añadir_pedido);
    $(".boton_modificar").unbind("click",modificar_pedido);
    $(".confirmar_msg").unbind("click",eliminar_pedido);

    $(".menu-lineas").click(function(){Mostrar_lineas(this)});
    $(".boton_editar").click(function(){MODeditar_pedido(this)});
    $(".boton_nuevo").click(function(){MODañadir_pedido($(this))});
    
    $(".boton_eliminar").click(function(){confirmar_delete($(this))});
    $(".boton_modificar").click(modificar_pedido);
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
            }
            else{
                $("#contenido_msg").text("Error Campos Vacios");
            }
            PintarPedido(respuesta[1],respuesta[2],respuesta[3],respuesta[4]);
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
                    let input = document.createElement("input");
                    input.id="boton_editar."+idPedido;
                    input.className = "boton_editar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Modificar");
                div.append(input);
                    input = document.createElement("input");
                    input.id="boton_eliminar."+"idPedido";
                    input.className = "boton_eliminar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                div.append(input);
                span.append(div);
    $("#lista_admin").append(span);
    botones_pedido();
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

function confirmar_delete(boton){
    let idProducto=boton.attr("id");
    idProducto = idProducto.split(".");
    idProducto=idProducto[1];
    $("#modalconfirmar").css("display","block");
    $("#confirmar-valor").val(idProducto);
    $(".confirmar_msg").click(function(){eliminar_pedido(boton)});
}

function eliminar_pedido(boton) {
    console.log(boton);
    
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
    boton=boton.id
    botonpar = boton.split(".");
    idPedido=botonpar[1];
    
    if($("#detalle-"+idPedido).length){
        $("#detalle-"+idPedido).remove();
    }
    else{
        div = document.createElement("div");
        div.className="Detalles_pedido";
        div.id="detalle-"+idPedido;
        $("#fila-"+idPedido).after(div);
        lineas_pedido(idPedido);
    }
}

function lineas_pedido(idPedido){
    $(".añadir_linea").unbind("click",añadir_linea);
    $("#detalle-"+idPedido).empty();
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "listar_productos",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            console.log(respuesta);
                   
            let table=document.createElement("div");
            table.id="lista_lineas";
                div = document.createElement("div");
                div.innerText="#ID";
                div.className="Titulo_lineas";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Producto";
                div.className="Titulo_lineas";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Cantidad";
                div.className="Titulo_lineas";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Operaciones";
                div.className="Titulo_lineas";
                table.append(div);
                
            for(let i in respuesta){
                div = document.createElement("div");
                div.innerText=respuesta[i].nlinea;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].idPedido;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].cantidad;
                table.append(div);
                div = document.createElement("div");
                div.id="linea-"+respuesta[i].nlinea;
                    input = document.createElement("input");
                    input.id="boton_eliminar."+respuesta[i].idPedido+"."+respuesta[i].nlinea;
                    input.className="eliminar_linea";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                    div.append(input);
                table.append(div);
            }           
            div = document.createElement("div");
            table.append(div);
            div = document.createElement("div");
            table.append(div);
            div = document.createElement("div");
            table.append(div);
            div = document.createElement("div");
                input = document.createElement("input");
                input.className = "mod_linea";
                input.id="boton_nuevo."+idPedido;
                input.setAttribute("type","button");
                input.setAttribute("value","Añadir");
                div.append(input);
            table.append(div);
            $("#detalle-"+idPedido).append(table);
            $('#detalle-'+idPedido).css('display','block');
            botones_linea();
        }
    });
}

function botones_linea(){
    $(".eliminar_linea").click(function(){eliminar_linea(this)});
    $(".mod_linea").click(function(){MODañadir_linea(this)});
    $(".boton_cancelar").click(ocultar_modal);

}

function eliminar_linea(boton) {
    $(".eliminar_linea").unbind("click",eliminar_linea);
    boton=boton.id;
    boton = boton.split(".");
    idPedido=boton[1];
    nlinea=boton[2];
    
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
            lineas_pedido(idPedido);
        }
    });
}

function MODañadir_linea(boton) {
    
    boton=boton.id;
    boton = boton.split(".");
    idPedido=boton[1];
    
    $("#titulo_modal").text("Añadir Producto");
    $(".modal_linea").css("display","block");
    $("#modal_idPedido_linea").val(idPedido);
    $("#modal_idPedido").val();
    $("#modal_cantidad").val("");
    
}

function añadir_linea() {
    let idPedido=$("#modal_idPedido_linea").val();
    let idProducto=$("#select_Productos").val();
    let cantidad=$("#modal_cantidad").val();
    
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
                $("#contenido_msg").text("Se a Añadido un producto al "+idPedido);
            }
            lineas_pedido(idPedido);
        }
    });
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
                $("#select_Productos").append('<option value='+respuesta[i].idPedido+'>'+respuesta[i].direccion+'</option>');
            }
        }
    });
}