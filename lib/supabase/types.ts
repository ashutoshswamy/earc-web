export type ProfileRole = "user" | "admin";

export interface Profile {
  id: string;
  role: ProfileRole;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  media_type: "photo" | "video";
  storage_path: string;
  url: string;
  created_at: string;
  created_by: string | null;
}

export interface AnnualReport {
  id: string;
  title: string;
  year: number;
  storage_path: string;
  url: string;
  created_at: string;
  created_by: string | null;
}

export interface GpPaper {
  id: string;
  title: string;
  year: number;
  standard: "5th" | "8th";
  kind: "question-paper" | "answer-sheet";
  storage_path: string;
  url: string;
  created_at: string;
  created_by: string | null;
}
