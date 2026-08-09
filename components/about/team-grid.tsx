"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

const team = [
  {
    name: "Omkar Banait",
    role: "Programme Coordinator",
    bio: "Works closely with schools to plan and run EARC's exam and teacher-training programmes on the ground.",
  },
  {
    name: "Prakash Rananavre",
    role: "Programme Coordinator",
    bio: "Coordinates workshop delivery and school partnerships across the network EARC works with.",
  },
  {
    name: "Purva Dixit-Dhokte",
    role: "Research Associate",
    bio: "Contributes to curriculum research and resource development for EARC's teaching materials.",
  },
  {
    name: "Mrinmayee Vaishampayan",
    role: "Research Associate",
    bio: "Supports content design and evaluation for EARC's teacher training modules.",
  },
];

export function TeamGrid() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Team
          </h2>
          <p className="mt-2 text-muted-foreground">
            The coordinators and researchers behind EARC&rsquo;s day-to-day
            work.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Dialog key={member.name}>
              <DialogTrigger
                render={
                  <button
                    type="button"
                    className="group flex flex-col items-center rounded-2xl border border-emerald-ink/10 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-ink/10"
                  />
                }
              >
                <Avatar
                  size="lg"
                  className="size-16 transition-transform duration-300 group-hover:scale-105"
                >
                  <AvatarFallback className="bg-mist font-heading text-base font-semibold text-emerald-ink">
                    {initials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-heading text-base font-semibold text-emerald-deep">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium tracking-wide text-amber-spark uppercase">
                  {member.role}
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <Avatar size="lg" className="size-14">
                    <AvatarFallback className="bg-mist font-heading text-base font-semibold text-emerald-ink">
                      {initials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <DialogTitle className="mt-2 text-emerald-deep">
                    {member.name}
                  </DialogTitle>
                  <p className="text-xs font-medium tracking-wide text-amber-spark uppercase">
                    {member.role}
                  </p>
                </DialogHeader>
                <DialogDescription>{member.bio}</DialogDescription>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
