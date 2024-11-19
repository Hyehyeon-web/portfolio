window.addEventListener("load", function () {
	let tab = document.querySelector(".open .tab");
	let menu = document.querySelector(".mobile"); 

	let section = document.querySelectorAll("section");
	let pageList = [document.querySelector(".main")];

	section.forEach(function (item) {
		pageList.push(item); 
		// console.log(pageList);
	});

	pageList.forEach(function (item, i) {
		gsap.timeline({
			scrollTrigger: {
				trigger: item, 
				start: "top center", 
				end: "bottom 80%",
				onEnter: function(){
					controlMenu(i);

					// console.log("enter : "+i);
				},
				onEnterBack: function(){
					controlMenu(i);

					// console.log("enter back : "+i);
				}
			}
		});
	});

	let header = document.querySelector("header");
	let gnb = document.querySelector("nav");
	let gnbList = document.querySelectorAll("nav ul > li");
	let mobileGnb = document.querySelector(".mobile");
	let mobileGnbList = mobileGnb.querySelectorAll(".mobile ul > li");

	function controlMenu(i) {
		gnbList.forEach(function (list, j) {
			if (j === i) {
				gnbList[j].firstElementChild.classList.add("on"); 
				mobileGnbList[j].firstElementChild.classList.add("on");
			} else {
				gnbList[j].firstElementChild.classList.remove("on"); 
				mobileGnbList[j].firstElementChild.classList.remove("on");
			}
		});

		if (i !== 0) {
			header.classList.add("fixed");
		} else {
			header.classList.remove("fixed");
		}
	}

	gnbList.forEach(function (list, i) {
		list.addEventListener("click", function (e) {
			e.preventDefault();  

			gsap.to(window, {
				scrollTo: pageList[i],
				duration: 1,
				ease: "power2.out" 
			});
		});
	});

	mobileGnbList.forEach(function (list, i) {
		list.addEventListener("click", function (e) {
			e.preventDefault();

			let topPos = pageList[i].offsetTop;

			mobileGnb.classList.remove("active"); 
			tab.classList.remove("active");

			setTimeout(function(){
				gsap.to(window, {
					scrollTo: topPos,
					duration: 0.4,
					ease: "power2.out"
				});
			}, 500);
		});
	});

	// Tab
	tab.addEventListener("click", function (e) {
		e.preventDefault();

		if (tab.classList.contains("active")) {
			document.body.classList.remove("fixed");
			tab.classList.remove("active");
			mobileGnb.classList.remove("active");  
		} else {
			document.body.classList.add("fixed");
			tab.classList.add("active");
			mobileGnb.classList.add("active");  
		}
	});

	// main
	const mainSlider = document.querySelector(".main .main_slider");
	let controller = mainSlider.querySelector(".controller");
	let [num, progressbar, direction] = controller.children;
	let bar = progressbar.firstElementChild;
	let [prevBtn, nextBtn] = direction.children;
	let tween, current, total;

	function swiperButtonInteraction(n) {
		switch (n) {
			case 0:
				prevBtn.classList.remove("visible");
				nextBtn.classList.add("visible");
				break;
			case total - 1:
				prevBtn.classList.add("visible");
				nextBtn.classList.remove("visible");
				break;
			default:
				prevBtn.classList.add("visible");
				nextBtn.classList.add("visible");
				break;
		}
	}

	const mainSwiper = new Swiper(".mainSwiper", {
		speed: 1200,
		loop: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		/*
		autoplay: {
			delay: 8000,
			disableOnInteraction: false
		},
		*/
		
		on: {
			init() {
				current = this.realIndex;
				total = this.slides.length;

				num.innerHTML = `${current + 1} / ${total}`;

				swiperButtonInteraction(current);

				tween = gsap.to(bar, { width: "100%", duration: 8 });
			},
			slideChange() {
				current = this.realIndex;

				num.innerHTML = `${current + 1} / ${total}`;

				swiperButtonInteraction(current);

				if (tween) {
					tween.pause();
					tween.seek(0);
				}

				setTimeout(function () {
					if (tween) {
						tween.play();
					}
				}, 10);
			}
		}
	});

	// main - 버튼 클릭 이벤트
	prevBtn.addEventListener("click", function (e) {
		e.preventDefault();
		mainSwiper.slidePrev();
	});

	nextBtn.addEventListener("click", function (e) {
		e.preventDefault();
		mainSwiper.slideNext();
	});

	// keytext
	let tl = gsap.timeline();

	tl.from(".concept strong", {
		opacity: 0,
		y: 20, 
		duration: 0.5,
		stagger: 0.5,
	});

	tl.from(".keytext .title", {
		opacity: 0,
		y: 20,  
		duration: 1,
	});

	// page1
	gsap.registerPlugin(ScrollTrigger);

	const skillsTl = gsap.timeline({
		scrollTrigger: {
			trigger: "#page1",
			start: "top center",
		}
	});

	// skills 목록 애니메이션
	skillsTl.from(".skills li", {
		y: 50,
		opacity: 0,
		duration: 1,
		stagger: 1
	});

	// page2
	const brands = document.querySelectorAll('#page2 ul li strong.brand');

	brands.forEach(function (brand) {
		brand.addEventListener('click', function () {
			const parentLi = this.parentElement;
			const desc = parentLi.querySelector('.desc');

			brands.forEach(function (b) {
				const otherParentLi = b.parentElement;
				const otherDesc = otherParentLi.querySelector('.desc');

				if (otherParentLi !== parentLi) {
					otherParentLi.classList.remove('active');
					gsap.to(otherDesc, {
						height: 0,
						opacity: 0,
						duration: 0.3,
						onComplete: () => {
							otherDesc.style.display = 'none';
						}
					});
				}
			});

			parentLi.classList.toggle('active');

			if (parentLi.classList.contains('active')) {
				desc.style.display = 'block';
				const height = desc.scrollHeight;

				gsap.fromTo(desc, {
					height: 0,
					opacity: 0
				}, {
					height: height,
					opacity: 1,
					duration: 0.3
				});
			} else {
				gsap.to(desc, {
					height: 0,
					opacity: 0,
					duration: 0.3,
					onComplete: () => {
						desc.style.display = 'none';
					}
				});
			}
		});
	});

	// update
	new Swiper(".updateSwiper", {
		loop: true,
		slidesPerView: 1,
		// centeredSlides: true,
		spaceBetween: 10,
		breakpoints: {
			720: {
				slidesPerView: 3,
				spaceBetween: 10,
				pagination: {
					el: ".updateSwiper .swiper-pagination",
					type: "fraction"
				},
				navigation: {
					prevEl: ".updateSwiper .swiper-button-prev",
					nextEl: ".updateSwiper .swiper-button-next"
				}
			}
		}
	});
});