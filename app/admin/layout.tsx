import { redirect } from "next/navigation";
import Link from "next/link";

import { getCurrentProfile } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (profile.role !== "admin") redirect("/");

  return (
    <div className="flex min-h-full flex-1 flex-col bg-parchment">
      <header className="sticky top-0 z-40 border-b border-emerald-ink/10 bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-heading text-sm font-semibold text-emerald-ink"
          >
            EARC admin
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
