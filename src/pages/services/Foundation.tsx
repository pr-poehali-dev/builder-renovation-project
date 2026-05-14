import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  "Бетонная отмостка вокруг дома",
  "Устройство ленточного фундамента",
  "Устройство плитного фундамента",
  "Устройство столбчатого фундамента",
  "Гидроизоляция фундамента",
  "Ремонт и усиление существующего фундамента",
  "Дренаж и водоотведение",
  "Заливка бетонных площадок и стяжек",
];

const GALLERY = [
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/f1a26022-b7b8-49a7-a17a-21079eee272e.jpg",
    title: "Бетонная отмостка",
    description: "Заливаем отмостку вокруг дома — защищает фундамент от влаги и промерзания грунта.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/6d66f0b7-9652-4174-87eb-b1e5a7ea47b3.jpg",
    title: "Ленточный фундамент",
    description: "Устраиваем ленточный фундамент с армированием — надёжная основа для любого дома.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/0ac22999-0de0-42aa-825a-3d72c353e430.jpg",
    title: "Гидроизоляция фундамента",
    description: "Наносим обмазочную и рулонную гидроизоляцию — защита фундамента от грунтовых вод.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/33856cae-7d5e-4caf-a3fb-cac3da64d071.jpg",
    title: "Плитный фундамент",
    description: "Заливаем монолитную плиту с арматурным каркасом — универсальный фундамент для любых грунтов.",
  },
];

export default function Foundation() {
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
        <span className="font-display text-xs uppercase tracking-widest text-gray-500">Отмостка и фундамент</span>
      </header>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Icon name="Square" size={26} className="text-black" />
          </div>
          <div>
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-1">Услуги</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-tight">Отмостка и фундамент</h1>
          </div>
        </div>

        <p className="font-body text-xl text-gray-300 mb-4 leading-relaxed">
          Надёжный фундамент — основа долговечного дома
        </p>
        <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-2xl">
          Выполняем весь спектр работ с фундаментом и отмосткой. Правильно заложенный фундамент — это гарантия того, что дом простоит десятилетия без проблем. Работаем с любыми типами грунтов и объёмами.
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
