document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper'ı Başlat
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        // Observer özellikleri: DOM değiştiğinde Swiper'ın kendini yenilemesini sağlar
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        pagination: { 
            el: ".swiper-pagination", 
            clickable: true 
        },
       /*navigation: { 
            nextEl: ".swiper-button-next", 
            prevEl: ".swiper-button-prev" 
        },*/
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    }); 

    const categoryItems = document.querySelectorAll('.category-item');
    const mainTitle = document.getElementById('mainTitle');
    const slides = document.querySelectorAll('.swiper-slide');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Aktif buton stilini değiştir
            const activeItem = document.querySelector('.category-item.active');
            if (activeItem) activeItem.classList.remove('active');
            item.classList.add('active');

            const selectedCategory = item.getAttribute('data-category');
            
            // Başlığı Güncelle
            mainTitle.innerText = selectedCategory === 'all' ? "Tüm Turlar" : item.innerText + " Turları";

            // Filtreleme Mantığı
            slides.forEach(slide => {
                const cardType = slide.getAttribute('data-type');
                if (selectedCategory === 'all' || cardType === selectedCategory) {
                    slide.style.display = 'flex'; // Görünür yap
                } else {
                    slide.style.display = 'none'; // Gizle
                }
            });

            // Swiper'ı tamamen yeniden hesapla
            setTimeout(() => {
                swiper.update();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.slideTo(0);
            }, 10); // Küçük bir gecikme DOM'un güncellenmesine zaman tanır
        });
    });
});