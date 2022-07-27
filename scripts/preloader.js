class Preloader {
	preloaderImages = [];

	minImages = [
		'images/background_header_min.jpg',
		'images/background_main_min.jpg',
		'images/decoration_1_min.png',
		'images/decoration_2_min.png',
		'images/decoration_3_min.png',
		'images/decoration_4_min.png',
		'images/ellipse_dish_1_min.png',
		'images/ellipse_dish_2_min.png',
		'images/ellipse_dish_3_min.png',
		'images/icon_face.svg',
		'images/icon_inst.svg',
		'images/icon_phone.svg',
		'images/icon_twit.svg',
		'images/logo.svg'
	];

	maxImages = [
		'images/background_header_max.jpg',
		'images/background_main_max.jpg',
		'images/decoration_1_max.png',
		'images/decoration_2_max.png',
		'images/decoration_3_max.png',
		'images/decoration_4_max.png',
		'images/ellipse_dish_1_max.png',
		'images/ellipse_dish_2_max.png',
		'images/ellipse_dish_3_max.png'
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
