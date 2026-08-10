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

const examLinks = [
  {
    title: "Homi Bhabha",
    href: "/homi-bhabha",
    description: "Balvaidnyanik Spardha — India's oldest science talent search for students.",
  },
  {
    title: "Ganit Prabhutwa Pariksha",
    href: "/ganit-prabhutwa-pariksha",
    description: "A mathematics aptitude examination sharpening problem-solving from an early age.",
  },
];

const primaryLinks = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Services", href: "/services" },
  { title: "Gallery", href: "/gallery" },
  { title: "Annual Report", href: "/annual-report" },
  { title: "About Us", href: "/about" },
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
              <NavigationMenuTrigger className="bg-transparent text-[0.9rem] font-medium text-emerald-deep hover:bg-mist data-[state=open]:bg-mist">
                Exams
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-72 gap-1 p-2">
                  {examLinks.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink
                        render={<Link href={item.href} />}
                        className="block rounded-md p-3 hover:bg-mist"
                      >
                        <div className="font-heading text-sm font-semibold text-emerald-ink">
                          {item.title}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {primaryLinks.map((link) => {
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
            <nav className="flex flex-col gap-1 px-4 pb-4">
              {primaryLinks.map((link) => {
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
              <div className="my-2 h-px bg-emerald-ink/10" />
              {examLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-emerald-deep hover:bg-mist"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
