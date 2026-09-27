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

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  project: string;
  centre: string;
  created_at: string;
  created_by: string | null;
}

export interface Partner {
  id: string;
  project: string;
  csr_partner: string;
  storage_path: string;
  url: string;
  created_at: string;
  created_by: string | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  detail: string;
  status: "pending" | "approved";
  created_at: string;
  created_by: string | null;
}

export interface SuccessStory {
  id: string;
  title: string;
  name: string;
  story: string;
  created_at: string;
  created_by: string | null;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  project: string;
  tier: "memoriam" | "head" | "team";
  created_at: string;
  created_by: string | null;
}

export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface HbRegistration {
  id: string;
  course_id: string;
  student_name_mr_surname: string;
  student_name_mr_name: string;
  student_name_mr_father: string;
  student_name_en_surname: string;
  student_name_en_name: string;
  student_name_en_middle: string;
  payment_screenshot_path: string;
  address: string;
  village: string;
  taluka: string;
  district: string;
  parent_name: string;
  whatsapp_no: string;
  email: string;
  school_name: string;
  medium_chosen: "english" | "marathi";
  school_address: string;
  school_board:
    | "ssc-marathi"
    | "ssc-english"
    | "cbse"
    | "icse"
    | "home-schooling"
    | "other";
  school_timing_weekday: string;
  school_timing_saturday: string;
  preferred_slot: "morning-marathi" | "evening-marathi" | "evening-english";
  heard_from:
    | "person"
    | "whatsapp"
    | "facebook"
    | "instagram"
    | "teacher-school"
    | "other";
  created_at: string;
}
