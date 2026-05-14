import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О нас", href: "#about" },
  { label: "Работы", href: "#services" },
  { label: "Контакты", href: "#contacts" },
];

const SEND_LEAD_URL = "https://functions.poehali.dev/8e18931c-a90b-4bcf-b1f5-65f682a5ac6e";

interface Props {
  form: { name: string; phone: string; comment: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; phone: string; comment: string }>>;
  sent: boolean;
  setSent: (v: boolean) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  error: string;
  setError: (v: string) => void;
  scrollTo: (href: string) => void;
}

export default function ContactsSection({ form, setForm, sent, setSent, loading, setLoading, error, setError, scrollTo }: Props) {
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
    <>
      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#111]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Связаться</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Оставьте заявку</h2>
            <p className="font-body text-gray-400 mt-4 max-w-lg mx-auto">Перезвоним в течение 30 минут и рассчитаем стоимость работ бесплатно</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
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
                      <div className="font-body text-white text-sm">Круглосуточно, без выходных</div>
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
    </>
  );
}
