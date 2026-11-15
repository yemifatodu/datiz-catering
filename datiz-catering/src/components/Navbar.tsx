"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
const links = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/menu", label: "Menu" }, { href: "/gallery", label: "Gallery" }, { href: "/contact", label: "Contact" }];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"fixed inset-x-0 top-0 z-50 transition-colors duration-300 " + (scrolled || open ? "border-b border-datiz-gold/20 bg-datiz-teal/95 backdrop-blur" : "bg-transparent")}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-datiz-gold font-serif text-xl text-datiz-gold">D</span>
          <span className="font-serif text-2xl tracking-wide text-datiz-gold">DATIŽ</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm uppercase tracking-widest lg:flex">
          {links.map((l) => (<li key={l.href}><Link href={l.href} className="text-datiz-ivory transition-colors hover:text-datiz-gold">{l.label}</Link></li>))}
          <li><Link href="/quote" className="border border-datiz-gold px-5 py-2 text-datiz-gold transition-colors hover:bg-datiz-gold hover:text-datiz-teal">Request Quote</Link></li>
        </ul>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="text-3xl text-datiz-gold lg:hidden">{open ? "×" : "☰"}</button>
      </nav>
      {open && (<ul className="flex flex-col gap-5 border-t border-datiz-gold/20 px-6 py-6 text-sm uppercase tracking-widest lg:hidden">
        {links.map((l) => (<li key={l.href}><Link href={l.href} onClick={() => setOpen(false)} className="text-datiz-ivory hover:text-datiz-gold">{l.label}</Link></li>))}
        <li><Link href="/quote" onClick={() => setOpen(false)} className="inline-block border border-datiz-gold px-5 py-2 text-datiz-gold">Request Quote</Link></li>
      </ul>)}
    </header>
  );
}
