const slides = document.querySelectorAll(".slide");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const maxSlide = slides.length - 1;
let curSlide = 0;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  curSlide === maxSlide ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
};

const prevSlide = function () {
  curSlide === 0 ? (curSlide = maxSlide) : curSlide--;
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
