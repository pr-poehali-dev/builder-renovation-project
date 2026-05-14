import { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WorksGallery, { Photo } from "@/components/sections/WorksGallery";
import ContactsSection from "@/components/sections/ContactsSection";

const PORTFOLIO_URL = "https://functions.poehali.dev/cb10bd71-d788-4a35-8ba6-b51b88bfac9c";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Все");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("Кровля");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    fetch(PORTFOLIO_URL)
      .then((r) => r.json())
      .then((data) => {
        setPhotos(data.photos || []);
        setCategories(["Все", ...(data.categories || [])]);
      })
      .catch(() => {});
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-body bg-[#111] text-white min-h-screen">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <WorksGallery
        photos={photos}
        setPhotos={setPhotos}
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lightbox={lightbox}
        setLightbox={setLightbox}
        adminOpen={adminOpen}
        setAdminOpen={setAdminOpen}
        uploadCategory={uploadCategory}
        setUploadCategory={setUploadCategory}
        uploading={uploading}
        setUploading={setUploading}
        uploadError={uploadError}
        setUploadError={setUploadError}
      />
      <ContactsSection
        form={form}
        setForm={setForm}
        sent={sent}
        setSent={setSent}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        scrollTo={scrollTo}
      />
    </div>
  );
}
