import { useRef } from "react";
import Icon from "@/components/ui/icon";

const CATEGORY_COLORS: Record<string, string> = {
  "Кровля": "bg-yellow-400",
  "Фасад": "bg-orange-500",
  "Фундамент": "bg-red-600",
  "Пристройка": "bg-yellow-500",
  "Другое": "bg-gray-500",
};

export type Photo = { key: string; url: string; category: string };

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const PORTFOLIO_URL = "https://functions.poehali.dev/cb10bd71-d788-4a35-8ba6-b51b88bfac9c";

interface Props {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  categories: string[];
  activeTab: string;
  setActiveTab: (v: string) => void;
  lightbox: string | null;
  setLightbox: (v: string | null) => void;
  adminOpen: boolean;
  setAdminOpen: (v: boolean) => void;
  uploadCategory: string;
  setUploadCategory: (v: string) => void;
  uploading: boolean;
  setUploading: (v: boolean) => void;
  uploadError: string;
  setUploadError: (v: string) => void;
}

export default function WorksGallery({
  photos, setPhotos,
  categories,
  activeTab, setActiveTab,
  lightbox, setLightbox,
  adminOpen, setAdminOpen,
  uploadCategory, setUploadCategory,
  uploading, setUploading,
  uploadError, setUploadError,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <section id="works" className="py-24 bg-[#161616]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-yellow-400 font-display text-xs font-bold uppercase tracking-widest mb-4">Портфолио</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">Наши работы</h2>
          </div>

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
                  {categories.filter((c) => c !== "Все").map((cat) => (
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
    </>
  );
}
