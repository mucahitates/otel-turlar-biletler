document.addEventListener('DOMContentLoaded', () => {
    // 1. Kategoriler Arası Seçim
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            document.querySelector('.category-item.active').classList.remove('active');
            cat.classList.add('active');
            // İstersen burada kategoriye göre şehir listesini değiştirebilirsin
        });
    });

    // 2. Şehir Önerileri (Sahte Veri)
    const cities = ["İstanbul", "Ankara", "İzmir", "Antalya", "Adana", "Bursa", "Trabzon", "Eskişehir", "Muğla", "Gaziantep"];

    function setupAutocomplete(inputId, boxId) {
        const input = document.getElementById(inputId);
        const box = document.getElementById(boxId);

        input.addEventListener('input', () => {
            const query = input.value.toLowerCase();
            box.innerHTML = '';

            if (query.length >= 3) { // 3 harf kuralı
                const filtered = cities.filter(city => city.toLowerCase().includes(query));
                
                if (filtered.length > 0) {
                    box.style.display = 'block';
                    filtered.forEach(city => {
                        const item = document.createElement('div');
                        item.className = 'suggestion-item';
                        item.textContent = city;
                        item.onclick = () => {
                            input.value = city;
                            box.style.display = 'none';
                        };
                        box.appendChild(item);
                    });
                } else {
                    box.style.display = 'none';
                }
            } else {
                box.style.display = 'none';
            }
        });
    }

    setupAutocomplete('fromInput', 'fromSuggestions');
    setupAutocomplete('toInput', 'toSuggestions');

    // Dışarı tıklayınca kutuları kapat
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-group')) {
            document.querySelectorAll('.suggestions-box').forEach(b => b.style.display = 'none');
        }
    });
});