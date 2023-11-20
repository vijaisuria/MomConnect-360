const navItems = document.querySelector("#nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector("#close__nav-btn");

openNavBtn.addEventListener("click", () => {
  navItems.style.display = "flex";
  closeNavBtn.style.display = "inline-block";
  openNavBtn.style.display = "none";
});

const closeNav = () => {
  navItems.style.display = "none";
  closeNavBtn.style.display = "none";
  openNavBtn.style.display = "inline-block";
};

closeNavBtn.addEventListener("click", closeNav);

// close nav when a menu item is clicked
if (window.innerWidth < 1024) {
  document.querySelectorAll("#nav__items li a").forEach((navItem) => {
    navItem.addEventListener("click", () => {
      closeNav();
    });
  });
}

// change navbar styles on scroll
window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("window-scroll", window.scrollY > 0);
});

// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // responsive breakpoints
  breakpoints: {
    //when window width is >= 600px
    600: {
      slidesPerView: 2,
    },
    //when window width is >= 1024px
    1024: {
      slidesPerView: 3,
    },
  },
});