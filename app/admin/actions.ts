"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const MAX_FILE_BYTES = 50 * 1024 * 1024;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uploadGalleryItem(formData: FormData) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!title || !file || file.size === 0) {
    return { error: "Title and file are required." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is larger than 50MB." };
  }

  const mediaType = file.type.startsWith("video/") ? "video" : "photo";
  const path = `${profile.id}/${Date.now()}-${slugify(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(path, file, { contentType: file.type });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery").getPublicUrl(path);

  const { error: insertError } = await supabase.from("gallery_items").insert({
    title,
    media_type: mediaType,
    storage_path: path,
    url: publicUrl,
    created_by: profile.id,
  });
  if (insertError) {
    await supabase.storage.from("gallery").remove([path]);
    return { error: insertError.message };
  }

  revalidatePath("/gallery");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateGalleryItem(id: string, title: string) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmed = title.trim();
  if (!trimmed) return { error: "Title is required." };

  const { error } = await supabase
    .from("gallery_items")
    .update({ title: trimmed })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteGalleryItem(id: string, storagePath: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.storage.from("gallery").remove([storagePath]);
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath("/admin");
  return { error: null };
}

export async function uploadAnnualReport(formData: FormData) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const year = Number(formData.get("year"));
  const file = formData.get("file") as File | null;

  if (!title || !year || !file || file.size === 0) {
    return { error: "Title, year, and file are required." };
  }
  if (file.type !== "application/pdf") {
    return { error: "Annual reports must be a PDF." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is larger than 50MB." };
  }

  const path = `${profile.id}/${Date.now()}-${slugify(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from("reports")
    .upload(path, file, { contentType: file.type });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("reports").getPublicUrl(path);

  const { error: insertError } = await supabase.from("annual_reports").insert({
    title,
    year,
    storage_path: path,
    url: publicUrl,
    created_by: profile.id,
  });
  if (insertError) {
    await supabase.storage.from("reports").remove([path]);
    return { error: insertError.message };
  }

  revalidatePath("/annual-report");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateAnnualReport(id: string, title: string, year: number) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmed = title.trim();
  if (!trimmed || !year) return { error: "Title and year are required." };

  const { error } = await supabase
    .from("annual_reports")
    .update({ title: trimmed, year })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/annual-report");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteAnnualReport(id: string, storagePath: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.storage.from("reports").remove([storagePath]);
  const { error } = await supabase.from("annual_reports").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/annual-report");
  revalidatePath("/admin");
  return { error: null };
}

const GP_STANDARDS = ["5th", "8th"] as const;
const GP_KINDS = ["question-paper", "answer-sheet"] as const;

export async function uploadGpPaper(formData: FormData) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const year = Number(formData.get("year"));
  const standard = String(formData.get("standard") ?? "");
  const kind = String(formData.get("kind") ?? "");
  const file = formData.get("file") as File | null;

  if (!title || !year || !file || file.size === 0) {
    return { error: "Title, year, and file are required." };
  }
  if (!GP_STANDARDS.includes(standard as (typeof GP_STANDARDS)[number])) {
    return { error: "Standard must be 5th or 8th." };
  }
  if (!GP_KINDS.includes(kind as (typeof GP_KINDS)[number])) {
    return { error: "Kind must be a question paper or answer sheet." };
  }
  if (file.type !== "application/pdf") {
    return { error: "Papers must be a PDF." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is larger than 50MB." };
  }

  const path = `${profile.id}/${Date.now()}-${slugify(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from("gp-papers")
    .upload(path, file, { contentType: file.type });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("gp-papers").getPublicUrl(path);

  const { error: insertError } = await supabase.from("gp_papers").insert({
    title,
    year,
    standard,
    kind,
    storage_path: path,
    url: publicUrl,
    created_by: profile.id,
  });
  if (insertError) {
    await supabase.storage.from("gp-papers").remove([path]);
    return { error: insertError.message };
  }

  revalidatePath("/ganit-prabhutwa-pariksha");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateGpPaper(
  id: string,
  title: string,
  year: number,
) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmed = title.trim();
  if (!trimmed || !year) return { error: "Title and year are required." };

  const { error } = await supabase
    .from("gp_papers")
    .update({ title: trimmed, year })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/ganit-prabhutwa-pariksha");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteGpPaper(id: string, storagePath: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.storage.from("gp-papers").remove([storagePath]);
  const { error } = await supabase.from("gp_papers").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/ganit-prabhutwa-pariksha");
  revalidatePath("/admin");
  return { error: null };
}

export async function addTeamMember(formData: FormData) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const designation = String(formData.get("designation") ?? "").trim();
  const project = String(formData.get("project") ?? "").trim();
  const centre = String(formData.get("centre") ?? "").trim() || "—";

  if (!name || !designation || !project) {
    return { error: "Name, designation, and project are required." };
  }

  const { error } = await supabase.from("team_members").insert({
    name,
    designation,
    project,
    centre,
    created_by: profile.id,
  });
  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateTeamMember(
  id: string,
  name: string,
  designation: string,
  project: string,
  centre: string,
) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmedName = name.trim();
  const trimmedDesignation = designation.trim();
  const trimmedProject = project.trim();
  if (!trimmedName || !trimmedDesignation || !trimmedProject) {
    return { error: "Name, designation, and project are required." };
  }

  const { error } = await supabase
    .from("team_members")
    .update({
      name: trimmedName,
      designation: trimmedDesignation,
      project: trimmedProject,
      centre: centre.trim() || "—",
    })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin");
  return { error: null };
}

export async function uploadPartner(formData: FormData) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const project = String(formData.get("project") ?? "").trim();
  const csrPartner = String(formData.get("csr_partner") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!project || !csrPartner || !file || file.size === 0) {
    return { error: "Project, CSR partner, and logo are required." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Logo must be an image." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is larger than 50MB." };
  }

  const path = `${profile.id}/${Date.now()}-${slugify(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from("partners")
    .upload(path, file, { contentType: file.type });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("partners").getPublicUrl(path);

  const { error: insertError } = await supabase.from("partners").insert({
    project,
    csr_partner: csrPartner,
    storage_path: path,
    url: publicUrl,
    created_by: profile.id,
  });
  if (insertError) {
    await supabase.storage.from("partners").remove([path]);
    return { error: insertError.message };
  }

  revalidatePath("/about");
  revalidatePath("/admin");
  return { error: null };
}

export async function updatePartner(
  id: string,
  project: string,
  csrPartner: string,
) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmedProject = project.trim();
  const trimmedCsrPartner = csrPartner.trim();
  if (!trimmedProject || !trimmedCsrPartner) {
    return { error: "Project and CSR partner are required." };
  }

  const { error } = await supabase
    .from("partners")
    .update({ project: trimmedProject, csr_partner: trimmedCsrPartner })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin");
  return { error: null };
}

export async function deletePartner(id: string, storagePath: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.storage.from("partners").remove([storagePath]);
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/about");
  revalidatePath("/admin");
  return { error: null };
}

export async function submitTestimonial(formData: FormData) {
  const supabase = await createClient();

  const quote = String(formData.get("quote") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();

  if (!quote || !name || !detail) {
    return { error: "Name, detail, and testimonial text are required." };
  }
  if (quote.length > 1000) {
    return { error: "Keep the testimonial under 1000 characters." };
  }

  const { error } = await supabase
    .from("testimonials")
    .insert({ quote, name, detail, status: "pending" });
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { error: null };
}

export async function updateTestimonial(
  id: string,
  quote: string,
  name: string,
  detail: string,
) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmedQuote = quote.trim();
  const trimmedName = name.trim();
  const trimmedDetail = detail.trim();
  if (!trimmedQuote || !trimmedName || !trimmedDetail) {
    return { error: "Name, detail, and testimonial text are required." };
  }

  const { error } = await supabase
    .from("testimonials")
    .update({ quote: trimmedQuote, name: trimmedName, detail: trimmedDetail })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/impact");
  revalidatePath("/admin");
  return { error: null };
}

export async function approveTestimonial(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .update({ status: "approved" })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/impact");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/impact");
  revalidatePath("/admin");
  return { error: null };
}

export async function addSuccessStory(formData: FormData) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const story = String(formData.get("story") ?? "").trim();

  if (!title || !name || !story) {
    return { error: "Title, name, and story are required." };
  }

  const { error } = await supabase.from("success_stories").insert({
    title,
    name,
    story,
    created_by: profile.id,
  });
  if (error) return { error: error.message };

  revalidatePath("/impact");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateSuccessStory(
  id: string,
  title: string,
  name: string,
  story: string,
) {
  await requireAdmin();
  const supabase = await createClient();

  const trimmedTitle = title.trim();
  const trimmedName = name.trim();
  const trimmedStory = story.trim();
  if (!trimmedTitle || !trimmedName || !trimmedStory) {
    return { error: "Title, name, and story are required." };
  }

  const { error } = await supabase
    .from("success_stories")
    .update({ title: trimmedTitle, name: trimmedName, story: trimmedStory })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/impact");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteSuccessStory(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("success_stories")
    .delete()
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/impact");
  revalidatePath("/admin");
  return { error: null };
}

const HB_MEDIUMS = ["english", "marathi"] as const;
const HB_SCHOOL_BOARDS = [
  "ssc-marathi",
  "ssc-english",
  "cbse",
  "icse",
  "home-schooling",
  "other",
] as const;
const HB_SLOTS = [
  "morning-marathi",
  "evening-marathi",
  "evening-english",
] as const;
const HB_SOURCES = [
  "person",
  "whatsapp",
  "facebook",
  "instagram",
  "teacher-school",
  "other",
] as const;

function requiredField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitHbRegistration(formData: FormData) {
  const supabase = await createClient();

  const courseId = requiredField(formData, "course_id");
  const fields = {
    student_name_mr_surname: requiredField(formData, "student_name_mr_surname"),
    student_name_mr_name: requiredField(formData, "student_name_mr_name"),
    student_name_mr_father: requiredField(formData, "student_name_mr_father"),
    student_name_en_surname: requiredField(formData, "student_name_en_surname"),
    student_name_en_name: requiredField(formData, "student_name_en_name"),
    student_name_en_middle: requiredField(formData, "student_name_en_middle"),
    address: requiredField(formData, "address"),
    village: requiredField(formData, "village"),
    taluka: requiredField(formData, "taluka"),
    district: requiredField(formData, "district"),
    parent_name: requiredField(formData, "parent_name"),
    whatsapp_no: requiredField(formData, "whatsapp_no"),
    email: requiredField(formData, "email"),
    school_name: requiredField(formData, "school_name"),
    medium_chosen: requiredField(formData, "medium_chosen"),
    school_address: requiredField(formData, "school_address"),
    school_board: requiredField(formData, "school_board"),
    school_timing_weekday: requiredField(formData, "school_timing_weekday"),
    school_timing_saturday: requiredField(formData, "school_timing_saturday"),
    preferred_slot: requiredField(formData, "preferred_slot"),
    heard_from: requiredField(formData, "heard_from"),
  };
  const file = formData.get("payment_screenshot") as File | null;

  if (!courseId || !file || file.size === 0) {
    return { error: "Course and payment screenshot are required." };
  }
  for (const [key, value] of Object.entries(fields)) {
    if (key === "student_name_en_middle") continue;
    if (!value) return { error: "Please fill in every field." };
  }
  if (!HB_MEDIUMS.includes(fields.medium_chosen as (typeof HB_MEDIUMS)[number])) {
    return { error: "Invalid medium." };
  }
  if (!HB_SCHOOL_BOARDS.includes(fields.school_board as (typeof HB_SCHOOL_BOARDS)[number])) {
    return { error: "Invalid school board." };
  }
  if (!HB_SLOTS.includes(fields.preferred_slot as (typeof HB_SLOTS)[number])) {
    return { error: "Invalid preferred slot." };
  }
  if (!HB_SOURCES.includes(fields.heard_from as (typeof HB_SOURCES)[number])) {
    return { error: "Invalid source." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Payment screenshot must be an image." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is larger than 50MB." };
  }

  const path = `${Date.now()}-${slugify(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from("hb-registrations")
    .upload(path, file, { contentType: file.type });
  if (uploadError) return { error: uploadError.message };

  const { error: insertError } = await supabase.from("hb_registrations").insert({
    course_id: courseId,
    ...fields,
    payment_screenshot_path: path,
  });
  if (insertError) {
    await supabase.storage.from("hb-registrations").remove([path]);
    return { error: insertError.message };
  }

  revalidatePath("/admin");
  return { error: null };
}

export async function deleteHbRegistration(id: string, storagePath: string) {
  await requireAdmin();
  const supabase = await createClient();

  await supabase.storage.from("hb-registrations").remove([storagePath]);
  const { error } = await supabase
    .from("hb_registrations")
    .delete()
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { error: null };
}

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();

  const firstName = requiredField(formData, "firstName");
  const lastName = requiredField(formData, "lastName");
  const email = requiredField(formData, "email");
  const subject = requiredField(formData, "subject");
  const message = requiredField(formData, "message");

  if (!firstName || !lastName || !email || !subject || !message) {
    return { error: "Please fill in every field." };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    subject,
    message,
  });
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { error: null };
}

export async function deleteContactMessage(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  return { error: null };
}

export async function getHbRegistrationScreenshotUrl(storagePath: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("hb-registrations")
    .createSignedUrl(storagePath, 60 * 10);
  if (error) return { url: null, error: error.message };
  return { url: data.signedUrl, error: null };
}
