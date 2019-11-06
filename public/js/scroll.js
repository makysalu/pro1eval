window.onscroll = function() {myFunction()};

function myFunction() {
  
  if (document.body.scrollTop > 5|| document.documentElement.scrollTop > 5) {
    $("#cabecera").css('display', 'none');
    $("#navegador_principal").css('top',0);
    $("section").css('margin-top',40);
    $("section").css('padding-top',"150px");
    
  } else {
    $("#cabecera").css('display', 'block');
    $("#navegador_principal").css('top',230);
    $("section").css('margin-top',260);
    $("section").css('padding-top',"40px");
  }
}
