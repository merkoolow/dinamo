class Preloader {
	preloaderImages = [];

	minImages = [
		'images/backgrounds/background_header_min.jpg',
		'images/backgrounds/background_main_min.jpg',

		'images/decorations/decoration_bas_min.png',
		'images/decorations/decoration_tomato_min.png',
		'images/decorations/decoration_blur_min.png',

		'images/shared-icons/footer_telegram.svg',
		'images/shared-icons/footer_viber.svg',
		'images/shared-icons/footer_whatsapp.svg',
		'images/shared-icons/git_icon.png',
		'images/shared-icons/icon_face.svg',
		'images/shared-icons/icon_face_hover.svg',
		'images/shared-icons/icon_inst.svg',
		'images/shared-icons/icon_inst_hover.svg',
		'images/shared-icons/icon_phone.svg',
		'images/shared-icons/icon_phone_hover.svg',
		'images/shared-icons/icon_twit.svg',
		'images/shared-icons/icon_twit_hover.svg',
		'images/shared-icons/logo.svg',
		'images/shared-icons/logo_hover.svg',

		'images/proposal/ellipse_dish_1_min.png',
		'images/proposal/ellipse_dish_2_min.png',
		'images/proposal/ellipse_dish_3_min.png',

		'images/dishes/slide_arrow.svg',
		'images/dishes/slide_arrow_hover.svg',
		'images/dishes/bakery_min.jpg',
		'images/dishes/drinks_min.jpg',
		'images/dishes/grill_dishes_min.jpg',
		'images/dishes/hot_dishes_min.jpg',
		'images/dishes/hot_drinks_min.jpg',
		'images/dishes/salads_min.jpg',
		'images/dishes/sauces_min.jpg',
		'images/dishes/soups_min.jpg',

		'images/delivery/delivery_food_min.jpg',
		'images/delivery/delivery_icon_1.png',
		'images/delivery/delivery_icon_2.png',
		'images/delivery/delivery_icon_3.svg',

		'images/gallery/gal1_min.jpg',
		'images/gallery/gal2_min.jpg',
		'images/gallery/gal3_min.jpg',
		'images/gallery/gal4_min.jpg',
		'images/gallery/gal5_min.jpg',
		'images/gallery/gal6_min.jpg',
		'images/gallery/gal7_min.jpg',
		'images/gallery/gal8_min.jpg'
	];

	maxImages = [
		'images/backgrounds/background_header_max.jpg',
		'images/backgrounds/background_main_max.jpg',

		'images/decorations/decoration_bas_max.png',
		'images/decorations/decoration_tomato_max.png',
		'images/decorations/decoration_blur_max.png',

		'images/proposal/ellipse_dish_1_max.png',
		'images/proposal/ellipse_dish_2_max.png',
		'images/proposal/ellipse_dish_3_max.png',

		'images/dishes/bakery_max.jpg',
		'images/dishes/drinks_max.jpg',
		'images/dishes/grill_dishes_max.jpg',
		'images/dishes/hot_dishes_max.jpg',
		'images/dishes/hot_drinks_max.jpg',
		'images/dishes/salads_max.jpg',
		'images/dishes/sauces_max.jpg',
		'images/dishes/soups_max.jpg',

		'images/delivery/delivery_food_max.jpg',

		'images/gallery/gal1_max.jpg',
		'images/gallery/gal2_max.jpg',
		'images/gallery/gal3_max.jpg',
		'images/gallery/gal4_max.jpg',
		'images/gallery/gal5_max.jpg',
		'images/gallery/gal6_max.jpg',
		'images/gallery/gal7_max.jpg',
		'images/gallery/gal8_max.jpg'
	];

	preloaderResources = [];
	minResources = [];
	maxResources = [];

	body = document.body;
	root = document.getElementById('root');
	loader = document.getElementById('loader');

	async preload() {
		await this.preloadStage(0);
		this.loadZeroStage();

		await this.preloadStage(1);
		this.loadFirstStage();

		await this.preloadStage(2);
		this.loadSecondStage();
	}

	async preloadImage(link, stage) {
		return new Promise(res => {
			const img = new Image();
			img.src = link;

			img.onload = () => {
				switch (stage) {
					case 0:
						this.preloaderResources.push({
							link,
							src: img.src
						});
						break;

					case 1:
						this.minResources.push({
							link,
							src: img.src
						});
						break;

					case 2:
						this.maxResources.push({
							link,
							src: img.src
						});
						break;
				}

				res();
			};
		});
	}

	async preloadStage(stage) {
		let resources;

		switch (stage) {
			case 0: resources = this.preloaderImages;
			break;

			case 1: resources = this.minImages;
			break;

			case 2: resources = this.maxImages;
			break;

			default:
			break;
		}

		const operations = [];

		for (let r of resources) {
			operations.push(this.preloadImage(r, stage));
		}

		await Promise.all(operations);
	}

	loadZeroStage() {
		this.loader.classList.remove('hidden');
	}

	loadFirstStage() {
		this.loader.classList.add('hidden');

		const elementsWithMinSrc = document.querySelectorAll('.min-src');
		const elementsWithMinBg = document.querySelectorAll('.min-bg');

		elementsWithMinSrc.forEach(el => {
			const oldSrc = el.src;

			for (const r of this.minResources) {
				if (oldSrc.includes(r.link)) {
					el.src = r.src;
					break;
				}
			}
		});

		elementsWithMinBg.forEach(el => {
			const computedStyles = window.getComputedStyle(el);
			const oldSrc = computedStyles.backgroundImage;

			for (const r of this.minResources) {
				if (oldSrc.includes(r.link)) {
					el.style.backgroundImage = `url(${r.src})`;
					el.style.backgroundPosition = computedStyles.backgroundPosition;
					el.style.backgroundSize = computedStyles.backgroundSize;
					el.style.backgroundRepeat = computedStyles.backgroundRepeat;

					break;
				}
			}
		});

		this.body.classList.remove('overflow-hidden');
		this.root.classList.remove('hidden');
	}

	loadSecondStage() {
		const elementsWithMinSrc = document.querySelectorAll('.min-src');
		const elementsWithMinBg = document.querySelectorAll('.min-bg');

		elementsWithMinSrc.forEach(el => {
			const oldSrc = el.src.replace('min', 'max');

			for (const r of this.maxResources) {
				if (oldSrc.includes(r.link)) {
					el.src = r.src;
					break;
				}
			}
		});

		elementsWithMinBg.forEach(el => {
			const computedStyles = window.getComputedStyle(el);
			const oldSrc = computedStyles.backgroundImage.replace('min', 'max');

			for (const r of this.maxResources) {
				if (oldSrc.includes(r.link)) {
					el.style.backgroundImage = `url(${r.src})`;
					el.style.backgroundPosition = computedStyles.backgroundPosition;
					el.style.backgroundSize = computedStyles.backgroundSize;
					el.style.backgroundRepeat = computedStyles.backgroundRepeat;

					break;
				}
			}
		});
	}
}

const preloader = new Preloader();

preloader.preload();
