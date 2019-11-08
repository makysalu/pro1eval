window.onload = function() {
    listarClientes();
    

}

function listarClientes() {
    //$("#contenido").html("");
    $.ajax({
        type:"POST",
        url:"./controladores/listar_clientes.php",
        data: {cliente:"listar"},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            for(let i in respuesta){
                let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.innerText=respuesta[i].dniCliente;
                    td.id="columna_dni";
                    tr.append(td);
                    td = document.createElement("td");
                    td.innerText=respuesta[i].nombre;
                    tr.append(td);
                    td = document.createElement("td");
                    td.innerText=respuesta[i].email;
                    tr.append(td);
                    td = document.createElement("td");
                        let input = document.createElement("input");
                        input.id="boton_editar."+respuesta[i].dniCliente;
                        input.className = "boton_editar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Modificar");
                        td.append(input);
                        input = document.createElement("input");
                        input.id="boton_eliminar."+respuesta[i].dniCliente;
                        input.className = "boton_eliminar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Eliminar");
                        td.append(input);
                    tr.append(td);
                $("#lista_clientes").append(tr);
            }
            botones_cliente(); 
        }
    });
}

function botones_cliente(){
    console.log("botones_cliente");
    
    $(".boton_editar").click(function(){MODeditar_cliente(this)});
    $(".boton_eliminar").click(function(){eliminar_cliente(this)});
    $(".boton_nuevo").click(function(){MODañadir_cliente(this)});
    $(".boton_añadir").click(añadir_cliente);
    $(".boton_cancelar").click(ocultar_modal);
}

function MODañadir_cliente(boton) {
    $("#titulo_modal").text("Añadir Cliente");
    $("#modal_cliente").css("display","block");
    $(".boton_añadir").css("display","block");
    $(".boton_modificar").css("display","none");
    $("#modal_dniCliente").attr('readonly', false);
    $("#modal_dniCliente").css('background-color', "white");
    $("#modal_dniCliente").val("");
    $("#modal_nombre").val("");
    $("#modal_direccion").val("");
    $("#modal_email").val("");
}

function añadir_cliente() {
    //let cliente=new array();
    let form=document.getElementById("form_modal");
    let dnicliente=$("#modal_dniCliente").val();
    let nombre=$("#modal_nombre").val();
    let direccion=$("#modal_direccion").val();
    let email=$("#modal_email")
    console.log(dnicliente);
    
    $.ajax({
        type:"POST",
        url:"./controladores/listar_clientes.php",
        data: {cliente:"datos",dniCliente,nombre,direccion,email},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
        }
    });
    listarClientes();
}

function MODeditar_cliente(boton){
    $("#titulo_modal").text("Modificar Cliente");
    $("#modal_cliente").css("display","block");
    $(".boton_añadir").css("display","none");
    $(".boton_modificar").css("display","block");
    $("#modal_dniCliente").attr('readonly', true);
    $("#modal_dniCliente").css('background-color', "#6d6d6d4b");
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
        data: {cliente:"datos",dniCliente:dniCliente},
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

function eliminar_cliente() {
    console.log("Eliminar");
    
}

function ocultar_modal() {
    $("#modal_cliente").css("display","none");
}