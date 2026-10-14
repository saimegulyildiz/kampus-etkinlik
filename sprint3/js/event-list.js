import { events } from "./data.js";

function createCard(event) {
const date = new Date(
event.date.split("-").reverse().join("-")
);

const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

return `
    <article class="kart">
        <div>
            <span class="rozet">
                ${event.category} ·
                <time>${formattedDate}</time>
            </span>

            <h3>${event.title}</h3>
        </div>

        <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">
            Detay gör &rarr;
        </a>
    </article>
`;

}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
list.innerHTML = dizi.map(createCard).join("");

const sonucSatiri = document.querySelector("#sonuc");

if (sonucSatiri) {
    if (dizi.length === 0) {
        sonucSatiri.textContent = "Etkinlik bulunamadı.";
    } else {
        sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
    }
}

}

/* Ana sayfada sadece yaklaşan 2 etkinlik */
if (list.dataset.limit) {
const yaklasan = [...events]
.sort((a, b) => a.date.localeCompare(b.date))
.slice(0, Number(list.dataset.limit));

render(yaklasan);

} else {
/* Etkinlikler sayfası */

const arama = document.querySelector("#arama");
const kategori = document.querySelector("#kategori-filtre");
const filtreFormu = document.querySelector("#filtre-formu");

/* Kategorileri veriden otomatik oluştur */
const kategoriler = [...new Set(events.map(event => event.category))];

kategoriler.forEach(kategoriAdi => {
    const option = document.createElement("option");
    option.value = kategoriAdi;
    option.textContent = kategoriAdi;
    kategori.appendChild(option);
});

function filtrele() {
    const aranan = arama.value
        .toLocaleLowerCase("tr-TR")
        .trim();

    const secilenKategori = kategori.value;

    const sonuc = events.filter((e) => {

        const metin = `${e.title} ${e.description} ${e.category}`
            .toLocaleLowerCase("tr-TR");

        const metinUyuyor = metin.includes(aranan);

        const kategoriUyuyor =
            secilenKategori === "" ||
            e.category === secilenKategori;

        return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
}

arama.addEventListener("input", filtrele);
kategori.addEventListener("change", filtrele);

filtreFormu.addEventListener("submit", (e) => {
    e.preventDefault();
});

render(events);

}