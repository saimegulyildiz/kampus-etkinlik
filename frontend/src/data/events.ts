
import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description:
      "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
    image: "/afis.png",
  },
  {
    id: "event-2",
    title: "Robotik Kodlama Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "15:00",
    location: "A Blok Salon",
    description:
      "Robotik kodlamanın temellerinin öğretileceği uygulamalı atölye.",
    capacity: 120,
    image: "/robotik.png",
  },
  {
    id: "event-3",
    title: "Yazılım Geliştirme Söyleşisi",
    category: "Söyleşi",
    date: "25-10-2026",
    time: "13:00",
    location: "B Blok Konferans Salonu",
    description:
      "Yazılım sektöründe kariyer ve güncel teknolojiler üzerine söyleşi.",
    capacity: 100,
    image: "/afis.svg",
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "02-11-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı",
    description:
      "HTML, CSS ve JavaScript kullanarak web sayfası geliştirme atölyesi.",
    capacity: 30,
    image: "/afis.svg",
  },
  {
    id: "event-5",
    title: "Girişimcilik Semineri",
    category: "Seminer",
    date: "10-11-2026",
    time: "14:00",
    location: "C Blok Konferans Salonu",
    description:
      "Girişimcilik, iş fikri geliştirme ve girişimcilik ekosistemi hakkında seminer.",
    capacity: 150,
    image: "/afis.svg",
  },
  {
    id: "event-6",
    title: "Yapay Zeka Söyleşisi",
    category: "Söyleşi",
    date: "18-11-2026",
    time: "16:00",
    location: "A Blok Konferans Salonu",
    description:
      "Yapay zekanın geleceği ve eğitim hayatındaki kullanımı üzerine söyleşi.",
    capacity: 200,
    image: "/afis.svg",
  },
];