class DishesScroll {
	scrollbar = document.getElementById('dishesScroll');

	constructor() {
		this.init();
	}

	init() {
		this.setInitialScroll();
	}

	setInitialScroll() {
		const windowWidth = window.innerWidth;
		const scrollbarWidth = this.scrollbar.scrollWidth;
		const target = (scrollbarWidth - windowWidth) / 2;

		this.scrollbar.scrollTo(target, 0);
	}
}

new DishesScroll();