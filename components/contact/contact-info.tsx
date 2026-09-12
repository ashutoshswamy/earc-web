import { Mail, MapPin, Phone } from "lucide-react";

import { YoutubeIcon, FacebookIcon } from "@/components/social-icons";

const socials = [
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "Jnana Prabodhini", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Gyan-Setu", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Chatra Prabodhan", href: "https://facebook.com", icon: FacebookIcon },
];

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      <article className="flex items-start gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-5 shadow-sm">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-emerald-ink">
          <MapPin className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-heading text-sm font-semibold text-emerald-deep">
            Visit us
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            510, Sadashiv Peth, Pune, Maharashtra 411030
          </p>
        </div>
      </article>

      <article className="flex items-start gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-5 shadow-sm">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-emerald-ink">
          <Mail className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-heading text-sm font-semibold text-emerald-deep">
            Email us
          </h3>
          <a
            href="mailto:contact.earc@jnanaprabodhini.org"
            className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-emerald-ink hover:underline"
          >
            contact.earc@jnanaprabodhini.org
          </a>
        </div>
      </article>

      <article className="flex items-start gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-5 shadow-sm">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-emerald-ink">
          <Phone className="size-5" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="font-heading text-sm font-semibold text-emerald-deep">
            Call us
          </h3>
          <div className="mt-1 flex flex-col text-sm text-muted-foreground">
            <a
              href="tel:02024207231"
              className="transition-colors hover:text-emerald-ink hover:underline"
            >
              020-24207231
            </a>
            <a
              href="tel:+919022476146"
              className="transition-colors hover:text-emerald-ink hover:underline"
            >
              +91 9022476146
            </a>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-emerald-ink/10 bg-card p-5 shadow-sm">
        <h3 className="font-heading text-sm font-semibold text-emerald-deep">
          Follow along
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-ink/15 bg-mist px-3 py-1.5 text-xs font-medium text-emerald-deep transition-colors hover:border-amber-spark/40 hover:bg-amber-spark/15"
            >
              <social.icon className="size-3.5" />
              {social.label}
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}
