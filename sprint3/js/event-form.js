import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");

const mesaj = document.querySelector("#form-mesaj");

const alanlar = {
    ad: document.querySelector("#etkinlik-adi"),
    kategori: document.querySelector("#kategori"),
    tarih: document.querySelector("#tarih"),
    saat: document.querySelector("#saat"),
    konum: document.querySelector("#konum"),
    aciklama: document.querySelector("#aciklama"),
    kontenjan: document.querySelector("#kontenjan")
};

const hataAlanlari = {
    ad: document.querySelector("#ad-hata"),
    kategori: document.querySelector("#kategori-hata"),
    tarih: document.querySelector("#tarih-hata"),
    saat: document.querySelector("#saat-hata"),
    konum: document.querySelector("#konum-hata"),
    aciklama: document.querySelector("#aciklama-hata"),
    kontenjan: document.querySelector("#kontenjan-hata")
};


/* Güncelleme için URL'deki id'yi al */
const id = new URLSearchParams(location.search).get("id");

/* Bu id'ye sahip etkinliği bul */
const etkinlik = events.find((e) => e.id === id);


/* Güncelleme modu */
if (form.dataset.mode === "guncelle") {

    /* Etkinlik bulunamazsa */
    if (!etkinlik) {

        form.outerHTML = `
            <div class="error-text">
                <h2>Etkinlik bulunamadı.</h2>
                <p>Güncellemek istediğiniz etkinlik mevcut değil.</p>
                <a href="etkinlikler.html">Etkinliklere git</a>
            </div>
        `;

    } else {

        /* Formu etkinliğin bilgileriyle doldur */
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date;
        form.elements.saat.value = etkinlik.time;
        form.elements.konum.value = etkinlik.location;
        form.elements.aciklama.value = etkinlik.description;
        form.elements.kontenjan.value = etkinlik.capacity;
    }
}


/* Form gönderildiğinde */
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const fd = new FormData(form);

    const data = {
        title: fd.get("ad").trim(),
        category: fd.get("kategori"),
        date: fd.get("tarih"),
        time: fd.get("saat"),
        location: fd.get("konum").trim(),
        description: fd.get("aciklama").trim(),
        capacity: Number(fd.get("kontenjan"))
    };


    const errors = {};


    /* Eski hataları temizle */
    Object.values(hataAlanlari).forEach((alan) => {
        alan.textContent = "";
    });

    Object.values(alanlar).forEach((alan) => {
        alan.removeAttribute("aria-invalid");
    });


    /* Ad kontrolü */
    if (data.title.length < 3) {
        errors.ad = "En az 3 karakter olmalı.";
    }


    /* Kategori kontrolü */
    if (!data.category) {
        errors.kategori = "Kategori seçiniz.";
    }


    /* Tarih kontrolü */
    if (!data.date) {
        errors.tarih = "Tarih boş bırakılamaz.";
    }


    /* Saat kontrolü */
    if (!data.time) {
        errors.saat = "Saat boş bırakılamaz.";
    }


    /* Yer kontrolü */
    if (!data.location) {
        errors.konum = "Yer boş bırakılamaz.";
    }


    /* Kontenjan kontrolü */
    if (fd.get("kontenjan") !== "") {

        if (data.capacity < 1 || data.capacity > 1000) {
            errors.kontenjan = "Kontenjan 1-1000 arasında olmalı.";
        }
    }


    /* Hataları göster */
    Object.entries(errors).forEach(([alan, hata]) => {

        hataAlanlari[alan].textContent = hata;

        alanlar[alan].setAttribute("aria-invalid", "true");

    });


    /* Hata varsa dur */
    if (Object.keys(errors).length > 0) {

        mesaj.textContent = "Formda hatalı alanlar var.";

        mesaj.style.color = "#dc3545";

        return;
    }


    /* Güncelleme modu */
    if (form.dataset.mode === "guncelle") {

        data.id = id;

        mesaj.style.color = "green";

        mesaj.innerHTML = `
            <p>Etkinlik başarıyla güncellendi.</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;

    } else {

        /* Yeni etkinlik ekleme */
        mesaj.style.color = "green";

        mesaj.innerHTML = `
            <p>Etkinlik bilgileri başarıyla oluşturuldu.</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    }

});
