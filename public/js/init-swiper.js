document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true, // Бесконечная прокрутка

     autoplay: {
        delay: 3000, // Пауза между слайдами 
        disableOnInteraction: false, // Продолжать после ручного перелистывания
    },

    // Пагинация
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Кружочки можно нажимать
        //https://yadi.sk/d/MI_bGbULOfDo0w
        renderBullet: function(index, className) {
            // Цветочек вместо кружочка
            return '<span class="' + className + '">🎀</span>';
        },
    },

    // Навигация
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    breakpoints: {
        // Для ширины экрана >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // Для ширины экрана >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
    });
});