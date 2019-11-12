window.onload = function() {
    if($("#gestion_usuario").length){
        $("#menu_clientes").addClass("menu_select");   
        listarClientes(); 
    }
    if($("#gestion_productos").length){
        $("#menu_productos").addClass("menu_select");
        listarProductos();
    }
    if($("#gestion_pedidos").length){
        $("#menu_pedidos").addClass("menu_select");
        listarPedidos();
    }
    

}


function listarClientes() {
    $("#gestion_usuario").html("");
    $.ajax({
        type:"POST",
        url:"./controladores/listar_clientes.php",
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
        url:"./controladores/listar_clientes.php",
        data: {funcion:"añadir",dniCliente,nombre,direccion,email,pwd},
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);     
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
        url:"./controladores/listar_clientes.php",
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
        url:"./controladores/listar_clientes.php",
        data: {funcion: "eliminar",dniCliente:dniCliente},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);
            listarClientes(); 
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
        url:"./controladores/listar_clientes.php",
        data: {funcion:"modificar",dniCliente,nombre,direccion,email},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);    
            $(".modal_form").css("display","none");
            listarClientes(); 
        }
    });
}

function ocultar_modal() {
    $(".modal_form").css("display","none");
    $("#modalMSG").css("display","none");
    $("#modalIMG").css("display","none");
    $(".modal_pedido").css("display","none");
    $(".modal_linea").css("display","none");
}


function listarProductos() {
    //$("#contenido").html("");
    $("#gestion_productos").html("");
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){   
            let respuesta=JSON.parse(response);       
            let table=document.createElement("div");
            table.id="lista_admin";
                let div = document.createElement("div");
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Nombre";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Marca";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Precio";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Operaciones";
                div.className="Titulo_lista";
                table.append(div);
                
            for(let i in respuesta){
                div = document.createElement("div");
                div.className="img_producto";
                div.id=respuesta[i].foto;
                    let div2=document.createElement("div")
                        img=document.createElement("img");     
                        img.setAttribute("src","img/productos/"+respuesta[i].foto);          
                    div2.append(img);
                div.append(div2);
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].nombre;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].marca;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].precio+"€";
                table.append(div);
                div = document.createElement("div");
                    let input = document.createElement("input");
                    input.id="boton_editar."+respuesta[i].idProducto;
                    input.className = "boton_editar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Modificar");
                div.append(input);
                    input = document.createElement("input");
                    input.id="boton_eliminar."+respuesta[i].idProducto;
                    input.className = "boton_eliminar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                div.append(input);
                        table.append(div);
            }  
                    input = document.createElement("input");
                    input.className = "boton_nuevo";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo Producto");
                $("#gestion_productos").append(table);
                $("#gestion_productos").append(input);
            botones_producto();
        }
    });
}

function botones_producto(){
    $(".img_producto").click(function(){Mostrar_producto(this)});
    $(".boton_editar").click(function(){MODeditar_producto(this)});
    $(".boton_eliminar").click(function(){eliminar_producto(this)});
    $(".boton_nuevo").click(function(){MODañadir_producto(this)});
    $(".boton_añadir").click(añadir_producto);
    $(".boton_modificar").click(modificar_producto);
    $(".boton_cancelar").click(ocultar_modal);
}

function Mostrar_producto(boton){
    console.log(boton.id);
    $("#imagen_modal").attr("src","img/productos/"+boton.id);
    $("#modalIMG").css('display','block');
}

function MODañadir_producto(boton) {
    $("#titulo_modal").text("Añadir Producto");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_dniCliente").attr('readonly', false);
    $("#modal_dniCliente").css('background-color', "white");
    $("#modal_fileSpan").css('display','block');
    $("#modal_dniCliente").val("");
    $("#modal_nombre").val("");
    $("#modal_direccion").val("");
    $("#modal_email").val("");
}

function añadir_producto() {
    let nombre=$("#modal_nombre").val();
    let marca=$("#modal_marca").val();
    let categoria=$("#modal_categoria").val();
    let precio=$("#modal_precio").val();
    
    let files=$("#modal_file").prop("files")[0];
    
    var formData = new FormData();
        formData.append('funcion', 'añadir');
        formData.append('nombre',nombre);
        formData.append('marca',marca);
        formData.append('categoria',categoria);
        formData.append('precio',precio);
        formData.append('file',$("#modal_file").prop("files")[0]);
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data: formData,
        contentType: false,
        processData: false,
        datatype:"json",
        
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);
            listarProductos();
        }
    });
   
}

function MODeditar_producto(boton){
    $("#titulo_modal").text("Modificar Producto");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
    //$("#modal_fileSpan").css('display','none');
    boton=boton.id;
    boton = boton.split(".");
    idProducto=boton[1];
    datosproducto(idProducto);
    
}

function datosproducto(idProducto) {
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data: {funcion: "datos",idProducto},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            $("#modal_idProducto").val(idProducto);
            $("#modal_nombre").val(respuesta["nombre"]);
            $("#modal_marca").val(respuesta["marca"]);
            $("#modal_categoria").val(respuesta["categoria"]);
            $("#modal_precio").val(respuesta["precio"]);
            
        }
    });
}

function eliminar_producto(boton) {
    boton=boton.id;
    boton = boton.split(".");
    idProducto=boton[1];
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data: {funcion: "eliminar",idProducto},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);
            listarProductos();
        }
    });
}

function modificar_producto() {
    let idProducto=$("#modal_idProducto").val();
    let nombre=$("#modal_nombre").val();
    let marca=$("#modal_marca").val();
    let categoria=$("#modal_categoria").val();
    let precio=$("#modal_precio").val();
    let files=$("#modal_file").prop("files")[0];
    
    var formData = new FormData();
        formData.append('funcion', 'modificar');
        formData.append('idProducto',idProducto);
        formData.append('nombre',nombre);
        formData.append('marca',marca);
        formData.append('categoria',categoria);
        formData.append('precio',precio);
        formData.append('file',$("#modal_file").prop("files")[0]);
        
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data: formData,
        contentType: false,
        processData: false,
        datatype:"json",
        success: function(response){
            
            
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);      
            $(".modal_form").css("display","none");
            listarProductos();
        }
    });
}

function listarPedidos() {
    //$("#contenido").html("");
    $("#gestion_pedidos").html("");
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){   
            let respuesta=JSON.parse(response);       
            let table=document.createElement("div");
            table.id="lista_admin";
                div = document.createElement("div");
                div.innerText="ID Pedido";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Fecha";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Direccion";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Cliente";
                div.className="Titulo_lista";
                table.append(div);
                div = document.createElement("div");
                div.innerText="Operaciones";
                div.className="Titulo_lista";
                table.append(div);
                
            for(let i in respuesta){
                div = document.createElement("div");
                div.innerText=respuesta[i].idPedido;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].fecha;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].dirEntrega;
                table.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].dniCliente;
                table.append(div);
                div = document.createElement("div");
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
                        table.append(div);

                div = document.createElement("div");
                div.className="Detalles_pedido";
                div.id="detalle-"+respuesta[i].idPedido;
                table.append(div);
            }  
                    input = document.createElement("input");
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
    $(".menu-lineas").click(function(){lineas_pedido(this)});
    $(".boton_editar").click(function(){MODeditar_pedido(this)});
    $(".boton_eliminar").click(function(){eliminar_pedido(this)});
    $(".boton_nuevo").click(function(){MODañadir_pedido(this)});
    $(".boton_añadir").click(añadir_pedido);
    $(".boton_modificar").click(modificar_pedido);
    $(".boton_cancelar").click(ocultar_modal);
}

function MODañadir_pedido(boton) {
    $("#titulo_modal").text("Añadir Producto");
    $(".modal_pedido").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_idPedidoSpan").css("display","none");
    $("#modal_direccion").val("");
    $("#modal_dniCliente").val("");
}

function añadir_pedido() {
    let direccion=$("#modal_direccion").val();
    let dniCliente=$("#modal_dniCliente").val();
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "añadir",direccion,dniCliente},
        datatype:"json",
        success: function(response){
            console.log(response);
            
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);
            listarPedidos();
        }
    });
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
            $("#modal_dniCliente").val(respuesta["dniCliente"]);  
        }
    });
}

function eliminar_pedido(boton) {
    boton=boton.id;
    boton = boton.split(".");
    idPedido=boton[1];
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "eliminar",idPedido},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);
            listarPedidos();
        }
    });
}

function modificar_pedido() {
    let idPedido=$("#modal_idPedido").val();
    let direccion=$("#modal_direccion").val();
    let dniCliente=$("#modal_dniCliente").val();
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion:"modificar",idPedido,direccion,dniCliente},
        datatype:"json",
        success: function(response){
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);      
            $(".modal_form").css("display","none");
            listarPedidos();
        }
    });
}

function lineas_pedido(pedido){
    console.log(typeof(pedido));
     if(typeof(pedido)==="object"){
        pedido=pedido.id;
        pedido = pedido.split(".");
        idPedido=pedido[1];
    }
    
    
    
    
    $("#detalle-"+idPedido).html("");
    if($("#detalle-"+idPedido).css("display")=="none"){
        $.ajax({
            type:"POST",
            url:"./controladores/gestion_pedidos.php",
            data: {funcion: "listar_productos",idPedido},
            datatype:"json",
            success: function(response){
                let respuesta=JSON.parse(response);       
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
                    div.innerText=respuesta[i].idProducto;
                    table.append(div);
                    div = document.createElement("div");
                    div.innerText=respuesta[i].cantidad;
                    table.append(div);
                    div = document.createElement("div");
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
    else{
        $("#detalle-"+idPedido).css("display","none");
    }
}

function botones_linea(){
    $(".eliminar_linea").click(function(){eliminar_linea(this)});
    $(".mod_linea").click(function(){MODañadir_linea(this)});
    $(".añadir_linea").click(añadir_linea);
    $(".boton_cancelar").click(ocultar_modal);
}

function eliminar_linea(boton) {
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
            $("#contenido_msg").text(response);
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
    $("#modal_idProducto").val();
    $("#modal_cantidad").val("");
    
}

function añadir_linea() {
    let idPedido=$("#modal_idPedido_linea").val();
    let idProducto=$("#modal_idProducto").val();
    let cantidad=$("#modal_cantidad").val();
    
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_pedidos.php",
        data: {funcion: "añadir_linea",idPedido,idProducto,cantidad},
        datatype:"json",
        success: function(response){
            console.log(response);
            
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            $("#contenido_msg").text(response);
            lineas_pedido(idPedido);
        }
    });
}