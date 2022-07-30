class Menu {
	popup = document.getElementById('popupMenu');
	heading = this.popup.querySelector('#popupMenuSectionHeading');
	openButtons = document.querySelectorAll('.dishes__button');
	closeButton = document.getElementById('popupMenuClose');

	constructor() {
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.init();
	}

	init() {
		this.setEvents();
	}

	setEvents() {
		this.openButtons.forEach(el => {
			el.addEventListener('click', this.openMenu);
		});

		this.closeButton.addEventListener('click', this.closeMenu);
	}

	openMenu(e) {
		const btn = e.currentTarget;
		this.heading.textContent = btn.dataset.name;

		this.popup.classList.add('menu_opened');
		this.popup.classList.remove('menu_closed');
		document.body.style.overflowY = 'hidden';
	}

	closeMenu() {
		this.popup.classList.remove('menu_opened');
		this.popup.classList.add('menu_closed');
		document.body.style.overflowY = 'auto';
	}
}

new Menu();