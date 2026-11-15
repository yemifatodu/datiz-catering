import Navbar from "@/components/Navbar";
const images = ["IMG-20261113-WA0000.jpg", "IMG-20261113-WA0002.jpg", "IMG-20261113-WA0003.jpg", "IMG-20261113-WA0004.jpg", "IMG-20261113-WA0005.jpg", "IMG-20261113-WA0006.jpg", "IMG-20261113-WA0008.jpg", "IMG-20261113-WA0009.jpg", "IMG-20261113-WA0010.jpg", "IMG-20261113-WA0012.jpg"].map((f) => "/gallery/" + f);
const videos = ["VID-20261113-WA0013.mp4", "VID-20261113-WA0014.mp4", "VID-20261113-WA0015.mp4", "VID-20261113-WA0016.mp4", "VID-20261113-WA0017.mp4", "VID-20261113-WA0018.mp4"].map((f) => "/gallery/" + f);
export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-datiz-teal text-datiz-ivory">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pt-36 pb-24">
        <p className="mb-4 text-center text-sm uppercase tracking-[0.35em] text-datiz-gold">Our Work</p>
        <h1 className="mb-14 text-center font-serif text-4xl text-datiz-gold md:text-6xl">Gallery</h1>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((src) => (<img key={src} src={src} alt="DATIŽ event" loading="lazy" className="mb-4 w-full break-inside-avoid border border-datiz-gold/20" />))}
        </div>
        <h2 className="mb-10 mt-20 text-center font-serif text-3xl text-datiz-gold md:text-4xl">Videos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((src) => (<video key={src} src={src} controls preload="metadata" playsInline className="w-full border border-datiz-gold/20 bg-black"></video>))}
        </div>
      </section>
      <footer className="border-t border-datiz-gold/20 px-6 py-12 text-center">
        <p className="mb-2 font-serif text-3xl text-datiz-gold">DATIŽ</p>
        <p className="text-sm text-datiz-ivory/60">United Kingdom &amp; Nigeria | Open: 9:00 AM – 6:00 PM</p>
        <p className="mt-1 text-sm text-datiz-gold">+44 7738 884720</p>
      </footer>
    </main>
  );
}
