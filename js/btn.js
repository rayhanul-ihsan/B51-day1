let isOpen = false // true
function openMenu() {
  let navMenu = document.getElementById("hamb-nav")
  if(!isOpen) {
    navMenu.style.display= "block";
    isOpen = true
  } else {
    navMenu.style.display= "none";
    isOpen = false
  }
}