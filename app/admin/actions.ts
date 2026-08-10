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
