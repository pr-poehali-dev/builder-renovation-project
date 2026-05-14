import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Работы", href: "#services" },
  { label: "Контакты", href: "#contacts" },
];

interface Props {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function Navbar({ menuOpen, setMenuOpen, scrollTo }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur border-b border-yellow-400/20">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("#home")} className="font-display text-xl font-bold text-yellow-400 tracking-widest uppercase">
          СтройБригада
        </button>
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
  );
}
