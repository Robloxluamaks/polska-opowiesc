import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import mascot from "@/assets/mascot.png";

export function Logo() {
  return (
    <Link to="/" className="font-display text-2xl tracking-wide">
      BANG <span className="text-primary">BLAZE</span>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Start" },
  { to: "/produkty", label: "Produkty" },
  { to: "/o-marce", label: "O marce" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("bb-age-ok") !== "1") setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="age-title" className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur">
      <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center glow">
        <img src={mascot} alt="" width={1024} height={1024} className="mx-auto h-28 w-28" />
        <h2 id="age-title" className="mt-4 text-3xl">Masz ukończone 18 lat?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Ta strona zawiera informacje o produktach przeznaczonych wyłącznie dla osób pełnoletnich.
        </p>
        {denied ? (
          <p className="mt-6 font-semibold text-primary">Przepraszamy, strona jest dostępna wyłącznie dla osób pełnoletnich.</p>
        ) : (
          <div className="mt-6 flex gap-3">
            <button onClick={() => { localStorage.setItem("bb-age-ok", "1"); setOpen(false); }} className="flex-1 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:scale-105">
              Tak, mam 18+
            </button>
            <button onClick={() => setDenied(true)} className="flex-1 rounded-full border border-border px-6 py-3 font-bold transition hover:bg-secondary">
              Nie
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <AgeGate />
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Logo />
          <nav className="flex gap-4 text-sm font-semibold sm:gap-8">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="transition hover:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">Wyrazisty design. Charakterystyczny styl.</p>
            <p className="mt-4 inline-block rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">18+ Tylko dla pełnoletnich</p>
          </div>
          <div className="text-sm">
            <h3 className="mb-3 text-lg">Informacje</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/polityka-prywatnosci" className="hover:text-primary">Polityka prywatności</Link></li>
              <li><Link to="/regulamin" className="hover:text-primary">Regulamin</Link></li>
              <li><Link to="/dostawa-i-zwroty" className="hover:text-primary">Dostawa i zwroty</Link></li>
            </ul>
          </div>
          <div className="text-sm text-muted-foreground">
            <h3 className="mb-3 text-lg text-foreground">Kontakt</h3>
            <p>E-mail: kontakt@[uzupełnij].pl</p>
            <p>Telefon: [uzupełnij]</p>
            <p>Adres: [uzupełnij]</p>
          </div>
        </div>
        <p className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BANG BLAZE. Produkty przeznaczone wyłącznie dla osób powyżej 18 roku życia. Sprzedaż niedostępna.
        </p>
      </footer>
    </div>
  );
}

export function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-5xl">{title}</h1>
        <div className="mt-8 space-y-4 text-muted-foreground">{children}</div>
      </section>
    </Layout>
  );
}
