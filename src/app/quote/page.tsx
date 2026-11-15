"use client";
import { useState } from "react";
const eventTypes = ["Wedding", "Birthday", "Corporate event", "Canapé reception", "Decoration only", "Other"];
export default function QuotePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  const field = "w-full rounded-md border border-datiz-gold/40 bg-transparent px-4 py-3 text-datiz-ivory placeholder:text-datiz-ivory/50 focus:border-datiz-gold focus:outline-none";
  return (
    <main className="min-h-screen bg-datiz-teal px-6 py-24 text-datiz-ivory">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-4xl text-datiz-gold md:text-5xl">Request a Quote</h1>
        <p className="mt-4 text-datiz-ivory/80">Tell us about your event and we will get back to you. We ask for 2 to 3 weeks notice.</p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input name="name" required placeholder="Full name" className={field} />
          <div className="grid gap-5 md:grid-cols-2">
            <input name="email" type="email" required placeholder="Email" className={field} />
            <input name="phone" type="tel" required placeholder="Phone / WhatsApp" className={field} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <select name="event_type" required defaultValue="" className={field}>
              <option value="" disabled className="text-black">Event type</option>
              {eventTypes.map((t) => (<option key={t} value={t} className="text-black">{t}</option>))}
            </select>
            <input name="event_date" type="date" required className={field} />
          </div>
          <input name="guest_count" type="number" min="1" required placeholder="Number of guests" className={field} />
          <textarea name="message" rows={5} placeholder="Tell us more about your event" className={field} />
          <button type="submit" disabled={status === "sending"} className="btn-primary">{status === "sending" ? "Sending..." : "Send Enquiry"}</button>
          {status === "sent" && <p className="text-datiz-gold">Thank you. Your enquiry has been sent.</p>}
          {status === "error" && <p className="text-red-300">Something went wrong. Please message us on WhatsApp: +44 7738 884720.</p>}
        </form>
      </div>
    </main>
  );
}
