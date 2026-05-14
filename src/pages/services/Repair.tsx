import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  "Капитальный ремонт частных домов",
  "Ремонт и отделка помещений",
  "Демонтажные работы",
  "Кладка кирпича и блоков",
  "Штукатурные и малярные работы",
  "Устройство полов и стяжки",
  "Монтаж перегородок",
  "Работы для юридических лиц",
];

const GALLERY = [
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/6c3e121c-567c-498d-9db3-9a4e5e319518.jpg",
    title: "Штукатурные и малярные работы",
    description: "Выполняем штукатурку стен и потолков, финишную шпаклёвку и покраску — чисто и в срок.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/c1acbfe5-7558-4147-829a-db61e1a59437.jpg",
    title: "Устройство полов и стяжки",
    description: "Заливаем выравнивающую стяжку под любое напольное покрытие — ровно и надёжно.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/dec0cf76-6663-421d-8fe6-a15bd86aa5c8.jpg",
    title: "Кладка кирпича и блоков",
    description: "Выкладываем стены, перегородки и цоколь из кирпича, пеноблока или газобетона.",
  },
  {
    image: "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/552bf249-fe48-4acb-95ad-08228eb2f6d9.jpg",
    title: "Демонтажные работы",
    description: "Сносим старые стены, перегородки и конструкции — аккуратно, с вывозом мусора.",
  },
];

export default function Repair() {
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
        <span className="font-display text-xs uppercase tracking-widest text-gray-500">Ремонт любой сложности</span>
      </header>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Icon name="Wrench" size={26} className="text-black" />
          </div>
          <div>
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-1">Услуги</div>
            <h1 className="font-display text-3xl md:text-5xl font-bold uppercase leading-tight">Ремонт любой сложности</h1>
          </div>
        </div>

        <p className="font-body text-xl text-gray-300 mb-4 leading-relaxed">
          Полный спектр строительных и ремонтных работ для дома и бизнеса
        </p>
        <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-2xl">
          Беремся за проекты любой сложности — от косметического ремонта до капитальной реконструкции. Работаем с физическими и юридическими лицами. Соблюдаем сроки и бюджет, согласованные с заказчиком.
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
