import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const linkColumns = [
  {
    heading: "Explore",
    links: [
      { title: "Home", href: "/" },
      { title: "Projects", href: "/projects" },
      { title: "Services", href: "/services" },
      { title: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Exams",
    links: [
      { title: "Homi Bhabha", href: "/homi-bhabha" },
      { title: "Ganit Prabhutwa Pariksha", href: "/ganit-prabhutwa-pariksha" },
      { title: "Annual Report", href: "/annual-report" },
    ],
  },
  {
    heading: "Centre",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Contact Us", href: "/contact" },
      { title: "Admin Login", href: "/login" },
    ],
  },
];

const socials = [
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Jnana Prabodhini", href: "https://facebook.com" },
  { label: "Gyan-Setu", href: "https://facebook.com" },
  { label: "Chatra Prabodhan", href: "https://facebook.com" },
];

export function SiteFooter() {
  return (
    <footer className="bg-emerald-deep text-parchment/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md bg-amber-spark font-heading text-base font-semibold text-emerald-deep">
                EA
              </span>
              <span className="font-heading text-base font-semibold text-parchment">
                EARC
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment/65">
              Jnana Prabodhini&rsquo;s Educational Activity Research Centre —
              man making for nation building.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-parchment/65">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber-spark" />
                Pune, Maharashtra, India
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-amber-spark" />
                +91 20 XXXX XXXX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-amber-spark" />
                contact@earc.jnanaprabodhini.org
              </li>
            </ul>
          </div>

          {linkColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-parchment/70 transition-colors hover:text-parchment"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-parchment/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-parchment/50">
            © {new Date().getFullYear()} Jnana Prabodhini&rsquo;s Educational
            Activity Research Centre. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {socials.map((social, i) => (
              <a
                key={`${social.label}-${i}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-parchment/10 px-3 py-1.5 text-xs font-medium text-parchment/80 transition-colors hover:bg-amber-spark hover:text-emerald-deep"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
