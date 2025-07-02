"use strict";

window.addEventListener("load", function () {
  var isScrolling;
  var position = 0;
  var delta = 5;
  var header =
    document.querySelector(".header") || document.querySelector("#top-menu");
  var stickySidebar = document.querySelector(".sidebar__sticky-content");
  var docHeight = document.documentElement.scrollHeight;
  var winHeight = window.innerHeight;

  window.addEventListener("scroll", function (event) {
    isScrolling = true;
  });

  setInterval(function () {
    if (isScrolling && header) {
      scrollFunction();
      isScrolling = false;
    }
  }, 250);

  function scrollFunction() {
    var currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(position - currentScrollPosition) <= delta) return;

    if (
      currentScrollPosition > position &&
      currentScrollPosition > header.offsetHeight
    ) {
      header.classList.add("header-hidden");
      if (stickySidebar) {
        stickySidebar.classList.add("moveUp");
      }
    } else {
      header.classList.remove("header-hidden");
      if (stickySidebar) {
        stickySidebar.classList.remove("moveUp");
      }
    }
    position = currentScrollPosition;
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

document.querySelector(".burger-btn").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".header__menu").classList.toggle("active");
  document.querySelector("body").classList.toggle("lock");
});
