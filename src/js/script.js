'use strict';

// const servicesBtn = document.querySelectorAll('.services__item .item__btn'),
// 	icon = document.querySelector('.item__icon svg path');

// icon.style.fill = '#000';
// servicesBtn[0].addEventListener('mouseenter', () => {
// 	console.log(icon);
// 	icon.style.fill = '#05fab8';
//    icon.style.transition = 'all 0.6s';
// });
// servicesBtn[0].addEventListener('mouseleave', () => {
// 	console.log(icon);
// 	icon.style.fill = '#000';
// });
// console.log(icon);




window.addEventListener('DOMContentLoaded', () => {

   // BURGER MENU

   const burgerMenu = document.querySelector('.burger-menu'),
         menuContent = document.querySelector('.menu');

   burgerMenu.addEventListener('click', () => {

      if (!menuContent.classList.contains('active')) {
         menuContent.classList.add('active');
         burgerMenu.classList.add('burger-menu_active');

      } else {
         menuContent.classList.remove('active');
         burgerMenu.classList.remove('burger-menu_active');

      }
   });

}) 




