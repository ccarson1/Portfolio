function myFunction() {
  var x = document.getElementsByClassName("container-item");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}