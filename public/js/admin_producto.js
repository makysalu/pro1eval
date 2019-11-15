function listarProductos() {
    if($("#lista_admin")){
        $("#lista_admin").remove();
        $("#boton_lista").remove();
    }
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data:{funcion: "listar"},
        datatype:"json",
        success: function(response){   
            let respuesta=JSON.parse(response);       
            let table=document.createElement("div");
            table.id="lista_admin";
            let span=document.createElement("span");
                span.id="fila-0";
                let div = document.createElement("div");
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Nombre";
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Marca";
                div.className="Titulo_lista";
                span.append(div);
                div = document.createElement("div");
                div.innerText="Precio";
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
                div.className="img_producto";
                div.id=respuesta[i].foto;
                div.onclick=function(){Mostrar_producto(this)};
                    let div2=document.createElement("div")
                        img=document.createElement("img");     
                        img.setAttribute("src","img/productos/"+respuesta[i].foto);          
                    div2.append(img);
                div.append(div2);
                span.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].nombre;
                span.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].marca;
                span.append(div);
                div = document.createElement("div");
                div.innerText=respuesta[i].precio+"€";
                span.append(div);
                div = document.createElement("div");
                    let input = document.createElement("input");
                    input.id="boton_editar."+respuesta[i].idProducto;
                    input.onclick=function(){MODeditar_producto(this)};
                    input.className = "boton_editar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Modificar");
                div.append(input);
                    input = document.createElement("input");
                    input.id="boton_eliminar."+respuesta[i].idProducto;
                    input.onclick=function(){confirmar_deleteP($(this))};
                    input.className = "boton_eliminar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                div.append(input);
                span.append(div);
                table.append(span);
            }  
                    input = document.createElement("input");
                    input.id="boton_lista";
                    input.className = "boton_nuevo";
                    input.onclick=function(){MODañadir_producto(this)};
                    input.setAttribute("type","button");
                    input.setAttribute("value","Nuevo Producto");
                $("#gestion_productos").append(table);
                $("#gestion_productos").append(input);
            botones_producto();
        }
    });
}

function botones_producto(){
    $(".boton_cancelar").click(ocultar_modal);
    $(".cerrar_msg").click(cerrarMSG);
}

function Mostrar_producto(boton){
    $("#imagen_modal").attr("src","img/productos/"+boton.id);
    $("#modalIMG").css('display','block');
}

function MODañadir_producto() {
    $(".boton_añadir").unbind();
    $(".boton_añadir").click(añadir_producto);
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
    
    if((nombre=="")||(marca=="")||(categoria=="")||(precio=="")||(files==undefined)){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios");   
    }
    else{
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
                let respuesta=JSON.parse(response);
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                
                if(respuesta[0]==false){
                    if(respuesta[1]==1){
                        $("#contenido_msg").text("Error Campos Vacios");
                    }
                    if(respuesta[1]==2){
                        $("#contenido_msg").text("No se puedo Subir la Imagen");
                    }
                }
                else{
                    $("#contenido_msg").text("Producto Creado con Exito");
                    PintarProducto(respuesta[1],respuesta[2],nombre,marca,precio);
                }
            },
            error: function (error) {
                $("#contenido_msg").text('error; ' + eval(error));
            }
        });
    }
}

function PintarProducto(idProducto,foto,nombre,marca,precio){
    span=document.createElement("span");
                div = document.createElement("div");
                div.className="img_producto";
                div.id=foto;
                div.onclick=function(){Mostrar_producto(this)};
                    let div2=document.createElement("div")
                        img=document.createElement("img");     
                        img.setAttribute("src","img/productos/"+foto);          
                    div2.append(img);
                div.append(div2);
                span.append(div);
                div = document.createElement("div");
                div.innerText=nombre;
                span.append(div);
                div = document.createElement("div");
                div.innerText=marca;
                span.append(div);
                div = document.createElement("div");
                div.innerText=precio+"€";
                span.append(div);
                div = document.createElement("div");
                    let input = document.createElement("input");
                    input.id="boton_editar."+idProducto;
                    input.onclick=function(){MODeditar_producto(this)};
                    console.log(input);
                    
                    input.className = "boton_editar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Modificar");
                div.append(input);
                    input = document.createElement("input");
                    input.id="boton_eliminar."+"idProducto";
                    input.onclick=function(){confirmar_deleteP($(this))};
                    input.className = "boton_eliminar";
                    input.setAttribute("type","button");
                    input.setAttribute("value","Eliminar");
                div.append(input);
                span.append(div);
    $("#lista_admin").append(span);
    botones_producto();
}

function MODeditar_producto(boton){
    $(".boton_modificar").unbind();
    $(".boton_modificar").click(modificar_producto);
    $("#titulo_modal").text("Modificar Producto");
    $(".modal_form").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
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
function confirmar_deleteP(boton){
    let idProducto=boton.attr("id");
    idProducto = idProducto.split(".");
    idProducto=idProducto[1];
    $("#modalconfirmar").css("display","block");
    $("#confirmar-valor").val(idProducto);
    $(".confirmar_msg").unbind();
    $(".confirmar_msg").click(function(){eliminar_producto(boton)});
}

function eliminar_producto(boton) {
    let idProducto=$("#confirmar-valor").val();
    $.ajax({
        type:"POST",
        url:"./controladores/gestion_productos.php",
        data: {funcion: "eliminar",idProducto},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            $("#contenido_msg").text("");
            $("#modalMSG").css("display","block");
            if(respuesta){
                $("#contenido_msg").text("Se Elimino el Producto "+idProducto);
                boton.parent().parent().remove();
            }
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
    if((nombre=="")||(marca=="")||(categoria=="")||(precio=="")||(files==undefined)){
        $("#contenido_msg").text("");
        $("#modalMSG").css("display","block");
        $("#contenido_msg").text("Error Campos Vacios");   
    }
    else{
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
                let respuesta=JSON.parse(response);
                $("#contenido_msg").text("");
                $("#modalMSG").css("display","block");
                if(respuesta[0]==false){
                    if(respuesta[1]==1){
                        $("#contenido_msg").text("Error Campos Vacios");
                    }
                    if(respuesta[1]==2){
                        $("#contenido_msg").text("No se puedo Subir la Imagen");
                    }
                }
                else{
                    $("#contenido_msg").text("Producto Modificado con Exito");
                }
                listarProductos();
            },
            error: function (error) {
                $("#contenido_msg").text('error; ' + eval(error));
            }
        });
    } 
}

function ocultar_modal() {
    $(".modal_form").css("display","none");
    $("#modalMSG").css("display","none");
    $("#modalIMG").css("display","none");
}

function cerrarMSG(){
    $(".modalMSG").css("display","none");
}
