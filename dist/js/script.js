"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // BURGER MENU

  const burgerMenu = document.querySelector(".burger-menu"),
    menuContent = document.querySelector(".menu"),
    menuItems = document.querySelectorAll(".menu__item");

  function openBurgerMenu() {
    menuContent.classList.add("active");
    burgerMenu.classList.add("burger-menu_active");
    //  document.body.style.cssText = "overflow-y: hidden;";
  }

  function closeBurgerMenu() {
    menuContent.classList.remove("active");
    burgerMenu.classList.remove("burger-menu_active");
    //  document.body.style.cssText = "overflow-y: visible;";
  }

  burgerMenu.addEventListener("click", () => {
    if (!menuContent.classList.contains("active")) {
      openBurgerMenu();
    } else {
      closeBurgerMenu();
    }
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target && e.target.matches(".menu__link")) {
        closeBurgerMenu();
      }
    });
  });

  // SVG HOVER EFFECT

  const servicesButtons = document.querySelectorAll(
      ".services__item .item__btn"
    ),
    icons = document.querySelectorAll(".item__icon svg path");

  servicesButtons.forEach((servicesBtn, i) => {
    servicesBtn.addEventListener("mouseenter", () => {
      icons[i].style.fill = "#05fab8";
      icons[i].style.transition = "all 0.6s";
    });
  });
  servicesButtons.forEach((servicesBtn, i) => {
    servicesBtn.addEventListener("mouseleave", () => {
      icons[i].style.fill = "#000";
    });
  });

  // PORTFOLIO TABS Portfolio

  const tabsWrapper = document.querySelector(".portfolio__tabs"),
    tabs = document.querySelectorAll(".portfolio__tab"),
    tabsContent = document.querySelectorAll(".portfolio__content-item");

  hideTabsContent();

  function hideTabsContent() {
    tabsContent.forEach((tabContent) => {
      tabContent.classList.remove("active-tab-content");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });
  }

  showTabContant();

  function showTabContant(i = 0) {
    tabsContent[i].classList.add("active-tab-content");
    tabs[i].classList.add("active-tab");
  }

  tabsWrapper.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".portfolio__tab")) {
      tabs.forEach((tab, i) => {
        if (e.target === tab) {
          hideTabsContent();
          showTabContant(i);
        }
      });
    }
  });

  // PORTFOLIO TABS Testimonial

  const dotsWrapperDesctop = document.querySelector(
      ".testimonial__dots_desctop"
    ),
    dotsWrapperMobile = document.querySelector(".testimonial__dots_mobile"),
    dotsDesctop = document.querySelectorAll(".testimonial__dot_desctop"),
    dotsMobile = document.querySelectorAll(".testimonial__dot_mobile"),
    testimonialContent = document.querySelectorAll(".testimonial__content");

  hideTestimonialContent();

  function hideTestimonialContent() {
    testimonialContent.forEach((item) => {
      item.classList.remove("testimonial__content-active");
    });

    dotsDesctop.forEach((dot) => {
      dot.classList.remove("active-dot");
    });

    dotsMobile.forEach((dot) => {
      dot.classList.remove("active-dot");
    });
  }

  showTestimonialContent();

  function showTestimonialContent(i = 0) {
    testimonialContent[i].classList.add("testimonial__content-active");
    dotsDesctop[i].classList.add("active-dot");
    dotsMobile[i].classList.add("active-dot");
  }

  function addListener(wrapper, dots, dotsSelector) {
    wrapper.addEventListener("click", (e) => {
      if (e.target && e.target.matches(dotsSelector)) {
        dots.forEach((dot, i) => {
          if (e.target === dot) {
            hideTestimonialContent();
            showTestimonialContent(i);
          }
        });
      }
    });
  }

  addListener(dotsWrapperDesctop, dotsDesctop, ".testimonial__dot_desctop");
  addListener(dotsWrapperMobile, dotsMobile, ".testimonial__dot_mobile");
});
