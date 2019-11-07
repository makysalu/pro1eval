window.onload = function() {
    listarClientes();
    

}

function listarClientes() {
    //$("#contenido").html("");
    $.ajax({
        type:"GET",
        url:"./controladores/listar_clientes.php",
        data: {cliente:"listar"},
        datatype:"json",
        success: function(response){
            let respuesta=JSON.parse(response);
            for(let i in respuesta){
                let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.innerText=respuesta[i].dniCliente;
                    td.class="columna_dni";
                    tr.append(td);
                    td = document.createElement("td");
                    td.innerText=respuesta[i].nombre;
                    tr.append(td);
                    td = document.createElement("td");
                    td.innerText=respuesta[i].email;
                    tr.append(td);
                    td = document.createElement("td");
                        input = document.createElement("input");
                        input.class = "boton_editar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Modificar");
                        //input.click(editar_cliente);
                        td.append(input);
                        input = document.createElement("input");
                        input.class = "boton_eliminar";
                        input.setAttribute("type","button");
                        input.setAttribute("value","Eliminar");
                       // input.click(eliminar_cliente);
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
    
    $("boton_editar").click(editar_cliente);
    $("boton_eliminar").click(eliminar_cliente);
}

function editar_cliente() {
    console.log("Editar");
}

function eliminar_cliente() {
    console.log("Eliminar");
    
}