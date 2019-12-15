const navBar = document.querySelector('.nav-bar');
const navBarPos = navBar.offsetTop;
const navLinks = document.querySelectorAll('.nav-links');
const background = document.querySelector('.dropdownBackground');
const arrow = document.querySelector('.arrow');

function handleEnter(){
  if (this.id === 'brand') return;

  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = navBar.getBoundingClientRect();
  
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
  
  if (this.id === 'about-us') navBar.classList.add('hoverAbout');
  else navBar.classList.remove('hoverAbout');
  
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');

  
  
}


function fixedNav() {
  if (window.scrollY > navBarPos) document.body.classList.add('fixed');
  else document.body.classList.remove('fixed');
}


window.addEventListener('scroll', fixedNav);
navLinks.forEach(navlink => navlink.addEventListener('mouseenter', handleEnter));
navLinks.forEach(navlink => navlink.addEventListener('mouseleave', handleLeave));
