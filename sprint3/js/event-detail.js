import { events } from "./data.js";

const container = document.querySelector("#detay");

const id = new URLSearchParams(location.search).get("id");

const event = events.find((e) => e.id === id);

if (!event) {
document.title = "Etkinlik Bulunamadı";

container.innerHTML = `
    <div class="error-text">
        <h2>Etkinlik bulunamadı.</h2>
        <p>Aradığınız etkinlik mevcut değil.</p>
        <a href="etkinlikler.html">Listeye dön</a>
    </div>
`;

} else {
document.title = event.title;

const date = new Date(
    event.date.split("-").reverse().join("-")
);

const formattedDate = date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

container.innerHTML = `
    <h2>${event.title}</h2>

    <dl>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>

        <dt>Tarih</dt>
        <dd>${formattedDate}</dd>

        <dt>Saat</dt>
        <dd>${event.time}</dd>

        <dt>Konum</dt>
        <dd>${event.location}</dd>

        <dt>Kapasite</dt>
        <dd>${event.capacity} kişi</dd>
    </dl>

    <h3>Açıklama</h3>
    <p>${event.description}</p>

    <p>
        <a href="etkinlikler.html">← Etkinliklere dön</a>
</p>

<p>
    <a href="etkinlik-guncelle.html?id=${event.id}">
        Bu etkinliği güncelle
    </a>
    </p>
`;

}