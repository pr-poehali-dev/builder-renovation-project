import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_URL = "https://functions.poehali.dev/cb10bd71-d788-4a35-8ba6-b51b88bfac9c";

const ITEMS = [
  "Модульные бани — привозим в готовом виде, собираем на участке как конструктор",
  "Каркасные бани — быстро прогреваются и долго удерживают тепло",
  "Бани-бочки — парные овальной формы, визуально напоминающие большие бочки",
  "Бани-вагончики — без фундамента, мобильные, быстрый монтаж",
  "Сухая баня — влажность до 25%, температура до 120°C",
  "Влажная баня — классическая русская парная, влажность до 100%, 50–90°C",
  "Водяная баня — аналог турецкой сауны с большим количеством водяного пара",
  "Отделка и утепление парной под ключ",
  "Монтаж печи, полков, вентиляции и освещения",
];

const COMMON_SPECS_BASE = [
  { label: "Фундамент", value: "Ленточный" },
  { label: "Канализация", value: "Внутренняя" },
  { label: "Полы", value: "Доска 40 мм, стяжка под уклоном" },
  { label: "Стены", value: "Керамзитовые блоки" },
  { label: "Отделка парной", value: "Пенофол + вагонка «люкс»" },
  { label: "Отделка предбанника", value: "Евровагонка" },
  { label: "Утепление потолка", value: "Базальтовая плита" },
  { label: "Печь", value: "Сталь 8 мм, бак 70 л нержавеющий" },
  { label: "Окно в парной", value: "Деревянное 380×380 мм" },
  { label: "Крыша", value: "Двухскатная" },
  { label: "Двери", value: "2 шт." },
];

const PROJECTS = [
  {
    id: "bath-24x4",
    title: "Баня 2,4 × 4 м",
    size: "2,4 × 4 м",
    description: "Баня разделена на 2 помещения: предбанник и парная. В парной есть лавка и полог.",
    specs: [{ label: "Размер", value: "2,4 × 4 м" }, ...COMMON_SPECS_BASE],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/d9baa0ea-07df-4e26-a374-0d7fd53f92d5.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/d98c3b9e-6701-45bb-9301-baf747027610.jpg",
    ],
  },
  {
    id: "bath-3x4",
    title: "Баня 3 × 4 м",
    size: "3 × 4 м",
    description: "Баня разделена на 2 помещения: предбанник и парная. В парной есть лавка и полог.",
    specs: [{ label: "Размер", value: "3 × 4 м" }, ...COMMON_SPECS_BASE],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/be5f3d84-c917-41b4-ad65-0579fd38422d.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/d98c3b9e-6701-45bb-9301-baf747027610.jpg",
    ],
  },
  {
    id: "bath-3x5",
    title: "Баня 3 × 5 м",
    size: "3 × 5 м",
    description: "Баня разделена на 2 помещения: предбанник и парная. В парной есть лавка и полог.",
    specs: [{ label: "Размер", value: "3 × 5 м" }, ...COMMON_SPECS_BASE],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/c90873c8-907e-481e-b02e-23e77ef36094.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/d98c3b9e-6701-45bb-9301-baf747027610.jpg",
    ],
  },
];

type Photo = { key: string; url: string };

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ProjectCard({
  project,
  onLightbox,
}: {
  project: typeof PROJECTS[0];
  onLightbox: (url: string) => void;
}) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(PORTFOLIO_URL)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.photos || []).filter((p: Photo) =>
          p.key.includes(project.id + "__")
        );
        setPhotos(filtered);
      })
      .catch(() => {});
  }, [project.id]);

  const displayPhotos = photos.length > 0 ? photos : project.aiPhotos.map((url) => ({ key: url, url }));
  const isAI = photos.length === 0;

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");
    const uploaded: Photo[] = [];
    for (const file of Array.from(files)) {
      try {
        const image = await toBase64(file);
        const res = await fetch(PORTFOLIO_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image, category: project.id + "__" + project.title, contentType: file.type }),
        });
        const data = await res.json();
        if (data.ok) uploaded.push({ key: data.key, url: data.url });
        else setUploadError("Ошибка загрузки");
      } catch {
        setUploadError("Ошибка загрузки");
      }
    }
    setPhotos((prev) => [...prev, ...uploaded]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (key: string) => {
    if (!confirm("Удалить фото?")) return;
    await fetch(PORTFOLIO_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    setPhotos((prev) => prev.filter((p) => p.key !== key));
  };

  return (
    <div className="bg-[#1a1a1a] overflow-hidden mb-10">
      {/* Фото */}
      <div className={`grid gap-px bg-yellow-400/10 ${displayPhotos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
        {displayPhotos.map((photo, i) => (
          <div
            key={i}
            className="aspect-video relative overflow-hidden group cursor-pointer"
            onClick={() => onLightbox(photo.url)}
          >
            <img src={photo.url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {adminOpen && !isAI && (
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(photo.key); }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="Trash2" size={14} className="text-white" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Дисклеймер ИИ */}
      {isAI && (
        <div className="bg-[#111] px-4 py-2 flex items-center gap-2">
          <Icon name="Info" size={13} className="text-gray-600 flex-shrink-0" />
          <span className="font-body text-gray-600 text-xs">Фото создано с помощью ИИ и может отличаться от действительности</span>
        </div>
      )}

      {/* Характеристики */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display text-xl font-bold uppercase">{project.title}</h3>
          <span className="bg-yellow-400 text-black font-display text-xs font-bold px-3 py-1 uppercase">{project.size}</span>
        </div>
        <p className="font-body text-gray-400 text-sm mb-6">{project.description}</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-6">
          {project.specs.map((spec) => (
            <div key={spec.label} className="flex gap-2 text-sm">
              <span className="text-gray-600 font-body flex-shrink-0">{spec.label}:</span>
              <span className="text-gray-300 font-body">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Кнопка управления */}
        <div className="flex justify-start">
          <button
            onClick={() => setAdminOpen(!adminOpen)}
            className="font-display text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-600 hover:text-yellow-400 hover:border-yellow-400/30 px-4 py-2 transition-colors flex items-center gap-2"
          >
            <Icon name="Settings" size={14} />
            {adminOpen ? "Закрыть управление" : "Управление фото"}
          </button>
        </div>

        {/* Панель загрузки */}
        {adminOpen && (
          <div className="mt-4 bg-[#111] p-5 border border-white/10">
            <div className="font-display text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4">Добавить фото</div>
            <label className={`inline-flex items-center gap-2 bg-yellow-400 text-black font-display text-xs font-bold uppercase tracking-widest px-6 py-2 cursor-pointer hover:bg-yellow-300 transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
              <Icon name="Upload" size={14} />
              {uploading ? "Загружаем..." : "Выбрать фото"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleUpload(e.target.files)}
              />
            </label>
            {uploadError && <p className="text-red-400 font-body text-sm mt-3">{uploadError}</p>}
            <p className="text-gray-600 font-body text-xs mt-3">После загрузки своих фото ИИ-заглушки скроются. Форматы: JPG, PNG, WebP.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Bathhouses() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const scrollToContacts = () => {
    navigate("/");
    setTimeout(() => {
      document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="font-body bg-[#111] text-white min-h-screen">
      <header className="bg-[#111]/95 border-b border-yellow-400/20 px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors font-display text-xs uppercase tracking-widest"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
        <span className="text-white/20">|</span>
        <span className="font-display text-xs uppercase tracking-widest text-gray-500">Бани</span>
      </header>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Icon name="Flame" size={26} className="text-black" />
          </div>
          <div>
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-1">Услуги</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-tight">Бани</h1>
          </div>
        </div>

        <p className="font-body text-xl text-gray-300 mb-4 leading-relaxed">Строим бани любого типа — под ключ, с гарантией</p>
        <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-2xl">
          Возводим бани для дачи и загородного дома: каркасные, модульные, бочки и вагончики. Берёмся за проекты любой сложности — от небольшой бани-бочки до капитальной постройки с предбанником и комнатой отдыха. Бесплатный выезд и расчёт.
        </p>

        {/* Что входит */}
        <div className="mb-16">
          <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-6">Что входит</div>
          <div className="grid md:grid-cols-2 gap-3">
            {ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#1a1a1a] px-5 py-4">
                <div className="w-2 h-2 bg-yellow-400 flex-shrink-0 mt-1.5" />
                <span className="font-body text-gray-300 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Проекты */}
        <div className="mb-16">
          <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-2">Проекты бань</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-8">Реализованные объекты</h2>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onLightbox={setLightbox} />
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8 border-l-4 border-yellow-400">
          <h2 className="font-display text-xl font-bold uppercase mb-3">Бесплатный расчёт стоимости</h2>
          <p className="font-body text-gray-400 text-sm mb-5">Перезвоним в течение 30 минут и рассчитаем стоимость работ бесплатно</p>
          <button
            onClick={scrollToContacts}
            className="bg-yellow-400 text-black font-display font-bold uppercase tracking-widest px-8 py-3 text-sm hover:bg-yellow-300 transition-colors"
          >
            Оставить заявку
          </button>
        </div>
      </section>

      {/* Лайтбокс */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white">
            <Icon name="X" size={28} />
          </button>
          <img src={lightbox} alt="Фото бани" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}