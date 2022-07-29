class DishesScroll {
	scrollbar = document.getElementById('dishesScroll');

	slideLeft = document.getElementById('dishedSlideLeft');
	slideRight = document.getElementById('dishedSlideRight');

	constructor() {
		this.onSlide = this.onSlide.bind(this);

		this.init();
	}

	init() {
		this.setInitialScroll();
		this.setEvents();
	}

	setInitialScroll() {
		const windowWidth = document.body.clientWidth;
		const scrollbarWidth = this.scrollbar.scrollWidth;
		const target = (scrollbarWidth - windowWidth) / 2;

		this.scrollbar.scrollTo(target, 0);

		this.scrollbar.style.scrollBehavior = 'smooth';
	}

	setEvents() {
		this.slideLeft.addEventListener('click', this.onSlide);
		this.slideRight.addEventListener('click', this.onSlide);
	}

	onSlide(e) {
		const direction = e.currentTarget.dataset.direction;
		const target = direction === "left" ? 0 : this.scrollbar.scrollWidth;

		this.scrollbar.scrollTo(target, 0);
	}
}

new DishesScroll();