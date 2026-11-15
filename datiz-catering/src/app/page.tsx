import Navbar from "@/components/Navbar";
import Link from "next/link";
const services = [{ n: "01", t: "Event Planning", d: "From the first idea to the final detail." }, { n: "02", t: "Décor & Styling", d: "Settings that bring your vision to life." }, { n: "03", t: "Catering", d: "Food prepared and served for your guests." }, { n: "04", t: "Canapés", d: "Elegant bites for receptions and gatherings." }];
export default function Home() {
  return (
    <main className="min-h-screen bg-datiz-teal text-datiz-ivory">
      <Navbar />
      <section className="relative flex min-h-screen items-center justify-center bg-datiz-teal bg-cover bg-center px-6 py-32" style={{ backgroundImage: "radial-gradient(ellipse at top, rgba(200,169,110,0.15), transparent 65%), linear-gradient(rgba(8,43,30,0.6), rgba(8,43,30,0.85)), url(/hero.jpg)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-serif text-3xl italic text-datiz-gold md:text-4xl">Welcome to</p>
          <h1 className="mb-6 text-5xl font-semibold uppercase tracking-[0.12em] md:text-7xl">DATIŽ</h1>
          <div className="mx-auto mb-6 h-px w-24 bg-datiz-gold/70"></div>
          <p className="mb-6 font-serif text-xl italic text-datiz-ivory md:text-2xl">Every detail. A grand impression.</p>
          <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-datiz-ivory/85 md:text-lg">Crafting unforgettable experiences across the United Kingdom and Nigeria. We handle the food and the setup, so all you have to do is enjoy the day.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/quote" className="btn-primary">Request a Quote</Link>
            <a href="https://wa.me/447738884720" target="_blank" rel="noopener noreferrer" className="btn-outline">Message on WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="border-y border-datiz-gold/20 bg-black/20 px-6 py-8">
        <div className="mx-auto grid max-w-5xl gap-6 text-center text-sm uppercase tracking-[0.2em] text-datiz-ivory/70 md:grid-cols-3">
          <p>United Kingdom &amp; Nigeria</p><p>Open 9:00 AM – 6:00 PM</p><p>2 to 3 weeks notice</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-14 text-center font-serif text-4xl text-datiz-gold md:text-5xl">What We Do</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (<div key={s.n} className="border border-datiz-gold/20 p-8 transition-colors duration-300 hover:border-datiz-gold"><p className="mb-6 font-serif text-3xl text-datiz-gold/60">{s.n}</p><h3 className="mb-3 font-serif text-2xl">{s.t}</h3><p className="text-sm leading-relaxed text-datiz-ivory/70">{s.d}</p></div>))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-datiz-gold">The Caterer</p>
          <h2 className="mb-6 font-serif text-4xl text-datiz-gold md:text-5xl">Meet Your Caterer</h2>
          <p className="mb-8 leading-relaxed text-datiz-ivory/70">Introduction text goes here.</p>
          <Link href="/quote" className="btn-outline">Request a Quote</Link>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-datiz-gold/30 bg-black/20">
          <div className="absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.2em] text-datiz-ivory/40">Caterer photo</div>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/caterer.webp)" }}></div>
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
