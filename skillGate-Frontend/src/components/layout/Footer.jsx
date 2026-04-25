import skillgateLogo from "@/assets/skillGate-logo.png";

export default function Footer() {
  const FOOTER_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  const scrollTo = (href) => {
    if (href === "#") return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="bg-[#080808] border-t border-border"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xl font-bold bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent tracking-tight flex items-center gap-2">
            <img src={skillgateLogo} alt="SkillGate Logo" className="w-6 h-6" />
            SkillGate
          </span>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-slate-400 font-mono">
            © 2025 SkillGate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
