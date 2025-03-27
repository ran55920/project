let currentIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

showSlide(currentIndex);
setInterval(nextSlide, 3000); // تغيير الصورة كل 3 ثوانٍ

