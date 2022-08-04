class GallerySlider {
	container = document.getElementById('galleryContainer');
	paginationContainer = document.getElementById('galleryPagination');

	currentIndex = 0;

	images = [];
	paginationItems = [];

	interval = null;
	active = false;

	constructor() {
		this.init();
	}

	init() {
		this.switchSlide = this.switchSlide.bind(this);
		this.onResize = this.onResize.bind(this);

		this.getImages();
		this.fillPagination();
		this.onResize();

		this.setEvents();
	}

	setEvents() {
		window.addEventListener('resize', this.onResize);
	}

	getImages() {
		const images = this.container.querySelectorAll('.gallery__img');

		images.forEach((el, i) => {
			if (i === this.currentIndex) {
				el.classList.add('gallery__img_visible');
			} else {
				el.classList.remove('gallery__img_visible');
			}

			this.images.push({
				el,
				index: i,
				active: i === this.currentIndex
			});
		});
	}

	fillPagination() {
		for (let i = 0; i < this.images.length; i++) {
			const el = document.createElement('span');
			el.className = 'gallery__pagination-item';

			if (i === this.currentIndex) {
				el.classList.add('gallery__pagination-item_active');
			}

			this.paginationItems.push({
				el,
				index: i,
				active: i === this.currentIndex
			});

			this.paginationContainer.appendChild(el);
		}
	}

	switchSlide() {
		let nextIndex = this.currentIndex + 1;

		if (nextIndex > this.images.length - 1) {
			nextIndex = 0;
		}

		this.images[this.currentIndex].active = false;
		this.images[this.currentIndex].el.classList.remove('gallery__img_visible');
		this.paginationItems[this.currentIndex].el.active = false;
		this.paginationItems[this.currentIndex].el.classList.remove('gallery__pagination-item_active');

		this.images[nextIndex].active = true;
		this.images[nextIndex].el.classList.add('gallery__img_visible');
		this.paginationItems[nextIndex].el.active = true;
		this.paginationItems[nextIndex].el.classList.add('gallery__pagination-item_active');

		this.currentIndex = nextIndex;
	}

	onResize() {
		if (window.innerWidth > 480 && this.active) {
			clearInterval(this.interval);
			this.active = false;
		} else if (window.innerWidth <= 480 && !this.active) {
			this.active = true;
			this.interval = setInterval(this.switchSlide, 2000);
		}
	}
}

new GallerySlider();