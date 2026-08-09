import {
  Award,
  Compass,
  FlaskConical,
  Handshake,
  Lightbulb,
  type LucideIcon,
  Sprout,
  Target,
  Users,
} from "lucide-react";

export type ProjectCategory =
  | "experiential-learning"
  | "talent-leadership"
  | "community-outreach"
  | "teacher-empowerment";

export const categories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "experiential-learning", label: "Experiential learning" },
  { id: "talent-leadership", label: "Talent & leadership" },
  { id: "community-outreach", label: "Community & outreach" },
  { id: "teacher-empowerment", label: "Teacher empowerment" },
];

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  icon: LucideIcon;
  summary: string;
  objectives: string[];
  reach: string;
}

export const projects: Project[] = [
  {
    id: "anubhav-shala",
    title: "Anubhav Shala",
    category: "experiential-learning",
    icon: Sprout,
    summary:
      "Activity-based experiential learning that builds holistic development around doing, not just listening.",
    objectives: [
      "Replace rote lessons with hands-on activity stations",
      "Build social, motor, and thinking skills alongside academics",
      "Give teachers a repeatable activity-based lesson format",
    ],
    reach: "Run across partner schools as a term-long classroom programme.",
  },
  {
    id: "chhote-scientists",
    title: "Chhote Scientists",
    category: "experiential-learning",
    icon: FlaskConical,
    summary:
      "Hands-on science experiments and inquiry-based learning for rural and urban students alike.",
    objectives: [
      "Turn science from a textbook subject into a hands-on habit",
      "Reach both rural and urban classrooms with the same rigour",
      "Build early scientific temperament before it's specialised away",
    ],
    reach: "One of EARC's largest-reach initiatives, spanning multiple states.",
  },
  {
    id: "gyan-setu",
    title: "Gyan Setu",
    category: "community-outreach",
    icon: Handshake,
    summary:
      "An educational bridge connecting urban volunteer educators with rural and tribal schools.",
    objectives: [
      "Pair volunteer educators with schools that lack specialist teachers",
      "Deliver content digitally where in-person reach is limited",
      "Keep the bridge two-way — volunteers learn from the schools too",
    ],
    reach: "Connects volunteer educators to rural and tribal school networks.",
  },
  {
    id: "pradnya-vikas",
    title: "Pradnya Vikas",
    category: "talent-leadership",
    icon: Award,
    summary:
      "A nurturance programme that identifies and mentors high-potential and gifted students.",
    objectives: [
      "Identify high-potential students early through structured assessment",
      "Provide sustained mentorship, not a one-time talent test",
      "Build a pipeline from identification into leadership opportunity",
    ],
    reach: "Follows identified students over multiple years of mentorship.",
  },
  {
    id: "vikas-mitra",
    title: "Vikas Mitra",
    category: "community-outreach",
    icon: Users,
    summary:
      "Community leadership and grassroots educational enhancement, built with local volunteers.",
    objectives: [
      "Train local community members as education volunteers",
      "Strengthen the link between schools and the communities around them",
      "Sustain enrichment work between EARC's direct visits",
    ],
    reach: "Grassroots volunteer network embedded in local communities.",
  },
  {
    id: "vivek-inspire",
    title: "Vivek Inspire",
    category: "talent-leadership",
    icon: Target,
    summary:
      "Comprehensive mentorship and competitive-exam guidance for students aiming at scholarship-level exams.",
    objectives: [
      "Guide students through competitive exam preparation end-to-end",
      "Pair academic mentorship with exam strategy and confidence-building",
      "Sustain guidance across the full run-up to exam day, not just a workshop",
    ],
    reach: "Structured mentorship track for competitive exam aspirants.",
  },
  {
    id: "prerana-setu",
    title: "Prerana Setu",
    category: "community-outreach",
    icon: Compass,
    summary:
      "Motivation and skill-enhancement workshops that meet school students where they are.",
    objectives: [
      "Run short, focused workshops on motivation and study skills",
      "Reach students outside EARC's flagship exam programmes",
      "Act as an entry point into EARC's deeper initiatives",
    ],
    reach: "Workshop format, run across schools on a rolling basis.",
  },
  {
    id: "teachers-training",
    title: "Teachers' Training",
    category: "teacher-empowerment",
    icon: Lightbulb,
    summary:
      "Capacity building and modern pedagogical skill workshops for educators, EARC's founding focus.",
    objectives: [
      "Train teachers in activity-based and experiential pedagogy",
      "Build soft skills — planning, communication, guidance",
      "Develop teacher leaders who can carry training back into schools",
    ],
    reach: "See the full programme on the Services page.",
  },
];
