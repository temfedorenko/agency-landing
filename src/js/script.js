'use strict';

window.addEventListener('DOMContentLoaded', () => {
	// BURGER MENU

	const burgerMenu = document.querySelector('.burger-menu'),
		menuContent = document.querySelector('.menu'),
		menuItems = document.querySelectorAll('.menu__item'),
		body = document.querySelector('body');

	function calcScrollbarWidth() {
		const scrollWidth = window.innerWidth - body.clientWidth + 'px';

		return scrollWidth;
	}

	const scrollWidth = calcScrollbarWidth();

	function lockBody() {
		body.style.overflow = 'hidden';
		body.style.marginRight = scrollWidth;
	}

	function unlockBody() {
		setTimeout(() => {
			body.style.overflow = '';
			body.style.marginRight = '0';
		}, 500);
	}

	function openBurgerMenu() {
		menuContent.classList.add('active');
		burgerMenu.classList.add('burger-menu_active');
		lockBody();
	}

	function closeBurgerMenu() {
		menuContent.classList.remove('active');
		burgerMenu.classList.remove('burger-menu_active');
		unlockBody();
	}

	burgerMenu.addEventListener('click', () => {
		if (!menuContent.classList.contains('active')) {
			openBurgerMenu();
		} else {
			closeBurgerMenu();
		}
	});

	menuItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			if (e.target && e.target.matches('.menu__link')) {
				closeBurgerMenu();
			}
		});
	});

	// SVG HOVER EFFECT

	const servicesButtons = document.querySelectorAll('.services__item .item__btn'),
		icons = document.querySelectorAll('.item__icon svg path');

	servicesButtons.forEach((servicesBtn, i) => {
		servicesBtn.addEventListener('mouseenter', () => {
			icons[i].style.fill = '#05fab8';
			icons[i].style.transition = 'all 0.6s';
		});
	});
	servicesButtons.forEach((servicesBtn, i) => {
		servicesBtn.addEventListener('mouseleave', () => {
			icons[i].style.fill = '#000';
		});
	});

	// PORTFOLIO TABS Portfolio

	const tabsWrapper = document.querySelector('.portfolio__tabs'),
		tabs = document.querySelectorAll('.portfolio__tab'),
		tabsContent = document.querySelectorAll('.portfolio__content-item');

	function hideTabsContent() {
		tabsContent.forEach((tabContent) => {
			tabContent.classList.remove('active-tab-content');
		});

		tabs.forEach((tab) => {
			tab.classList.remove('active-tab');
		});
	}

	hideTabsContent();

	function showTabContant(i = 0) {
		tabsContent[i].classList.add('active-tab-content');
		tabs[i].classList.add('active-tab');
	}

	showTabContant();

	tabsWrapper.addEventListener('click', (e) => {
		if (e.target && e.target.matches('.portfolio__tab')) {
			tabs.forEach((tab, i) => {
				if (e.target === tab) {
					hideTabsContent();
					showTabContant(i);
				}
			});
		}
	});

	// PORTFOLIO TABS Testimonial

	const dotsWrapperDesctop = document.querySelector('.testimonial__dots_desctop'),
		dotsWrapperMobile = document.querySelector('.testimonial__dots_mobile'),
		dotsDesctop = document.querySelectorAll('.testimonial__dot_desctop'),
		dotsMobile = document.querySelectorAll('.testimonial__dot_mobile'),
		testimonialContent = document.querySelectorAll('.testimonial__content');

	function hideTestimonialContent() {
		testimonialContent.forEach((item) => {
			item.classList.remove('testimonial__content-active');
		});

		dotsDesctop.forEach((dot) => {
			dot.classList.remove('active-dot');
		});

		dotsMobile.forEach((dot) => {
			dot.classList.remove('active-dot');
		});
	}

	hideTestimonialContent();

	function showTestimonialContent(i = 0) {
		testimonialContent[i].classList.add('testimonial__content-active');
		dotsDesctop[i].classList.add('active-dot');
		dotsMobile[i].classList.add('active-dot');
	}

	showTestimonialContent();

	function addListener(wrapper, dots, dotsSelector) {
		wrapper.addEventListener('click', (e) => {
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

	addListener(dotsWrapperDesctop, dotsDesctop, '.testimonial__dot_desctop');
	addListener(dotsWrapperMobile, dotsMobile, '.testimonial__dot_mobile');

	// MODAL

	const modal = document.querySelector('.modal'),
		modalContent = document.querySelector('.modal__content'),
		modalTrigger = document.querySelector('.hello__btn');

	function closeModal() {
		modal.classList.remove('show');
		modalContent.classList.remove('show');

		unlockBody();
	}

	// closeModal();

	function openModal() {
		modal.classList.add('show');
		modalContent.classList.add('show');

		lockBody();
	}

	modalTrigger.addEventListener('click', (e) => {
		e.preventDefault();
		openModal();
	});

	body.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	modal.addEventListener('click', (e) => {
		console.log(e.target);
		if (e.target === modal || e.target.closest('.modal__close')) {
			closeModal();
		}
	});

	//   SCROLL TOP (UP BUTTON)

	const pageUp = document.querySelector('.page-up');

	pageUp.addEventListener('click', (e) => {
		e.preventDefault();

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	});

	// FORMS

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Loading...',
		success: 'Done, thank you!',
		failure: 'Error, please, try later',
	};

	const postData = async (url, data) => {
		let result = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await result.text();
	};

	forms.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.style.margin = '5px auto 0';
			form.append(statusMessage);
			form.classList.add('_sending');
			statusMessage.textContent = message.loading;

			const formData = new FormData(form);

			postData('server.php', formData)
				.then((result) => {
					console.log(result);
					form.classList.remove('_sending');
					statusMessage.textContent = message.success;
				})
				.catch(() => {
					form.classList.remove('_sending');
					statusMessage.textContent = message.failure;
				})
				.finally(() => {
					form.reset();

					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
});
