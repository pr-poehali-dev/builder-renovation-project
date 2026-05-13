import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

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

const PROJECTS = [
  {
    title: "Баня 2,4 × 4 м",
    size: "2,4 × 4 м",
    images: [
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/a30c6a20-7e50-4700-ae7f-13dca46c37fd.jpg",
      "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/74afc2cf-03ff-452a-a983-a45cb4b72d84.jpg",
    ],
    specs: [
      { label: "Размер", value: "2,4 × 4 м" },
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
    ],
    description: "Баня разделена на 2 помещения: предбанник и парная. В парной есть лавка и полог.",
  },
];

export default function Bathhouses() {
  const navigate = useNavigate();

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

        {/* Проекты бань */}
        <div className="mb-16">
          <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-2">Проекты бань</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-8">Реализованные объекты</h2>

          {PROJECTS.map((project) => (
            <div key={project.title} className="bg-[#1a1a1a] overflow-hidden mb-8">
              {/* Фото */}
              <div className="grid grid-cols-2 gap-px bg-yellow-400/10">
                {project.images.map((img, i) => (
                  <div key={i} className="aspect-video relative overflow-hidden">
                    <img src={img} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Дисклеймер ИИ */}
              <div className="bg-[#111] px-4 py-2 flex items-center gap-2">
                <Icon name="Info" size={13} className="text-gray-600 flex-shrink-0" />
                <span className="font-body text-gray-600 text-xs">Фото создано с помощью ИИ и может отличаться от действительности</span>
              </div>

              {/* Описание и характеристики */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display text-xl font-bold uppercase">{project.title}</h3>
                  <span className="bg-yellow-400 text-black font-display text-xs font-bold px-3 py-1 uppercase">{project.size}</span>
                </div>
                <p className="font-body text-gray-400 text-sm mb-6">{project.description}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {project.specs.map((spec) => (
                    <div key={spec.label} className="flex gap-2 text-sm">
                      <span className="text-gray-600 font-body flex-shrink-0">{spec.label}:</span>
                      <span className="text-gray-300 font-body">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
    </div>
  );
}
