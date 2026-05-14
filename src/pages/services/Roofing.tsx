import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  "Монтаж металлочерепицы и профнастила",
  "Монтаж мягкой (битумной) кровли",
  "Монтаж ондулина и шифера",
  "Ремонт и гидроизоляция протечек",
  "Реконструкция старой кровли",
  "Утепление и вентиляция крыши",
  "Монтаж водостоков и снегозадержателей",
  "Установка мансардных окон",
];

const GALLERY = [
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/5b171580-2473-4c18-b0d8-72c07a431da2.jpg",
    title: "Металлочерепица и профнастил",
    description: "Укладываем металлочерепицу и профнастил — долговечное и надёжное кровельное покрытие.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/17ea2709-d20f-46f0-b3a9-613d37544ab9.jpg",
    title: "Мягкая битумная кровля",
    description: "Монтируем гибкую черепицу и битумные рулонные материалы — тихо, тепло и без протечек.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/cdfc3f04-0d14-4445-93b8-96c12758c0b4.jpg",
    title: "Утепление и вентиляция крыши",
    description: "Утепляем кровлю минватой и обустраиваем вентиляцию подкровельного пространства.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/3ba767fa-680b-4a95-ba67-4d1ece0f19f1.jpg",
    title: "Водостоки и снегозадержатели",
    description: "Устанавливаем водосточные системы и снегозадержатели — защита фасада и безопасность зимой.",
  },
];

export default function Roofing() {
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
        <span className="font-display text-xs uppercase tracking-widest text-gray-500">Кровельные работы</span>
      </header>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Icon name="Home" size={26} className="text-black" />
          </div>
          <div>
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-1">Услуги</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-tight">Кровельные работы</h1>
          </div>
        </div>

        <p className="font-body text-xl text-gray-300 mb-4 leading-relaxed">
          Монтаж, ремонт и реконструкция кровли любой сложности
        </p>
        <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-2xl">
          Выполняем полный комплекс кровельных работ для частных домов и коммерческих объектов. Используем только сертифицированные материалы ведущих производителей. На все работы даём гарантию. Скидки пенсионерам и военнослужащим до 45%.
        </p>

        <div className="mb-16">
          <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-8">Наши работы</div>
          <div className="grid md:grid-cols-2 gap-6">
            {GALLERY.map((item) => (
              <div key={item.title} className="bg-[#1a1a1a] overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-400 flex-shrink-0" />
                    <h3 className="font-display text-sm font-bold uppercase tracking-widest">{item.title}</h3>
                  </div>
                  <p className="font-body text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
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

        <div className="bg-[#1a1a1a] p-8 border-l-4 border-yellow-400">
          <h2 className="font-display text-xl font-bold uppercase mb-3">Бесплатный расчёт стоимости</h2>
          <p className="font-body text-gray-400 text-sm mb-5">
            Перезвоним в течение 30 минут и рассчитаем стоимость работ бесплатно
          </p>
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
