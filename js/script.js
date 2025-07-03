// "use strict";

// window.addEventListener("load", function () {
//   var isScrolling;
//   var position = 0;
//   var delta = 5;
//   var header =
//     document.querySelector(".header") || document.querySelector("#top-menu");
//   var stickySidebar = document.querySelector(".sidebar__sticky-content");
//   var docHeight = document.documentElement.scrollHeight;
//   var winHeight = window.innerHeight;

//   window.addEventListener("scroll", function (event) {
//     isScrolling = true;
//   });

//   setInterval(function () {
//     if (isScrolling && header) {
//       scrollFunction();
//       isScrolling = false;
//     }
//   }, 250);

//   function scrollFunction() {
//     var currentScrollPosition =
//       window.pageYOffset || document.documentElement.scrollTop;

//     if (Math.abs(position - currentScrollPosition) <= delta) return;

//     if (
//       currentScrollPosition > position &&
//       currentScrollPosition > header.offsetHeight
//     ) {
//       header.classList.add("header-hidden");
//       if (stickySidebar) {
//         stickySidebar.classList.add("moveUp");
//       }
//     } else {
//       header.classList.remove("header-hidden");
//       if (stickySidebar) {
//         stickySidebar.classList.remove("moveUp");
//       }
//     }
//     position = currentScrollPosition;
//   }
// });
// ///
// ////
// let bodyLockStatus = true;
// let bodyUnlock = (delay = 500) => {
//   let wrapper = document.querySelector(".page-wrapper");
//   if (bodyLockStatus) {
//     let lock_padding = document.querySelectorAll("[data-lp]");
//     setTimeout(() => {
//       for (let index = 0; index < lock_padding.length; index++) {
//         const el = lock_padding[index];
//         el.style.paddingRight = "0px";
//       }
//       wrapper.style.paddingRight = "0px";
//       document.documentElement.classList.remove("lock");
//     }, delay);
//     bodyLockStatus = false;
//     setTimeout(function () {
//       bodyLockStatus = true;
//     }, delay);
//   }
// };
// let bodyLock = (delay = 500) => {
//   let wrapper = document.querySelector(".page-wrapper");
//   if (bodyLockStatus) {
//     // let lock_padding = document.querySelectorAll("[data-lp]");
//     // for (let index = 0; index < lock_padding.length; index++) {
//     //   const el = lock_padding[index];
//     //   el.style.paddingRight = window.innerWidth - wrapper.offsetWidth + "px";
//     // }
//     wrapper.style.paddingRight = window.innerWidth - wrapper.offsetWidth + "px";
//     document.documentElement.classList.add("lock");
//     bodyLockStatus = false;
//     setTimeout(function () {
//       bodyLockStatus = true;
//     }, delay);
//   }
// };
// ///
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

// document.querySelector(".burger-btn").addEventListener("click", function () {
//   this.classList.toggle("active");
//   document.querySelector(".header__menu").classList.toggle("active");
//   // document.querySelector("body").classList.toggle("lock");
//   if (document.querySelector(".header__menu").classList.contains("active")) {
//     bodyLock(); // при открытии меню — блокируем скролл
//   } else {
//     bodyUnlock(); // при закрытии меню — разблокируем
//   }
// });

"use strict";

// Хедер-скрытие при скролле
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

// Блокировка/разблокировка скролла
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

// Debounce: защита от спама-кликов
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

// Скролл вверх при перезагрузке
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
