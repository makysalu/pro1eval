var opcionregistro=0;
console.log(opcionregistro);
function comprobarRegistro(form){
    errores=comprobarCampos(form);
    if(errores.length==0){
        estado=comprobarContraseña();
        return true;
    }
    else{
        return false;
    } 
}

function comprobarCampos(form) {
    var errores = new Array;
    for (let cont = 0; cont < document.getElementById(form).elements.length-1; cont++) {
        let input = document.getElementById(form).elements[cont];
        let msginput=document.getElementById(input.id).msg;
        if(msginput.length==0){
            errores.push(input.id);
        }
    }
    return errores;
}

function comprobarContraseña() {
    var password=document.getElementById("Password").msg;
    var password2=document.getElementById("Password2").msg;
    if (password==password2) {
        return true;
    }
    else{
        alert("Las contraseñas no coinciden");
        return false; 
    }
}
function CerrarMsg(msg){
    console.log(msg);
    document.getElementById(msg).remove();
}

function pintarlogin(){
    var div = document.createElement("div");
    div.id="login";
        var dt=document.createElement("dt");
        dt.innerHTML="INICIAR SESION";
        var dd=document.createElement("dd");
        var form=document.createElement("form");
        dd.appendChild(form);
            var input=document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("placeholder"," Email");
            form.appendChild(input);
            var input=document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("placeholder"," Constraseña");
            form.appendChild(input);
            var input=document.createElement("input");
            input.setAttribute("type","submit");
            input.setAttribute("value","Enviar");
            form.appendChild(input);

    
    div.appendChild(dt);
    div.appendChild(dd);
}