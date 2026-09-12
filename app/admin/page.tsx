import type { Metadata } from "next";
import {
  ClipboardList,
  FileText,
  GraduationCap,
  Handshake,
  Images,
  Mail,
  MessageSquareQuote,
  NotebookText,
  Users,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { AdminShell, type AdminSection } from "@/components/admin/admin-shell";
import { GalleryUploadForm } from "@/components/admin/gallery-upload-form";
import { GalleryList } from "@/components/admin/gallery-list";
import { ReportUploadForm } from "@/components/admin/report-upload-form";
import { ReportList } from "@/components/admin/report-list";
import { GpPaperUploadForm } from "@/components/admin/gp-paper-upload-form";
import { GpPaperList } from "@/components/admin/gp-paper-list";
import { TeamMemberForm } from "@/components/admin/team-member-form";
import { TeamMemberList } from "@/components/admin/team-member-list";
import { PartnerUploadForm } from "@/components/admin/partner-upload-form";
import { PartnerList } from "@/components/admin/partner-list";
import { TestimonialList } from "@/components/admin/testimonial-list";
import { SuccessStoryForm } from "@/components/admin/success-story-form";
import { SuccessStoryList } from "@/components/admin/success-story-list";
import { HbRegistrationList } from "@/components/admin/hb-registration-list";
import { ContactMessageList } from "@/components/admin/contact-message-list";
import type {
  AnnualReport,
  ContactSubmission,
  GalleryItem,
  GpPaper,
  HbRegistration,
  Partner,
  SuccessStory,
  TeamMember,
  Testimonial,
} from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Admin — EARC",
};

function UploadCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm">
      {children}
    </div>
  );
}

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { data: galleryItems },
    { data: reports },
    { data: gpPapers },
    { data: teamMembers },
    { data: partners },
    { data: testimonials },
    { data: successStories },
    { data: hbRegistrations },
    { data: contactMessages },
  ] = await Promise.all([
    supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("annual_reports")
      .select("*")
      .order("year", { ascending: false }),
    supabase
      .from("gp_papers")
      .select("*")
      .order("year", { ascending: false }),
    supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("partners")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("success_stories")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("hb_registrations")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const gallery = (galleryItems as GalleryItem[]) ?? [];
  const annualReports = (reports as AnnualReport[]) ?? [];
  const papers = (gpPapers as GpPaper[]) ?? [];
  const team = (teamMembers as TeamMember[]) ?? [];
  const partnerList = (partners as Partner[]) ?? [];
  const testimonialList = (testimonials as Testimonial[]) ?? [];
  const stories = (successStories as SuccessStory[]) ?? [];
  const registrations = (hbRegistrations as HbRegistration[]) ?? [];
  const messages = (contactMessages as ContactSubmission[]) ?? [];
  const pendingTestimonials = testimonialList.filter((t) => t.status === "pending").length;

  const sections: AdminSection[] = [
    {
      id: "gallery",
      label: "Gallery",
      description: "Photos and videos shown on the public gallery page.",
      icon: <Images className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: gallery.length,
      content: (
        <div className="flex flex-col gap-5">
          <UploadCard>
            <GalleryUploadForm />
          </UploadCard>
          <GalleryList items={gallery} />
        </div>
      ),
    },
    {
      id: "reports",
      label: "Annual reports",
      description: "PDF annual reports published on the site.",
      icon: <FileText className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: annualReports.length,
      content: (
        <div className="flex flex-col gap-5">
          <UploadCard>
            <ReportUploadForm />
          </UploadCard>
          <ReportList items={annualReports} />
        </div>
      ),
    },
    {
      id: "gp-papers",
      label: "GP Pariksha papers",
      description: "Old question papers and model answer sheets.",
      icon: <GraduationCap className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: papers.length,
      content: (
        <div className="flex flex-col gap-5">
          <UploadCard>
            <GpPaperUploadForm />
          </UploadCard>
          <GpPaperList items={papers} />
        </div>
      ),
    },
    {
      id: "team",
      label: "Team",
      description: "People shown under About → Our Team, by project.",
      icon: <Users className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: team.length,
      content: (
        <div className="flex flex-col gap-5">
          <UploadCard>
            <TeamMemberForm />
          </UploadCard>
          <TeamMemberList items={team} />
        </div>
      ),
    },
    {
      id: "partners",
      label: "Partners",
      description: "CSR and institutional collaborations, with logo.",
      icon: <Handshake className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: partnerList.length,
      content: (
        <div className="flex flex-col gap-5">
          <UploadCard>
            <PartnerUploadForm />
          </UploadCard>
          <PartnerList items={partnerList} />
        </div>
      ),
    },
    {
      id: "testimonials",
      label: "Testimonials",
      description: "Public submissions awaiting approval, plus approved ones.",
      icon: <MessageSquareQuote className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: pendingTestimonials,
      content: <TestimonialList items={testimonialList} />,
    },
    {
      id: "success-stories",
      label: "Success stories",
      description: "Case studies shown on the Impact page.",
      icon: <NotebookText className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: stories.length,
      content: (
        <div className="flex flex-col gap-5">
          <UploadCard>
            <SuccessStoryForm />
          </UploadCard>
          <SuccessStoryList items={stories} />
        </div>
      ),
    },
    {
      id: "hb-registrations",
      label: "Homi Bhabha registrations",
      description: "Batch sign-ups with payment screenshots.",
      icon: <ClipboardList className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: registrations.length,
      content: <HbRegistrationList items={registrations} />,
    },
    {
      id: "contact-messages",
      label: "Contact messages",
      description: "Submissions from the public Contact Us form.",
      icon: <Mail className="size-4 shrink-0" strokeWidth={1.75} />,
      badge: messages.length,
      content: <ContactMessageList items={messages} />,
    },
  ];

  return (
    <div>
      <div className="border-b border-emerald-ink/10 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl font-semibold text-emerald-deep">
            Admin dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage everything shown on the public site, in one place.
          </p>
        </div>
      </div>
      <AdminShell sections={sections} />
    </div>
  );
}
