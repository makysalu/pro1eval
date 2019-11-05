window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("main-header").className = "main-header2";
    document.getElementById("imagen").style.width='50px';
    document.getElementById("imagen").style.height='50px';
  } else {
    document.getElementById("main-header").className = "";
    document.getElementById("imagen").style.width='90px';
    document.getElementById("imagen").style.height='90px';
  }
}
