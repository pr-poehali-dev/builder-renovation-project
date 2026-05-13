import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/44c2bb61-84c1-401c-a8da-5b76b183d760.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Работы", href: "#works" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Home", title: "Кровельные работы", desc: "Монтаж и ремонт кровли, реконструкция и утепление крыши, монтаж аксессуаров" },
  { icon: "Building2", title: "Пристройки и веранды", desc: "Строительство пристроек, веранд, террас, надстройки этажа любой сложности" },
  { icon: "Layers", title: "Фасадные работы", desc: "Монтаж сайдинга, фасадных панелей, облицовка цоколя под ключ" },
  { icon: "Square", title: "Отмостка и фундамент", desc: "Бетонная отмостка вокруг дома, устройство фундамента любой сложности" },
  { icon: "Wrench", title: "Ремонт любой сложности", desc: "Полный спектр строительных и ремонтных работ для физических и юридических лиц" },
  { icon: "Shield", title: "Гарантия на работы", desc: "Даём гарантию на все работы, выполненные из нашего материала" },
];

const WORKS = [
  { label: "Кровля", color: "bg-yellow-400" },
  { label: "Фасад", color: "bg-orange-500" },
  { label: "Фундамент", color: "bg-red-600" },
  { label: "Пристройка", color: "bg-yellow-500" },
];

const ADVANTAGES = [
  { num: "15+", text: "лет опыта" },
  { num: "500+", text: "объектов сдано" },
  { num: "45%", text: "скидка льготникам" },
  { num: "100%", text: "гарантия качества" },
];

const SEND_LEAD_URL = "https://functions.poehali.dev/8e18931c-a90b-4bcf-b1f5-65f682a5ac6e";
const PORTFOLIO_URL = "https://functions.poehali.dev/cb10bd71-d788-4a35-8ba6-b51b88bfac9c";

const CATEGORY_COLORS: Record<string, string> = {
  "Кровля": "bg-yellow-400",
  "Фасад": "bg-orange-500",
  "Фундамент": "bg-red-600",
  "Пристройка": "bg-yellow-500",
  "Другое": "bg-gray-500",
};

type Photo = { key: string; url: string; category: string };

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gallery
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Все");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("Кровля");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(PORTFOLIO_URL)
      .then((r) => r.json())
      .then((data) => {
        setPhotos(data.photos || []);
        setCategories(["Все", ...(data.categories || [])]);
      })
      .catch(() => {});
  }, []);

  const filteredPhotos = activeTab === "Все" ? photos : photos.filter((p) => p.category === activeTab);

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
          body: JSON.stringify({ image, category: uploadCategory, contentType: file.type }),
        });
        const data = await res.json();
        if (data.ok) uploaded.push({ key: data.key, url: data.url, category: data.category });
        else setUploadError("Ошибка загрузки файла");
      } catch {
        setUploadError("Ошибка загрузки файла");
      }
    }
    setPhotos((prev) => [...uploaded, ...prev]);
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

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Ошибка отправки. Позвоните нам напрямую.");
      }
    } catch {
      setError("Ошибка сети. Позвоните нам напрямую.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body bg-[#111] text-white min-h-screen">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur border-b border-yellow-400/20">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("#home")} className="font-display text-xl font-bold text-yellow-400 tracking-widest uppercase">
            СтройБригада
          </button>
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-display text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-yellow-400 transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <a
            href="tel:+79176288904"
            className="hidden md:flex items-center gap-2 bg-yellow-400 text-black font-display font-bold text-sm uppercase tracking-widest px-5 py-2 hover:bg-yellow-300 transition-colors duration-200"
          >
            <Icon name="Phone" size={15} />
            Позвонить
          </a>
          {/* Mobile burger */}
          <button className="md:hidden text-yellow-400" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-yellow-400/20 px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-display text-sm font-bold uppercase tracking-widest text-left text-gray-200 hover:text-yellow-400 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a href="tel:+79000000000" className="bg-yellow-400 text-black font-display font-bold text-sm uppercase tracking-widest px-5 py-3 text-center">
              Позвонить
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

        {/* Diagonal accent stripe */}
        <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 px-4 py-1.5 text-xs font-display uppercase tracking-widest mb-6">
            <Icon name="Star" size={12} />
            Работаем с 2009 года
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none mb-6 max-w-3xl">
            Ремонт и<br />
            <span className="text-yellow-400">строительство</span><br />
            под ключ
          </h1>
          <p className="font-body text-gray-300 text-lg max-w-lg mb-10 leading-relaxed">
            Бригада профессионалов выполняет работы любой сложности — быстро, качественно, с гарантией. Скидки пенсионерам и военнослужащим до 45%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("#contacts")}
              className="font-display font-bold uppercase tracking-widest bg-yellow-400 text-black px-8 py-4 text-sm hover:bg-yellow-300 transition-all duration-200 hover:scale-105 active:scale-100"
            >
              Оставить заявку
            </button>
            <button
              onClick={() => scrollTo("#works")}
              className="font-display font-bold uppercase tracking-widest border border-white/30 text-white px-8 py-4 text-sm hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
            >
              Наши работы
            </button>
          </div>
        </div>
      </section>

      {/* ADVANTAGES BAR */}
      <div className="bg-yellow-400">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
          {ADVANTAGES.map((a) => (
            <div key={a.num} className="py-6 text-center border-r border-black/10 last:border-r-0">
              <div className="font-display text-3xl font-bold text-black">{a.num}</div>
              <div className="font-body text-sm font-medium text-black/70 uppercase tracking-wider">{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#161616]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">О компании</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
                Лучшие<br />из лучших
              </h2>
              <p className="font-body text-gray-400 leading-relaxed mb-6">
                Наша бригада имеет большой опыт работы и высокую репутацию на рынке. Мы используем только высококачественные материалы и современное оборудование.
              </p>
              <p className="font-body text-gray-400 leading-relaxed mb-8">
                Работаем с физическими и юридическими лицами. Выполняем работу вовремя — дёшево и качественно. Даём гарантию на все работы из нашего материала.
              </p>
              <div className="flex flex-col gap-3">
                {["Скидки пенсионерам от 5% до 45%", "Скидки военнослужащим от 5% до 45%", "Гарантия на материалы и работу", "Работаем с Юр. и Физ. лицами"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-300 font-body text-sm">
                    <div className="w-2 h-2 bg-yellow-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#222] overflow-hidden">
                <img src={HERO_IMG} alt="Строительство" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 p-6">
                <div className="font-display text-4xl font-bold text-black">15+</div>
                <div className="font-body text-black/70 text-sm uppercase tracking-wider">лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[#111]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Что мы делаем</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Виды работ</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-yellow-400/10">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-[#111] p-8 hover:bg-[#1a1a1a] transition-colors group cursor-default">
                <div className="w-12 h-12 bg-yellow-400/10 flex items-center justify-center mb-5 group-hover:bg-yellow-400 transition-colors">
                  <Icon name={s.icon} size={22} className="text-yellow-400 group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-3">{s.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="py-24 bg-[#161616]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Портфолио</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Наши работы</h2>
          </div>

          {/* Tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`font-display text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors ${
                    activeTab === cat ? "bg-yellow-400 text-black" : "border border-white/20 text-gray-400 hover:border-yellow-400 hover:text-yellow-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.key}
                  className="aspect-square bg-[#222] relative overflow-hidden group cursor-pointer"
                  onClick={() => setLightbox(photo.url)}
                >
                  <img src={photo.url} alt={photo.category} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`absolute top-2 left-2 ${CATEGORY_COLORS[photo.category] || "bg-gray-500"} px-2 py-0.5`}>
                    <span className="font-display text-xs font-bold uppercase text-black">{photo.category}</span>
                  </div>
                  {adminOpen && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(photo.key); }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Trash2" size={14} className="text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-600 font-body">
              {photos.length === 0 ? "Фотографии ещё не добавлены" : "В этой категории пока нет фото"}
            </div>
          )}

          {/* Admin panel */}
          <div className="flex justify-center">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="font-display text-xs font-bold uppercase tracking-widest border border-white/10 text-gray-600 hover:text-yellow-400 hover:border-yellow-400/30 px-4 py-2 transition-colors flex items-center gap-2"
            >
              <Icon name="Settings" size={14} />
              {adminOpen ? "Закрыть управление" : "Управление фото"}
            </button>
          </div>

          {adminOpen && (
            <div className="mt-6 bg-[#1a1a1a] p-6 border border-white/10">
              <div className="font-display text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4">Добавить фото</div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="bg-[#111] border border-white/10 text-white px-4 py-2 font-body text-sm focus:outline-none focus:border-yellow-400"
                >
                  {(categories.filter((c) => c !== "Все")).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <label className={`flex items-center gap-2 bg-yellow-400 text-black font-display text-xs font-bold uppercase tracking-widest px-6 py-2 cursor-pointer hover:bg-yellow-300 transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
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
              </div>
              {uploadError && <p className="text-red-400 font-body text-sm mt-3">{uploadError}</p>}
              <p className="text-gray-600 font-body text-xs mt-3">Можно загрузить несколько фото сразу. Форматы: JPG, PNG, WebP.</p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white">
            <Icon name="X" size={28} />
          </button>
          <img
            src={lightbox}
            alt="Фото работы"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#111]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Связаться</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Оставьте заявку</h2>
            <p className="font-body text-gray-400 mt-4 max-w-lg mx-auto">Перезвоним в течение 30 минут и рассчитаем стоимость работ бесплатно</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-[#1a1a1a] p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
                  <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center">
                    <Icon name="Check" size={32} className="text-black" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase">Заявка принята!</h3>
                  <p className="font-body text-gray-400 text-center">Перезвоним вам в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="font-display text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="font-display text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Комментарий</label>
                    <textarea
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      rows={4}
                      className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                      placeholder="Что нужно сделать?"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 font-body text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-400 text-black font-display font-bold uppercase tracking-widest py-4 text-sm hover:bg-yellow-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Отправляем..." : "Отправить заявку"}
                  </button>
                  <p className="font-body text-gray-600 text-xs text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-8 justify-center">
              <div>
                <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Контакты</div>
                <div className="flex flex-col gap-5">
                  <a href="tel:+79176288904" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Телефон</div>
                      <div className="font-body text-white text-sm">+7 (917) 628-89-04</div>
                    </div>
                  </a>
                  <a href="https://wa.me/79176288904" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">WhatsApp</div>
                      <div className="font-body text-white text-sm">+7 (917) 628-89-04</div>
                    </div>
                  </a>
                  <a href="https://t.me/+79176288904" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Send" size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Telegram</div>
                      <div className="font-body text-white text-sm">+7 (917) 628-89-04</div>
                    </div>
                  </a>
                  <a href="https://max.ru/+79176288904" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MessagesSquare" size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Мессенджер Макс</div>
                      <div className="font-body text-white text-sm">+7 (917) 628-89-04</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Режим работы</div>
                      <div className="font-body text-white text-sm">Пн–Вс: 8:00 — 20:00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-400/10 border border-yellow-400/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Tag" size={18} className="text-yellow-400" />
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-yellow-400">Скидки</span>
                </div>
                <p className="font-body text-gray-300 text-sm leading-relaxed">
                  Пенсионерам и военнослужащим — скидки от <strong className="text-yellow-400">5% до 45%</strong> на все виды работ. Уточняйте при звонке.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold text-yellow-400 tracking-widest uppercase">СтройБригада</div>
          <div className="font-body text-gray-600 text-sm text-center">
            Ремонт и строительство под ключ · Гарантия качества
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-display text-xs uppercase tracking-widest text-gray-600 hover:text-yellow-400 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}