window.onscroll = function() {myFunction()};

function myFunction() {
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $("#cabecera").css('display', 'none');
    $("#navegador_principal").css('top',0);
    $("section").css('margin-top',60);
    
  } else {
    $("#cabecera").css('display', 'block');
    $("#navegador_principal").css('top',230);
    $("section").css('margin-top',280);
  }
}
