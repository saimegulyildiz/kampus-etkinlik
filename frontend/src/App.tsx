
import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent } from "./types/campus-event";

type PageName = "home" | "events" | "add" | "detail" | "update";

const menuItems: { label: string; page: PageName }[] = [
  { label: "Ana Sayfa", page: "home" },
  { label: "Etkinlikler", page: "events" },
  { label: "Ekle", page: "add" },
];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function formatDate(date: string) {
    const [day, month, year] = date.split("-");
    return `${day}.${month}.${year}`;
  }

  function dateForSort(date: string) {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  }

  // ADIM 9: Yaklaşan iki etkinlik
  const upcoming = [...events]
    .sort((a, b) =>
      dateForSort(a.date).localeCompare(dateForSort(b.date))
    )
    .slice(0, 2);

  // ADIM 10: Kategori seçenekleri
  const categories = [...new Set(events.map((event) => event.category))];

  // ADIM 10: Arama ve kategori filtreleme
  const filtered = events.filter((event) => {
    const text = searchText.trim().toLocaleLowerCase("tr-TR");

    const searchableText = [
      event.title,
      event.description,
      event.location,
      event.category,
    ]
      .join(" ")
      .toLocaleLowerCase("tr-TR");

    const matchesSearch = searchableText.includes(text);
    const matchesCategory =
      category === "" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  // ADIM 12: Etkinliği ID ile bul
  function findEventById(
    id: string | null
  ): CampusEvent | undefined {
    return events.find((event) => event.id === id);
  }

  const selected = selectedId
    ? findEventById(selectedId)
    : undefined;

  // ADIM 11: Sekme başlığı
  const title =
    page === "home"
      ? "Ana Sayfa"
      : page === "events"
        ? "Etkinlikler"
        : page === "add"
          ? "Etkinlik Ekle"
          : page === "update"
            ? "Etkinlik Güncelle"
            : selected
              ? selected.title
              : "Etkinlik Bulunamadı";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Ortak etkinlik kartı
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>

        <p className="kategori-tarih">
          {event.category} · {formatDate(event.date)} · {event.time}
        </p>

        <p>{event.description}</p>

        <p>
          <strong>Konum:</strong> {event.location}
        </p>

        <p>
          <strong>Kontenjan:</strong> {event.capacity} kişi
        </p>

        <button
          type="button"
          onClick={() => go("detail", event.id)}
        >
          Detayları gör
        </button>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>
          {page === "detail" && selected
            ? selected.title
            : page === "home"
              ? "Kampüs Etkinlikleri"
              : page === "events"
                ? "Etkinlikler"
                : page === "add"
                  ? "Etkinlik Ekle"
                  : page === "update"
                    ? "Etkinlik Güncelle"
                    : "Etkinlik Bulunamadı"}
        </h1>

        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.page}>
                <a
                  href={`#${item.page}`}
                  className={page === item.page ? "active" : ""}
                  aria-current={
                    page === item.page ? "page" : undefined
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.page);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* ADIM 9: ANA SAYFA */}
        {page === "home" && (
          <>
            <section className="card">
              <p>Fakültedeki etkinlikleri tek yerden takip edin.</p>
            </section>

            <section className="card">
              <h2>Yaklaşan 2 Etkinlik</h2>

              <div className="etkinlik-listesi">
                {upcoming.map(renderCard)}
              </div>
            </section>
          </>
        )}

        {/* ADIM 10: ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section className="card">
            <h2>Tüm Etkinlikler</h2>

            <div className="filtre">
              <div className="form-group">
                <label htmlFor="arama">Etkinlik ara</label>

                <input
                  type="search"
                  id="arama"
                  placeholder="Etkinlik ara..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="kategori-filtre">Kategori</label>

                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Tümü</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p id="sonuc">
              {filtered.length === 0
                ? "Etkinlik bulunamadı."
                : `${filtered.length} etkinlik bulundu.`}
            </p>

            <div className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {/* ADIM 12: DETAY SAYFASI */}
        {page === "detail" && !selected && (
          <section className="card error-text">
            <h2>Etkinlik bulunamadı.</h2>
            <p>Aradığınız etkinlik mevcut değil.</p>

            <button type="button" onClick={() => go("events")}>
              Listeye dön
            </button>
          </section>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <h2>{selected.title}</h2>

            <div className="detay-icerik">
              {selected.image && (
                <figure className="afis-alani">
                  <img
                    src={selected.image}
                    alt={`${selected.title} afişi`}
                  />
                  <figcaption>
                    {selected.title} etkinlik afişi
                  </figcaption>
                </figure>
              )}

              <div className="kunye-alani">
                <dl>
                  <dt>Tarih</dt>
                  <dd>{formatDate(selected.date)}</dd>

                  <dt>Saat</dt>
                  <dd>{selected.time}</dd>

                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>

                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>

                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>

                <h3>Açıklama</h3>
                <p>{selected.description}</p>
              </div>
            </div>

            <p>
              <button type="button" onClick={() => go("events")}>
                Listeye dön
              </button>
            </p>

            <p>
              <button
                type="button"
                onClick={() => go("update", selected.id)}
              >
                Bu etkinliği güncelle
              </button>
            </p>
          </article>
        )}

        {/* ADIM 13: EKLE VE GÜNCELLE - ORTAK FORM */}
        {(page === "add" || page === "update") && (
          <section className="card">
            <h2>
              {page === "add"
                ? "Etkinlik Ekle"
                : "Etkinlik Güncelle"}
            </h2>

            <form
              className="form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <label htmlFor="title">Etkinlik adı</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  maxLength={80}
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-category">Kategori</label>
                <select id="form-category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Tarih</label>
                <input id="date" name="date" type="date" />
              </div>

              <div className="form-group">
                <label htmlFor="time">Saat</label>
                <input id="time" name="time" type="time" />
              </div>

              <div className="form-group">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  maxLength={500}
                />
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min={1}
                  max={1000}
                />
              </div>

              <div className="form-group">
                <button type="submit">
                  {page === "add" ? "Kaydet" : "Güncelle"}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Saimegül Yıldız &middot; 2416501040 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;