const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");
const dateInput = document.getElementById("dateInput");

const fromSuggestions = document.getElementById("fromSuggestions");
const toSuggestions = document.getElementById("toSuggestions");

const resultsContainer = document.getElementById("resultsContainer");
const ticketGrid = document.getElementById("ticketGrid");

const categories = document.querySelectorAll(".category-item");
let selectedTransport = "ucak";

let allData = [];

// --- 1️⃣ Verileri yükle ---
async function loadData() {
    try {
        const res = await fetch("veriler.json");
        const json = await res.json();
        allData = json.seferler || [];
    } catch (err) {
        console.error("JSON okunamadı:", err);
    }
}
loadData();

// --- 2️⃣ Şehir önerisi üret ---
function showSuggestions(inputEl, boxEl, field) {
    const value = inputEl.value.trim().toLowerCase();
    boxEl.innerHTML = "";

    if (value.length < 3) {
        boxEl.style.display = "none";
        return;
    }

    const uniqueCities = [
        ...new Set(allData.map(item => item[field].toLowerCase()))
    ];

    const filtered = uniqueCities.filter(city =>
        city.includes(value)
    );

    filtered.forEach(city => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.textContent = city[0].toUpperCase() + city.slice(1);
        div.onclick = () => {
            inputEl.value = div.textContent;
            boxEl.style.display = "none";
        };
        boxEl.appendChild(div);
    });

    boxEl.style.display = filtered.length ? "block" : "none";
}

fromInput.addEventListener("input", () =>
    showSuggestions(fromInput, fromSuggestions, "kalkis")
);

toInput.addEventListener("input", () =>
    showSuggestions(toInput, toSuggestions, "varis")
);

// --- 3️⃣ Kategori seçimi ---
categories.forEach(cat => {
    cat.addEventListener("click", () => {
        categories.forEach(c => c.classList.remove("active"));
        cat.classList.add("active");
        selectedTransport = cat.dataset.transport;
        searchTickets();
    });
});

// --- 4️⃣ Arama & Filtreleme ---
document.getElementById("biletBulBtn").addEventListener("click", searchTickets);

function searchTickets() {
    const from = fromInput.value.trim().toLowerCase();
    const to = toInput.value.trim().toLowerCase();
    const date = dateInput.value
        ? dateInput.value.split("-").reverse().join(".")
        : "";

    // ❗ boşsa arama yapma
    if (from.length < 3 || to.length < 3 || !date) {
        resultsContainer.style.display = "none";
        return;
    }

    const results = allData.filter(item => {
        return (
            item.tip === selectedTransport &&
            item.kalkis.toLowerCase() === from &&
            item.varis.toLowerCase() === to &&
            item.tarih === date
        );
    });

    renderResults(results);
}


// --- 5️⃣ Sonuçları ekrana bas ---
function renderResults(list) {
    ticketGrid.innerHTML = "";

    
    if (!list.length) {
        resultsContainer.style.display = "block";
        ticketGrid.innerHTML = `
      <p class="no-results" style="
          padding: 16px;
          background:#fff3f3;
          border:1px solid #ffb3b3;
          border-radius:10px;
          text-align:center;
      ">
        ❌ Uygun sefer bulunamadı.
      </p>`;
        return;
    }


    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "ticket-card";

        card.innerHTML = `
      <h3>${item.kalkis} → ${item.varis}</h3>
      <p><strong>Tarih:</strong> ${item.tarih}</p>
      <p><strong>Saat:</strong> ${item.saat}</p>
      <p><strong>Firma:</strong> ${item.firma}</p>
      <p><strong>Fiyat:</strong> ${item.fiyat}</p>
      <button class="buy-btn">Bilet Al</button>
    `;

        ticketGrid.appendChild(card);
    });

    resultsContainer.style.display = "block";
}

