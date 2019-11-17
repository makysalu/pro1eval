/*Pintamos todos los Pedidos*/
function listarPedidos() {
    //Si ya estan los eliminamos
    if($(".lista_admin").length){
        $(".lista_admin").remove();
        $("#boton_lista").remove();
    }
    //Realizamos la peticion que nos saca los pedidos
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){   
            let respuesta=JSON.parse(response);       
            let table=document.createElement("div");
            table.className="lista_admin";
                let span=document.createElement("span");
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
                        //añadimos el boton para eliminar pedido con el id del pedido
                        img=document.createElement("img");
                        img.setAttribute("src","img/close.png");
                        img.id="boton_eliminar."+respuesta[i].idPedido;
                        img.className = "boton_eliminar boton-menu";
                        //le añadimos la funcionalidad
                        img.onclick=function(){confirmar_deletePe($(this))};
                    div.append(img);
                        //añadimos el boton para modificar pedido con el id del pedido
                        img=document.createElement("img");
                        img.setAttribute("src","img/writing.png");
                        img.id="boton_editar."+respuesta[i].idPedido;
                        img.className = "boton_editar boton-menu";
                        //añadimos funcionalidad
                        img.onclick=function(){MODeditar_pedido(this)};
                    div.append(img);
                        //añadimos el boton para mostrar lineas con el id del pedido
                        img=document.createElement("img");
                        img.setAttribute("src","img/menu.png");
                        img.id="menu-lineas."+respuesta[i].idPedido;
                        img.className="menu-lineas boton-menu";
                        //le damos funcionalidad
                        img.onclick=function(){Mostrar_lineas($(this))};
                    div.append(img);
                span.append(div);
                table.append(span);
            }  
                    //añadimos boton para añadir nuevo pedido
                    input = document.createElement("input");
                    input.id="boton_lista";
                    input.className = "boton_nuevo";
                    //le añadimos funcionalidad
                    input.onclick=function(){MODañadir_pedido($(this))};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo");
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

/*Modal Añadir Pedido*/
function MODañadir_pedido(boton) {
    //Mostramos el modal añadir pedido
    $("#titulo_modal").text("Añadir Pedido");
    $(".modal_pedido").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_idPedidoSpan").css("display","none");
    //limpiamos valores
    $("#modal_direccion").val("");
    $("#select_dniCliente").val("");
    //funcion boton añadir
    $(".boton_añadir").unbind();
    $(".boton_añadir").click(añadir_pedido);

    
}

/*Añadimos pedido*/
function añadir_pedido() {
    //cogemos los valores del modal pedido
    let direccion=$("#modal_direccion").val();
    let dniCliente=$("#select_dniCliente").val();
    //comprobamos campos vacios
    if((direccion=="")||(dniCliente==null)){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios"); 
    }
    else{
        //realizamos peticion para añadir pedido
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_pedidos.php",
            data: {funcion: "añadir",direccion,dniCliente},
            datatype:"json",
            success: function(response){
                let respuesta=JSON.parse(response);
                //sacamos respuesta de la peticion
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
}

/*Pintamos un pedido*/
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
                    //añadimos el boton para eliminar pedido con el id del pedido
                    img=document.createElement("img");
                    img.setAttribute("src","img/close.png");
                    img.id="boton_eliminar."+idPedido;
                    img.className = "boton_eliminar boton-menu";
                    //le añadimos la funcionalidad
                    img.onclick=function(){confirmar_deletePe($(this))};
                div.append(img);
                    //añadimos el boton para modificar pedido con el id del pedido
                    img=document.createElement("img");
                    img.setAttribute("src","img/writing.png");
                    img.id="boton_editar."+idPedido;
                    img.className = "boton_editar boton-menu";
                    //añadimos funcionalidad
                    img.onclick=function(){MODeditar_pedido(this)};
                div.append(img);
                    //añadimos el boton para mostrar lineas con el id del pedido
                    img=document.createElement("img");
                    img.setAttribute("src","img/menu.png");
                    img.id="menu-lineas."+idPedido;
                    img.className="menu-lineas boton-menu";
                    //le damos funcionalidad
                    img.onclick=function(){Mostrar_lineas($(this))};
                div.append(img);
                div.append(img);
                   
                span.append(div);
    $(".lista_admin").append(span);
}

/*Modal Editar Pedido*/
function MODeditar_pedido(boton){
    //mostramos modal pedido
    $("#titulo_modal").text("Modificar Pedido");
    $(".modal_pedido").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
    $("#modal_idPedidoSpan").css('display','block');
    $("#modal_idPedido").attr('readonly', true);
    $("#modal_idPedido").css('background-color', "#6d6d6d4b");
    //sacamos el id del pedido
    boton=boton.id;
    boton = boton.split(".");
    idPedido=boton[1];

    //Sacamos la informacion para rellenar el modal
    datospedido(idPedido);
    $(".boton_modificar").unbind();
    $(".boton_modificar").click(modificar_pedido);

}

function datospedido(idPedido) {
    //Sacamos toda la informacion del pedido
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "datos",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            //rellenamos el modal editar pedido
            $("#modal_idPedido").val(idPedido);
            $("#modal_direccion").val(respuesta["direccion"]);
            $("#select_dniCliente").val(respuesta["dniCliente"]);    
        }
    });
}

/* Modal confirmar eliminar*/
function confirmar_deletePe(boton){
    //sacamos idPedido
    let idPedido=boton.attr("id");
    idPedido = idPedido.split(".");
    idPedido=idPedido[1];
    //posible cambio si me da tiempo añadir id al boton
    $("#modalconfirmar").css("display","block");
    $("#confirmar-valor").val(idPedido);
    //añadimos la funcion al boton -> posible cambio añadiendo el id del pedido al boton
    $(".confirmar_msg").unbind();
    $(".confirmar_msg").click(function(){eliminar_pedido(boton)});
}

/*Modal Eliminar Pedido*/
function eliminar_pedido(boton) {
    //Sacamos idPedido 
    let idPedido=$("#confirmar-valor").val();
    //Realizamos la peticion para eliminar el pedido
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "eliminar",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            //Sacamos la respuesta de la peticion
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            if(respuesta){
                $("#contenido_msg").text("El Pedido se Elimino Correctamente");
            }
            //eliminamos la fila 
            boton.parent().parent().remove();
        }
    });
   
}

/*Modificamos el pedido*/
function modificar_pedido() {
    //sacamos informacion del modal modificar
    let idPedido=$("#modal_idPedido").val();
    let direccion=$("#modal_direccion").val();
    let dniCliente=$("#select_dniCliente").val();
    //comprobamos campos vacios
    if((direccion=="")||(dniCliente==null)||(idPedido=="")){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios"); 
    }
    else{
        //realizamos peticion ajax para modificar el pedido
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_pedidos.php",
            data: {funcion:"modificar",idPedido,direccion,dniCliente},
            datatype:"json",
            success: function(response){
                let respuesta=JSON.parse(response);
                //mostramos respuesta
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                if(respuesta){
                    $("#contenido_msg").text("Se a Modificado el Pedido "+idPedido);
                }
                else{
                    $("#contenido_msg").text("Error Campos vacios");
                }
                //volvemos a pintar pedidos
                listarPedidos();
            }
        });
    }
}

/*Nos muestra las lineas del pedido al pulsar en el menu*/
function Mostrar_lineas(boton){
    //sacamos el id del pedido
    let idPedido=boton.attr("id");
    idPedido = idPedido.split(".");
    idPedido=idPedido[1];
    //si esiste menu lo elimina sino lo crea
    if($("#fila-"+idPedido).length){
        $("#fila-"+idPedido).remove();
    }
    else{
        lineas_pedido(idPedido,boton);
    }   
}

function lineas_pedido(idPedido, boton){
    //realiza peticion para sacar todas las lineas del pedido
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "listar_productos",idPedido},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            fila=document.createElement("span");
            fila.id="fila-"+idPedido;
            let table=document.createElement("div");
            table.className="lista_lineas";
            let span=document.createElement("span");
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
                    //añadimos el boton para eliminar pedido con el id del pedido
                    img=document.createElement("img");
                    img.setAttribute("src","img/error.png");
                    img.id="boton_eliminar."+respuesta[i].idPedido+"."+respuesta[i].nlinea;
                    img.className="eliminar_linea boton-menu";
                    //le añadimos la funcionalidad
                    img.onclick=function(){eliminar_linea($(this))};
                    div.append(img);
                span.append(div);
                table.append(span);
            }
            //creamos la fila con el boton añadir linea
            span=document.createElement("span");           
                div = document.createElement("div");
                span.append(div);
                div = document.createElement("div");
                span.append(div);
                div = document.createElement("div");
                span.append(div);
                div = document.createElement("div");
                //añadimos el boton para eliminar pedido con el id del pedido
                    img=document.createElement("img");
                    img.setAttribute("src","img/plus.png");
                    img.id="boton_nuevo."+idPedido;
                    img.className="mod_linea boton-menu";
                    //le añadimos la funcionalidad
                    img.onclick=function(){MODañadir_linea($(this))};
                    div.append(img);
                span.append(div);
            table.append(span);
            fila.append(table);
            //creamos la linea debajo de la fila seleccionada
            boton.parent().parent().after(fila);
        }
    });
}

/*Eliminar linea pedido*/
function eliminar_linea(boton) {
    //sacamos id pedido y numero de linea
    let idPedido=boton.attr("id");
    idPedido = idPedido.split(".");
    nlinea=idPedido[2];
    idPedido=idPedido[1];
    //realizamos la peticion ajax para eliminar la linea
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "eliminar_linea",idPedido, nlinea},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            //mostramos respuesta
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            if(respuesta){
                $("#contenido_msg").text("Se a elimininado la linea "+nlinea+" del pedido "+idPedido);
            }
            //eliminamos la linea
            boton.parent().parent().remove();
        }
    });
}

/*Modal Añadir Linea*/
function MODañadir_linea(boton) {
    //sacamos el id del pedido
    botonid=boton.attr("id");
    botonid = botonid.split(".");
    idPedido=botonid[1];
    //mostramos la informacion en el modal
    $("#titulo_modal").text("Añadir Producto");
    $(".modal_linea").css("display","block");
    $("#modal_idPedido_linea").val(idPedido);
    $("#modal_idPedido").val();
    $("#modal_cantidad").val("");
    //añadimos la funcionalidad al boton
    $(".añadir_linea").unbind();
    $(".añadir_linea").click(function(){añadir_linea(boton)});
    
}

/*Añade Linea del Pedido*/
function añadir_linea(boton) {
    //sacamos la informacion del modal añadir pedido
    let idPedido=$("#modal_idPedido_linea").val();
    let idProducto=$("#select_Productos").val();
    let nombre=$("#select_Productos option:selected").text();
    let cantidad=$("#modal_cantidad").val();
    //comprobamos campos vacios
    if((idPedido=="")||(idProducto=="")||(nombre=="")||(cantidad=="")){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios"); 
    }
    else{
        //realizamos la peticios
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_pedidos.php",
            data: {funcion: "añadir_linea",idPedido,idProducto,cantidad},
            datatype:"json",
            success: function(response){
                //mostramos respuesta dependiendo de la peticion
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                let respuesta=JSON.parse(response);
                if(respuesta){
                    let nlinea=respuesta[1];
                    $("#contenido_msg").text("Se a Añadido un producto al "+idPedido);
                    PintarLinea(nlinea,nombre,cantidad,boton,idPedido);
                }
                
            }
        });
    }
}

/*Pintamos Linea de Pedido*/
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
             //añadimos el boton para eliminar pedido con el id del pedido
             img=document.createElement("img");
             img.setAttribute("src","img/error.png");
             img.id="boton_eliminar."+idPedido+"."+nlinea;
             img.className="eliminar_linea boton-menu";
             //le añadimos la funcionalidad
             img.onclick=function(){eliminar_linea($(this))};
             div.append(img);
    span.append(div);
    //Eliminamos la linea del pedido
    boton.parent().parent().before(span);
}

/*Ocultar Modal*/
function ocultar_modal() {
    //ocultamos todos los modales
    $(".modal_form").css("display","none");
    $(".modalIMG").css("display","none");
    $(".modal_pedido").css("display","none");
    $(".modal_linea").css("display","none");
}

/*Ocultamos Mensaje*/
function cerrarMSG(){
    //ocultamos los mensajes 
    $(".modalMSG").css("display","none");
}

/*Generamos un select con los DNIs*/
function SelectDNIs() {
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_clientes.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            for (let i in respuesta){
                $("#select_dniCliente").append('<option value='+respuesta[i].dniCliente+'>'+respuesta[i].nombre+'</option>');
            }
        }
    });
}

/*Generamos un select con los Productos*/
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