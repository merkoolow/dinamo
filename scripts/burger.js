class Burger {
	mainNav = document.getElementById('mainNav');

	openButton = document.getElementById('burgerButtonOpen');
	closeButton = document.getElementById('burgerButtonClose');

	scrollTop = document.getElementById('scrollTopButton');

	burger = document.getElementById('burger');
	burgerMenu = this.burger.querySelector('.burger__menu');

	visible = true;
	resolution = 'desktop';

	constructor() {
		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.onResize = this.onResize.bind(this);

		this.init();

		this.onScroll();
		this.onResize();
	}

	init() {
		this.setEvents();
	}

	setEvents() {
		this.openButton.addEventListener('click', this.onOpen);
		this.closeButton.addEventListener('click', this.onClose);

		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', this.onResize);
	}

	onOpen() {
		this.burgerMenu.classList.remove('burger__menu_closed');
		this.burgerMenu.classList.add('burger__menu_opened');

		this.openButton.classList.remove('burger__button_enabled');
		this.openButton.classList.add('burger__button_disabled');

		this.closeButton.classList.remove('burger__button_disabled');
		this.closeButton.classList.add('burger__button_enabled');
	}

	onClose() {
		this.burgerMenu.classList.remove('burger__menu_opened');
		this.burgerMenu.classList.add('burger__menu_closed');

		this.closeButton.classList.remove('burger__button_enabled');
		this.closeButton.classList.add('burger__button_disabled');

		this.openButton.classList.remove('burger__button_disabled');
		this.openButton.classList.add('burger__button_enabled');
	}

	toggleVisibility(visible) {
		if (visible) {
			this.burger.style.display = 'block';
		} else {
			this.burger.style.display = 'none';
		}

		this.visible = visible;
	}

	toggleScrollTop(visible) {
		if (visible) {
			this.scrollTop.style.display = 'block';
		} else {
			this.scrollTop.style.display = 'none';
		}
	}

	onScroll() {
		const scrollPosition = window.scrollY;

		if (scrollPosition > this.mainNav.clientHeight) {
			if (this.resolution !== 'mobile' && !this.visible) {
				this.toggleVisibility(true);
			}
			this.toggleScrollTop(true);
		} else if (scrollPosition <= this.mainNav.clientHeight) {
			if (this.resolution !== 'mobile' && this.visible) {
				this.toggleVisibility(false);
			}
			this.toggleScrollTop(false);
		}
	}

	onResize() {
		const resolution = window.innerWidth >= 1025 ? 'desktop' : 'mobile';

		if (this.resolution !== resolution && resolution === 'mobile') {
			this.toggleVisibility(true);
		} else if (this.resolution !== resolution && resolution === 'desktop') {
			this.resolution = resolution;
			this.onScroll();
		}

		this.resolution = resolution;
	}
}

new Burger();