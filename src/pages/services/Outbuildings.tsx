import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_URL = "https://functions.poehali.dev/cb10bd71-d788-4a35-8ba6-b51b88bfac9c";

const ITEMS = [
  "Деревянный каркасный хозблок",
  "Деревянный щитовой сарай",
  "Пластиковые хозпостройки",
  "Металлический каркасный хозблок",
  "Металлический хозблок из морского контейнера",
  "Металлическая сборно-разборная постройка",
  "Хозблок кирпичный",
  "Сарай из пеноблока",
  "Хозблок из арболита",
];

const PROJECTS = [
  {
    id: "hb-43",
    title: "Хозблок ХБ-43",
    size: "3 × 4,2 м",
    description: "Каркасный хозблок с отделкой профлистом и имитацией бруса. Подходит для хранения инвентаря, инструментов и техники.",
    specs: [
      { label: "Наружные габариты", value: "3 × 4,2 м" },
      { label: "Внутренние габариты", value: "2,8 × 4 м" },
      { label: "Высота потолка", value: "2,2 – 2,7 м" },
      { label: "Высота от земли", value: "3,27 м" },
      { label: "Фундамент", value: "Столбчатый из бетонных блоков" },
      { label: "Пол", value: "По лагам из доски 50×150 мм" },
      { label: "Каркас стен", value: "Доска 50×100 мм" },
      { label: "Стропила", value: "Доска 50×150 мм" },
      { label: "Утепление", value: "Отсутствует" },
      { label: "Отделка внутри", value: "ОСП" },
      { label: "Отделка снаружи", value: "Профлист + имитация бруса" },
      { label: "Кровля", value: "Профилированный лист" },
      { label: "Снеговой район", value: "4-й" },
      { label: "Ветровой район", value: "2-й" },
    ],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/02a8928e-8c6b-49df-bd52-ad6cdd871cd6.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/167f438a-6e87-4d02-94b8-187e8cfc62d8.jpg",
    ],
  },
  {
    id: "h-36",
    title: "Хозблок Х-36",
    size: "6 × 3 м",
    description: "Просторный каркасный хозблок с отделкой имитацией бруса внутри и снаружи. Подходит для мастерской, хранения техники или оборудования.",
    specs: [
      { label: "Наружные габариты", value: "6 × 3 м" },
      { label: "Внутренние габариты", value: "5,8 × 2,8 м" },
      { label: "Высота потолка", value: "2,6 – 2,85 м" },
      { label: "Высота от земли", value: "3,3 м" },
      { label: "Фундамент", value: "Столбчатый из бетонных блоков" },
      { label: "Лаги пола", value: "Доска 50×150 мм" },
      { label: "Стойки каркаса", value: "Доска 50×100 мм" },
      { label: "Стропила", value: "Доска 50×150 мм" },
      { label: "Утепление", value: "Отсутствует" },
      { label: "Отделка внутри", value: "Имитация бруса / вагонка" },
      { label: "Отделка снаружи", value: "Имитация бруса / вагонка" },
      { label: "Кровля", value: "Профилированный лист" },
      { label: "Снеговой район", value: "4-й" },
      { label: "Ветровой район", value: "2-й" },
    ],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/d55fe70f-e29b-463e-8980-f4b0080236db.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/ce5bf284-6f60-49b3-aaa5-605eb1870a84.jpg",
    ],
  },
  {
    id: "h-39",
    title: "Хозблок Х-39",
    size: "6 × 3 м + дровник 3 × 3 м",
    description: "Каркасный хозблок с пристроенным дровником. Отделка имитацией бруса внутри и снаружи. Удобное решение для дачи: хранение инвентаря и дров под одной крышей.",
    specs: [
      { label: "Габариты хозблока", value: "6 × 3 м" },
      { label: "Габариты дровника", value: "3 × 3 м" },
      { label: "Высота потолка", value: "2,6 – 2,8 м" },
      { label: "Высота от земли", value: "3,25 м" },
      { label: "Фундамент", value: "Столбчатый из бетонных блоков" },
      { label: "Стойки каркаса", value: "Доска 50×100 мм" },
      { label: "Лаги пола", value: "Доска 50×150 мм" },
      { label: "Стропила", value: "Доска 50×150 мм" },
      { label: "Утепление", value: "Отсутствует" },
      { label: "Отделка внутри", value: "Имитация бруса / вагонка" },
      { label: "Отделка снаружи", value: "Имитация бруса / вагонка" },
      { label: "Кровля", value: "Профилированный лист" },
    ],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/9ac5cd55-1504-4f60-8ed3-50a246e33436.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/a25665dd-06ca-4ae2-ac68-cb1dd432caec.jpg",
    ],
  },
  {
    id: "h-34",
    title: "Хозблок Х-34",
    size: "3 × 4 м",
    description: "Компактный каркасный хозблок на монолитной железобетонной плите. Отделка профлистом и имитацией бруса снаружи. Внутри — ОСП или вагонка по желанию.",
    specs: [
      { label: "Наружные габариты", value: "3 × 4 м" },
      { label: "Внутренние габариты", value: "2,8 × 3,8 м" },
      { label: "Высота потолка", value: "2,2 – 2,7 м" },
      { label: "Высота от земли", value: "3,1 м" },
      { label: "Фундамент", value: "Монолитная железобетонная плита" },
      { label: "Каркас стен", value: "Доска 50×100 мм" },
      { label: "Стропила", value: "Доска 50×150 мм" },
      { label: "Утепление", value: "Отсутствует" },
      { label: "Отделка внутри", value: "ОСП / вагонка (опционально)" },
      { label: "Отделка снаружи", value: "Профлист + имитация бруса" },
      { label: "Кровля", value: "Профилированный лист" },
    ],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/42b443f4-a698-45b9-90bf-7c72cf33e96f.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/c78f4c65-843e-4788-b470-1f8ab33e69d5.jpg",
    ],
  },
  {
    id: "h-30-44",
    title: "Хозблок Х-30-44",
    size: "3 × 4,4 м",
    description: "Каркасный хозблок на монолитной железобетонной плите. Отделка профлистом и имитацией бруса снаружи. Внутри — ОСП или вагонка по желанию.",
    specs: [
      { label: "Наружные габариты", value: "3 × 4,4 м" },
      { label: "Внутренние габариты", value: "2,8 × 4,2 м" },
      { label: "Высота потолка", value: "2,2 – 2,7 м" },
      { label: "Высота от земли", value: "3,12 м" },
      { label: "Фундамент", value: "Монолитная железобетонная плита" },
      { label: "Каркас стен", value: "Доска 50×100 мм" },
      { label: "Стропила", value: "Доска 50×150 мм" },
      { label: "Утепление", value: "Отсутствует" },
      { label: "Отделка внутри", value: "ОСП / вагонка (опционально)" },
      { label: "Отделка снаружи", value: "Профлист + имитация бруса" },
      { label: "Кровля", value: "Профилированный лист" },
    ],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/20e2d2a1-436f-45ee-9a56-9e656668177a.jpg",
    ],
  },
  {
    id: "hd-63",
    title: "Хозблок ХД-63",
    size: "4 × 3 м + дровник 2 × 3 м",
    description: "Утеплённый каркасный хозблок с пристроенным дровником. Обшивка профлистом и планкеном снаружи. Внутри — ОСП. Подходит для круглогодичного использования.",
    specs: [
      { label: "Габариты хозблока", value: "4 × 3 м" },
      { label: "Габариты дровника", value: "2 × 3 м" },
      { label: "Высота потолка", value: "2,2 – 2,4 м" },
      { label: "Высота от земли", value: "3,05 м" },
      { label: "Фундамент", value: "Столбчатый из бетонных блоков" },
      { label: "Стойки каркаса", value: "Доска 50×150 мм" },
      { label: "Лаги пола", value: "Доска 50×150 мм" },
      { label: "Стропила", value: "Доска 50×200 мм" },
      { label: "Утепление", value: "Каменная вата 150 мм" },
      { label: "Отделка внутри", value: "ОСП" },
      { label: "Отделка снаружи", value: "Профлист + планкен" },
      { label: "Кровля", value: "Профилированный лист" },
    ],
    aiPhotos: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/12a91016-3de8-41ee-8b5d-a6c5c71cb5d6.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/e865a386-5e0e-4d7f-a575-6b723336db6d.jpg",
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

function ProjectCard({ project, onLightbox }: { project: typeof PROJECTS[0]; onLightbox: (url: string) => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(PORTFOLIO_URL)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.photos || []).filter((p: Photo) => p.key.includes(project.id + "__"));
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
    await fetch(PORTFOLIO_URL, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) });
    setPhotos((prev) => prev.filter((p) => p.key !== key));
  };

  return (
    <div className="bg-[#1a1a1a] overflow-hidden mb-10">
      <div className={`grid gap-px bg-yellow-400/10 ${displayPhotos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
        {displayPhotos.map((photo, i) => (
          <div key={i} className="aspect-video relative overflow-hidden group cursor-pointer" onClick={() => onLightbox(photo.url)}>
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

      {isAI && (
        <div className="bg-[#111] px-4 py-2 flex items-center gap-2">
          <Icon name="Info" size={13} className="text-gray-600 flex-shrink-0" />
          <span className="font-body text-gray-600 text-xs">Фото создано с помощью ИИ и может отличаться от действительности</span>
        </div>
      )}

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

        <button
          onClick={() => setAdminOpen(!adminOpen)}
          className="font-display text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-600 hover:text-yellow-400 hover:border-yellow-400/30 px-4 py-2 transition-colors flex items-center gap-2"
        >
          <Icon name="Settings" size={14} />
          {adminOpen ? "Закрыть управление" : "Управление фото"}
        </button>

        {adminOpen && (
          <div className="mt-4 bg-[#111] p-5 border border-white/10">
            <div className="font-display text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4">Добавить фото</div>
            <label className={`inline-flex items-center gap-2 bg-yellow-400 text-black font-display text-xs font-bold uppercase tracking-widest px-6 py-2 cursor-pointer hover:bg-yellow-300 transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
              <Icon name="Upload" size={14} />
              {uploading ? "Загружаем..." : "Выбрать фото"}
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
            </label>
            {uploadError && <p className="text-red-400 font-body text-sm mt-3">{uploadError}</p>}
            <p className="text-gray-600 font-body text-xs mt-3">После загрузки своих фото ИИ-заглушки скроются. Форматы: JPG, PNG, WebP.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Outbuildings() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const scrollToContacts = () => {
    navigate("/");
    setTimeout(() => { document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" }); }, 100);
  };

  return (
    <div className="font-body bg-[#111] text-white min-h-screen">
      <header className="bg-[#111]/95 border-b border-yellow-400/20 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors font-display text-xs uppercase tracking-widest">
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
        <span className="text-white/20">|</span>
        <span className="font-display text-xs uppercase tracking-widest text-gray-500">Хозпостройки</span>
      </header>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Icon name="Warehouse" size={26} className="text-black" />
          </div>
          <div>
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-1">Услуги</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-tight">Хозпостройки</h1>
          </div>
        </div>

        <p className="font-body text-xl text-gray-300 mb-4 leading-relaxed">Строим хозблоки, сараи и подсобные помещения любого типа</p>
        <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-2xl">
          Возводим хозяйственные постройки из любых материалов — дерева, металла, кирпича, пеноблока и арболита. Работаем быстро и аккуратно. Бесплатный выезд и расчёт стоимости. Скидки пенсионерам и военнослужащим до 45%.
        </p>

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

        <div className="mb-16">
          <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-2">Проекты хозпостроек</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-8">Реализованные объекты</h2>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onLightbox={setLightbox} />
          ))}
        </div>

        <div className="bg-[#1a1a1a] p-8 border-l-4 border-yellow-400">
          <h2 className="font-display text-xl font-bold uppercase mb-3">Бесплатный расчёт стоимости</h2>
          <p className="font-body text-gray-400 text-sm mb-5">Перезвоним в течение 30 минут и рассчитаем стоимость работ бесплатно</p>
          <button onClick={scrollToContacts} className="bg-yellow-400 text-black font-display font-bold uppercase tracking-widest px-8 py-3 text-sm hover:bg-yellow-300 transition-colors">
            Оставить заявку
          </button>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white">
            <Icon name="X" size={28} />
          </button>
          <img src={lightbox} alt="Фото хозблока" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}