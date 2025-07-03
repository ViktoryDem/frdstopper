"use strict";

// Hide header when scrolling
window.addEventListener("load", function () {
  let isScrolling;
  let position = 0;
  const delta = 5;
  const header =
    document.querySelector(".header") || document.querySelector("#top-menu");
  const stickySidebar = document.querySelector(".sidebar__sticky-content");

  window.addEventListener("scroll", function () {
    isScrolling = true;
  });

  setInterval(function () {
    if (isScrolling && header) {
      scrollFunction();
      isScrolling = false;
    }
  }, 250);

  function scrollFunction() {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(position - currentScroll) <= delta) return;

    if (currentScroll > position && currentScroll > header.offsetHeight) {
      header.classList.add("header-hidden");
      stickySidebar?.classList.add("moveUp");
    } else {
      header.classList.remove("header-hidden");
      stickySidebar?.classList.remove("moveUp");
    }

    position = currentScroll;
  }
});

// Block/unblock page scroll
const bodyUnlock = () => {
  const wrapper = document.querySelector(".page-wrapper");
  const lock_padding = document.querySelectorAll("[data-lp]");

  lock_padding.forEach((el) => (el.style.paddingRight = "0px"));
  if (wrapper) wrapper.style.paddingRight = "0px";

  document.documentElement.classList.remove("lock");
};

const bodyLock = () => {
  const wrapper = document.querySelector(".page-wrapper");
  const lock_padding = document.querySelectorAll("[data-lp]");
  const scrollBarCompensation = window.innerWidth - wrapper.offsetWidth + "px";

  lock_padding.forEach((el) => (el.style.paddingRight = scrollBarCompensation));
  if (wrapper) wrapper.style.paddingRight = scrollBarCompensation;

  document.documentElement.classList.add("lock");
};

// Debounce: Prevents rapid clicks from causing inconsistent menu state
let isLockedToggle = false;
const toggleMenu = () => {
  if (isLockedToggle) return;

  isLockedToggle = true;
  const burger = document.querySelector(".burger-btn");
  const menu = document.querySelector(".header__menu");

  burger.classList.toggle("active");
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    bodyLock();
  } else {
    bodyUnlock();
  }

  setTimeout(() => {
    isLockedToggle = false;
  }, 300); // debounce delay
};

document.querySelector(".burger-btn").addEventListener("click", toggleMenu);

// Auto-close mobile menu on resize (e.g. phone rotated)
window.addEventListener("resize", () => {
  const burger = document.querySelector(".burger-btn");
  const menu = document.querySelector(".header__menu");

  if (window.innerWidth > 768 && menu.classList.contains("active")) {
    burger.classList.remove("active");
    menu.classList.remove("active");
    bodyUnlock();
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
