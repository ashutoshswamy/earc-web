import {
  Award,
  Compass,
  FlaskConical,
  Handshake,
  Languages,
  Lightbulb,
  type LucideIcon,
  Sprout,
  Target,
  Users,
} from "lucide-react";

export type ProjectCategory =
  | "subject-specific"
  | "personality-development"
  | "community-outreach"
  | "teacher-empowerment"
  | "past-projects";

export const categories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "subject-specific", label: "Subject Specific" },
  { id: "personality-development", label: "Personality Development" },
  { id: "community-outreach", label: "Community & Outreach" },
  { id: "teacher-empowerment", label: "Teacher Empowerment" },
  { id: "past-projects", label: "Past Projects" },
];

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  icon: LucideIcon;
  // ponytail: drop a logo file in /public and set its path here to show it
  // instead of the lucide icon; icon stays the fallback.
  logo?: string;
  summary: string;
  objectives: string[];
  reach: string;
  structure?: string;
  methodology?: string;
  keyActivities?: string[];
  enrichmentIntro?: string;
  enrichmentOpportunities?: string[];
  implementationAreas?: string;
  opportunities?: { audience: string; detail: string }[];
}

export const projects: Project[] = [
  {
    id: "anubhav-shala",
    title: "Anubhav Shala",
    category: "personality-development",
    icon: Sprout,
    summary:
      "Anubhav Shala is an educational initiative for children aged 6–11 years living in urban communities of Pune. The programme supports children in accessing primary education while creating opportunities for foundational learning, skill development and holistic growth.",
    objectives: [
      "Strengthen foundational and academic learning",
      "Develop confidence, creativity and communication skills",
      "Nurture life skills, values and positive habits",
      "Encourage participation in school and community activities",
      "Support the overall development of every child",
    ],
    reach: "Urban communities of Pune, for children aged 6–11 years.",
    structure:
      "Target Group: Children aged 6–11 years. Junior Group (Grades 1–3) focuses on foundational learning, language, numeracy, creativity and basic life skills. Senior Group (Grades 4–6) focuses on strengthening academic concepts, communication, problem-solving, creativity and practical life skills.",
    methodology:
      "Anubhav Shala follows an experiential and activity-based learning approach. Children learn through activities, games, stories, creative work and real-life experiences. Learning is planned according to their age and learning level, with continuous assessment and individual support.",
    keyActivities: [
      "Foundational & Academic Learning",
      "Language & Mathematics Activities",
      "Art, Craft & Origami",
      "Yoga, Sports & Physical Activities",
      "Storytelling, Music, Dance & Drama",
      "Worksheets, Projects & Learning Games",
      "Parent Meetings & Home Visits",
      "Continuous Assessment & Support",
    ],
    enrichmentIntro:
      "Children get opportunities to explore their interests, express themselves and build confidence through:",
    enrichmentOpportunities: [
      "Cultural Celebrations & Special Days",
      "Recitation, Drawing & Creative Competitions",
      "Summer Camps",
      "Educational & Community Visits",
      "Life Skills Activities",
      "Exhibitions & Student Presentations",
      "School & Community Events",
    ],
  },
  {
    id: "chhote-scientists",
    title: "Chhote Scientists",
    category: "subject-specific",
    icon: FlaskConical,
    summary:
      "Chhote Scientists is an experiential science learning programme for students from Grades 5 to 9. It encourages children to explore science through observation, questioning, experimentation and problem-solving, making learning engaging and connected to everyday life.",
    objectives: [
      "Develop scientific thinking and curiosity",
      "Build skills such as observation, questioning and experimentation",
      "Connect classroom concepts with real-life experiences",
      "Encourage learning through hands-on activities and problem-solving",
    ],
    reach: "For students from Grades 5 to 9, across partner schools.",
    structure:
      "The programme is designed in two levels: Grades 5–7 focus on developing foundational scientific skills, while Grades 8–9 focus on applying scientific concepts through experiments, problem-solving and projects.",
    methodology:
      "Chhote Scientists follows an activity-based, experiential learning approach using hands-on experiments, everyday materials, group activities, models and projects. It is implemented through Teacher Training, Vidnyan Doot (Facilitator) and Volunteer-based models.",
    keyActivities: [
      "Science Learning Sessions",
      "Teacher Training Workshops",
      "Weekly & Monthly Modules",
      "Project-based Learning",
    ],
    enrichmentOpportunities: [
      "Science Competitions for selected students — V-Gyan, Skill-Synch & V-Solve",
      "Residential Science Camps for competition winners",
    ],
  },
  {
    id: "learneng",
    title: "LearnEng",
    category: "subject-specific",
    icon: Languages,
    summary:
      "LearnEng is an activity-based English-language and life-skills development programme for students in rural government and aided schools. It aims to build confidence in English communication, develop life skills for self-progress and sustainable livelihood, and nurture local youth leadership.",
    objectives: [
      "Build confidence in English communication",
      "Develop essential life skills for personal and future growth",
      "Create joyful and engaging opportunities to use English",
      "Nurture local youth as community learning facilitators",
    ],
    reach: "Rural government and aided schools, through a Shikshandoot-led model.",
    structure:
      "LearnEng is designed for students in rural government and aided schools and is implemented through a Shikshandoot (Community Resource Person)-led model. Regular 60-minute learning sessions are conducted throughout the year.",
    methodology:
      "The programme follows an activity-based and experiential approach to English learning. Sessions focus on communication and confidence-building through activities such as role-plays, reading, goal-setting and group-based learning, along with a range of cultural and educational activities.",
    keyActivities: [
      "English Language & Communication Sessions",
      "Life Skills Development",
      "Reading & Communication Activities",
      "Summer Learning Camps",
    ],
    enrichmentOpportunities: [
      "Talent Development Workshops for selected students",
      "Opportunities for Shikshandoots to develop their own communication and leadership skills",
    ],
  },
  {
    id: "padhai-se-dosti",
    title: "Padhai Se Dosti",
    category: "personality-development",
    icon: Handshake,
    summary:
      "Padhai Se Dosti is a facilitator-led learning support programme for students of Grades 5–7, designed to nurture a passion for learning and build essential study skills among underprivileged and rural students. Through regular, activity-based sessions held close to where children live, it creates a space where they can freely learn, explore and strengthen their foundational abilities.",
    objectives: [
      "Nurture a passion for learning and develop essential study skills among underprivileged and rural students",
      "Create an accessible learning space close to students' homes",
      "Encourage learning through regular, activity-based engagement",
    ],
    reach: "Districts: Dharashiv, Solapur, and Raigad.",
    structure:
      "Regular activity-based sessions are conducted for students of Grades 5–7 on study skills.",
    methodology:
      "Padhai Se Dosti follows a facilitator-led, activity-based learning approach, while Kendra Samanvayaks provide their support through frequent visits to the centres.",
    keyActivities: ["Daily Sessions on study skills at centres"],
    enrichmentOpportunities: ["Summer Camps for participating students"],
    implementationAreas: "Districts: Dharashiv, Solapur, and Raigad",
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
    category: "personality-development",
    icon: Award,
    summary:
      "Pradnya Vikas is a talent development programme of Jnana Prabodhini EARC that works with students from Grades 7 to 10 in communities across Pune. The programme is based on the belief that every individual has the potential for growth, which can be nurtured through meaningful experiences, dedicated mentoring and continuous effort.",
    objectives: [
      "Identify students with high potential through scientific assessment",
      "Motivate students towards continuous self-development",
      "Nurture physical, mental, social, intellectual and spiritual development",
      "Provide meaningful mentoring and developmental experiences",
      "Help students channel their abilities towards excellence in diverse fields",
    ],
    reach: "Communities across Pune, for students aged 12–17 in Grades 7–10.",
    structure:
      "The programme engages students aged 12–17 years from Grades 7 to 10, providing continuous mentoring and developmental inputs along with academic and study guidance.",
    methodology:
      "Pradnya Vikas follows an experiential and learner-centred approach through play-way activities, storytelling, group discussions, hands-on activities and outdoor experiential learning.",
    keyActivities: [
      "Academic & Study Skills Development",
      "Intelligence Enhancement",
      "Life Skills & Personality Development",
      "Creative Activities",
      "Yoga, Sports & Physical Activities",
      "Projects & Learning Games",
      "Parent Meetings & Home Visits",
    ],
    enrichmentOpportunities: [
      "Cultural Celebrations & Special Activities",
      "Creative Competitions",
      "Summer Camps",
      "Educational Visits",
      "Exhibitions & Student Presentations",
    ],
  },
  {
    id: "vikas-mitra",
    title: "Vikas Mitra",
    category: "personality-development",
    icon: Users,
    summary:
      "Vikas Mitra is a rural and tribal education initiative of Jnana Prabodhini EARC that works with students from Grades 5 to 10. The programme aims to bridge educational gaps by providing structured, experiential and skill-oriented learning opportunities that develop students' learning abilities, thinking skills, confidence and aspirations. Vikas Mitra goes beyond academic support by helping students learn independently, think critically, solve problems, explore opportunities and connect learning with their local context and everyday experiences.",
    objectives: [
      "Develop students' learning abilities, curiosity and thinking skills",
      "Strengthen memory, comprehension, study skills and self-learning",
      "Nurture critical thinking, creativity, communication and problem-solving",
      "Build confidence, leadership, collaboration and social responsibility",
      "Provide exposure to diverse careers, opportunities, ideas and role models",
      "Connect learning with local contexts, real-life situations and community needs",
      "Identify and nurture students with higher potential through additional opportunities",
    ],
    reach: "Pune & Raigad Districts | 4 Blocks | 55 Schools | 5,000+ Students | 60+ ShikshanDoots (CRPs)",
    structure:
      "The programme engages students from Grades 5 to 10, with age-appropriate learning experiences designed to progressively develop foundational learning skills, thinking abilities, creativity, problem-solving, leadership and future readiness.",
    methodology:
      "Vikas Mitra follows an activity-based, experiential and learner-centred approach through games and learning challenges, stories and discussions, experiments and hands-on activities, problem-solving and creative tasks, projects and real-life situations, and local-context-based learning.",
    keyActivities: [
      "Learning, Memory & Study Skills",
      "Critical & Creative Thinking",
      "Problem-Solving & Decision-Making",
      "Communication & Collaboration",
      "Leadership & Self-Awareness",
      "Digital, Financial & Media Literacy",
      "Experiential & Project-Based Learning",
      "Career & Future-Readiness Exposure",
      "Teacher / Facilitator Development",
    ],
    enrichmentOpportunities: [
      "Advanced workshops for highly able students",
      "Thinking Skills, Creativity & Design Thinking activities",
      "Leadership and Rural Innovation opportunities",
      "Special Camps and Competitions",
      "Educational Visits and Career Exposure",
      "Projects, Exhibitions and Student Presentations",
      "Interaction with experts, institutions and role models",
      "Community-based and experiential learning opportunities",
    ],
    implementationAreas:
      "Pune & Raigad Districts | 4 Blocks | 55 Schools | 5,000+ Students | 60+ ShikshanDoots (CRPs)",
  },
  {
    id: "vivek-inspire",
    title: "Vivek Inspire",
    category: "past-projects",
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
      "Prerana Setu is a mentoring and interaction platform that connects school students with professionals from diverse fields across India and around the world. JPEARC, in collaboration with Jnana Prabodhini Foundation (USA), creates opportunities for students from rural and urban schools to interact with professionals, explore diverse career possibilities and learn from their personal journeys. Through these interactions, students gain exposure to different career paths, skills, challenges and opportunities, helping them broaden their horizons and set meaningful goals from an early age.",
    objectives: [
      "Run short, focused workshops on motivation and study skills",
      "Reach students outside EARC's flagship exam programmes",
      "Act as an entry point into EARC's deeper initiatives",
    ],
    reach:
      "In collaboration with Jnana Prabodhini Foundation (USA) — weekly online sessions connecting students across states with professionals worldwide.",
    keyActivities: [
      "Weekly 2-hour online interactive sessions",
      "Students from different states participate together",
      "Professionals from diverse fields share their journeys, experiences, skills and career opportunities",
      "Sessions are organised around different themes and areas of interest",
      "Monthly student presentations provide opportunities for students to reflect, express and share their learning",
    ],
    opportunities: [
      {
        audience: "For Professionals",
        detail: "Share your journey, experiences and expertise to inspire the next generation.",
      },
      {
        audience: "For Schools & Students",
        detail: "Register and participate in interactive sessions with professionals from diverse fields.",
      },
    ],
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
