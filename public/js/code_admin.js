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
        SelectDNIs();
        SelectProductos();
    }
}

