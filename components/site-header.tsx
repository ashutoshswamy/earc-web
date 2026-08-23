"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
  title: string;
  href: string;
  description?: string;
}

interface NavGroup {
  title: string;
  items: NavLink[];
}

const navGroups: NavGroup[] = [
  {
    title: "About",
    items: [
      { title: "EARC", href: "/about#earc", description: "Who we are and how we got started." },
      { title: "Jnana Prabodhini", href: "/about#jnana-prabodhini", description: "The parent institution EARC is part of." },
      { title: "Vision & Mission", href: "/#vision-mission" },
      { title: "Our Team", href: "/about#team", description: "Department level, project heads, and centre coordinators." },
      { title: "Our Partners", href: "/about#partners", description: "CSR and institutional collaborations." },
    ],
  },
  {
    title: "Programs",
    items: [
      { title: "Chhote Scientists", href: "/projects#chhote-scientists" },
      { title: "LearnEng", href: "/projects#learneng" },
      { title: "Gyan-Setu", href: "/projects#gyan-setu" },
      { title: "Pradnya Vikas", href: "/projects#pradnya-vikas" },
      { title: "Padhai Se Dosti", href: "/projects#padhai-se-dosti" },
      { title: "Vikas Mitra", href: "/projects#vikas-mitra" },
      { title: "Anubhav Shala", href: "/projects#anubhav-shala" },
    ],
  },
  {
    title: "Activities",
    items: [
      { title: "Prerana Setu", href: "/projects#prerana-setu" },
      { title: "Self Study Skill Workshops", href: "/services#workshops" },
      { title: "Teacher's Training", href: "/projects#teachers-training" },
    ],
  },
  {
    title: "Exams & Services",
    items: [
      { title: "Homi Bhabha", href: "/homi-bhabha", description: "Balvaidnyanik Spardha — India's oldest science talent search for students." },
      { title: "Ganit Prabhutwa Pariksha", href: "/ganit-prabhutwa-pariksha", description: "A mathematics aptitude examination sharpening problem-solving from an early age." },
      { title: "Self Study Skill Workshops", href: "/services#workshops" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Learning Resources", href: "/resources#learning-resources" },
      { title: "Reports", href: "/resources#reports", description: "Project-wise reports." },
    ],
  },
  {
    title: "Impact",
    items: [
      { title: "Dashboard", href: "/impact#dashboard" },
      { title: "Reach & Outcomes", href: "/impact#reach-outcomes" },
      { title: "Success Stories", href: "/impact#stories" },
    ],
  },
];

const primaryLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Gallery", href: "/gallery" },
  { title: "Annual Reports", href: "/annual-report" },
  { title: "Contact Us", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-ink/10 bg-parchment/70 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-parchment/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/earc_logo.png"
            alt="EARC logo"
            width={144}
            height={86}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/" />}
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-9 items-center rounded-md px-3 text-[0.9rem] font-medium text-emerald-deep hover:bg-mist",
                  pathname === "/" &&
                    "bg-mist text-emerald-ink after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-amber-spark"
                )}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {navGroups.map((group) => (
              <NavigationMenuItem key={group.title}>
                <NavigationMenuTrigger className="bg-transparent text-[0.9rem] font-medium text-emerald-deep hover:bg-mist data-[state=open]:bg-mist">
                  {group.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-2">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink
                          render={<Link href={item.href} />}
                          className="block rounded-md p-3 hover:bg-mist"
                        >
                          <div className="font-heading text-sm font-semibold text-emerald-ink">
                            {item.title}
                          </div>
                          {item.description && (
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            {primaryLinks
              .filter((link) => link.href !== "/")
              .map((link) => {
                const active = pathname === link.href;
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      render={<Link href={link.href} />}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-9 items-center rounded-md px-3 text-[0.9rem] font-medium text-emerald-deep hover:bg-mist",
                        active &&
                          "bg-mist text-emerald-ink after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-amber-spark"
                      )}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="icon" className="lg:hidden" />}
          >
            <Menu className="size-4.5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="bg-parchment">
            <SheetHeader>
              <SheetTitle className="font-heading text-emerald-ink">
                EARC
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 overflow-y-auto px-4 pb-4">
              {primaryLinks
                .filter((link) => link.href === "/")
                .map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium text-emerald-deep hover:bg-mist",
                        active && "bg-mist text-emerald-ink"
                      )}
                    >
                      {link.title}
                    </Link>
                  );
                })}

              {navGroups.map((group) => (
                <div key={group.title} className="mt-1">
                  <div className="my-2 h-px bg-emerald-ink/10" />
                  <p className="px-3 text-xs font-semibold tracking-wide text-amber-spark uppercase">
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-emerald-deep hover:bg-mist"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="my-2 h-px bg-emerald-ink/10" />
              {primaryLinks
                .filter((link) => link.href !== "/")
                .map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium text-emerald-deep hover:bg-mist",
                        active && "bg-mist text-emerald-ink"
                      )}
                    >
                      {link.title}
                    </Link>
                  );
                })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
