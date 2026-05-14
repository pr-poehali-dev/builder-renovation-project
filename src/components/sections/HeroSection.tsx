import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/6409a538-d873-4bb0-ab67-be0ca95ae39e/files/44c2bb61-84c1-401c-a8da-5b76b183d760.jpg";

const ADVANTAGES = [
  { num: "15+", text: "лет опыта" },
  { num: "500+", text: "объектов сдано" },
  { num: "45%", text: "скидка льготникам" },
  { num: "100%", text: "гарантия качества" },
];

const SERVICES = [
  { icon: "Home", title: "Кровельные работы", desc: "Монтаж и ремонт кровли, реконструкция и утепление крыши, монтаж аксессуаров", slug: "/services/roofing" },
  { icon: "Building2", title: "Пристройки и веранды", desc: "Строительство пристроек, веранд, террас, надстройки этажа любой сложности", slug: "/services/extensions" },
  { icon: "Layers", title: "Фасадные работы", desc: "Монтаж сайдинга, фасадных панелей, облицовка цоколя под ключ", slug: "/services/facade" },
  { icon: "Square", title: "Отмостка и фундамент", desc: "Бетонная отмостка вокруг дома, устройство фундамента любой сложности", slug: "/services/foundation" },
  { icon: "Wrench", title: "Ремонт любой сложности", desc: "Полный спектр строительных и ремонтных работ для физических и юридических лиц", slug: "/services/repair" },
  { icon: "Shield", title: "Гарантия на работы", desc: "Даём гарантию на все работы, выполненные из нашего материала", slug: "/services/warranty" },
  { icon: "Fence", title: "Заборы", desc: "Выполняем все виды заборов: глухие, сетчатые, кирпичные, деревянные и другие", slug: "/services/fences" },
  { icon: "Warehouse", title: "Хозпостройки", desc: "Строим хозблоки, сараи и подсобные помещения любого типа под ключ", slug: "/services/outbuildings" },
  { icon: "Flame", title: "Бани", desc: "Строим бани любого типа: каркасные, модульные, бочки и вагончики под ключ", slug: "/services/bathhouses" },
  { icon: "Paintbrush", title: "Штукатурные работы", desc: "Декоративная и обычная штукатурка фасадов и внутренних помещений", slug: "/services/facade" },
  { icon: "Droplets", title: "Гидроизоляция", desc: "Гидроизоляция фундаментов, кровель и подвальных помещений под ключ", slug: "/services/foundation" },
  { icon: "TreePine", title: "Деревянные конструкции", desc: "Изготовление и монтаж беседок, навесов, террасных настилов, пергол", slug: "/services/extensions" },
];

interface Props {
  scrollTo: (href: string) => void;
}

export default function HeroSection({ scrollTo }: Props) {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
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
      <section id="services" className="py-24 bg-[#111]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Что мы делаем</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Виды работ</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-yellow-400/10">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                to={s.slug}
                className="bg-[#111] p-8 hover:bg-[#1a1a1a] transition-colors group cursor-pointer block"
              >
                <div className="w-12 h-12 bg-yellow-400/10 flex items-center justify-center mb-5 group-hover:bg-yellow-400 transition-colors">
                  <Icon name={s.icon} size={22} className="text-yellow-400 group-hover:text-black transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-3 group-hover:text-yellow-400 transition-colors">{s.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-1 text-yellow-400/60 group-hover:text-yellow-400 transition-colors font-display text-xs uppercase tracking-widest">
                  Подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
