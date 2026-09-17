# StudentHub NG 🎓🇳🇬

**The All-in-One Digital Academic Platform for Nigerian Tertiary Institution Students**

StudentHub NG is a comprehensive, production-ready digital ecosystem designed specifically for students, course representatives, and lecturers across Nigerian universities, polytechnics, and colleges of education. It integrates an AI study copilot powered by Google Gemini, national past questions and CBT practice repositories, NUC/NBTE-compliant GPA/CGPA computation, lecture material vaults, and campus community spaces.

---

## 🌟 Key Features

### 1. Student Command Center & Academic Dashboard
- **Personalized Course Hub**: Real-time enrollment tracker matching the student's institution, faculty, department, and academic level (100L through 500L/HND/NCE).
- **Academic Progress Tracker**: Live GPA/CGPA metrics, credit unit totals, and semester performance history.
- **Timetable & Daily Schedule**: Organized view of upcoming lectures, assignment deadlines, and exam dates.

### 2. AI Study Copilot (Powered by Google Gemini)
- **Nigerian Syllabus Context**: AI assistant tuned for NUC, NBTE, and NCCE benchmarks across STEM, Humanities, Law, Medicine, Social Sciences, and Management.
- **Concept Breakdown & Summarization**: Ask complex academic questions, receive step-by-step explanations, and generate targeted study notes.
- **Practice Question Generator**: Instant multiple-choice and theory question generation with answer keys and rationale.

### 3. Past Questions & Solutions Repository
- **Extensive National Archive**: Thousands of vetted past questions spanning major federal, state, and private institutions (UNILAG, OAU, ABU, UI, UNN, FUTO, LASU, YABATECH, etc.).
- **Interactive CBT & Practice Mode**: Timed exam simulations with instant scoring, performance breakdowns, and step-by-step worked solutions.
- **Filter by Institution, Course Code, and Year**: Rapid search across 100L–500L general courses (GST/GNS) and department-specific modules.

### 4. NUC & NBTE GPA/CGPA Calculator
- **Standardized Grading Scales**: Full support for the 5-point NUC scale (A=5, B=4, C=3, D=2, E=1, F=0) and 4-point NBTE polytechnic scale.
- **Cumulative CGPA Projections**: Multi-semester tracking, target GPA scenario simulator, and graduation honors classification (First Class, Second Class Upper, etc.).
- **Data Export & Reports**: Save semester records locally or sync across sessions.

### 5. Multi-Role Academic Portals
- **Student Portal**: Course enrollment, personal library, past questions, and GPA tracking.
- **Course Representative Portal**: Broadcast announcements to class members, schedule lectures, manage course materials, and coordinate study sessions.
- **Lecturer Portal**: Upload syllabus outlines, share lecture slides and handouts, create assignment briefs, and monitor class engagement.
- **Administrative Command Center**: Platform analytics, course catalog management, institution directory updates, and user moderation.

### 6. Digital Library & Study Materials Vault
- **Curated Course Materials**: Lecture notes, slides, lab manuals, and textbook references.
- **Personal Collections**: Organize materials into custom binders with offline-ready local storage.

### 7. Institution & Faculty Directory
- **Nationwide Coverage**: Comprehensive profiles of Nigerian federal, state, and private universities, polytechnics, and colleges of education.
- **Academic Calendar & Department Guides**: Accredited faculties, departments, and course curricula across all 36 states and the FCT.

### 8. Campus Community & Project Repository
- **Departmental Study Forums**: Peer discussions, question threads, and academic collaboration.
- **Final Year Research Center**: Archive of project topics, research methodology guides, and reference materials.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript | Reactive modern component architecture |
| **Styling** | Tailwind CSS v4 | Responsive, accessible utility-first design |
| **Animations** | Motion (`motion/react`) | Fluid transitions and modal interactions |
| **Icons** | Lucide React | Clean, consistent vector icon set |
| **Server / Backend** | Node.js, Express, `tsx`, `esbuild` | Full-stack server proxying secure API requests |
| **AI Integration** | Google Gen AI SDK (`@google/genai`) | Gemini models for server-side study assistance |
| **Database & Auth** | Supabase & LocalStorage Hybrid | Cloud data persistence with zero-latency fallback |
| **Build Tooling** | Vite 6 | Rapid development server and optimized bundle build |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or `v22.x`
- **npm**: `v10.x` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/studenthub-ng.git
   cd studenthub-ng
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Fill in your required secrets:
   ```env
   # Required for AI Study Copilot
   GEMINI_API_KEY="your_gemini_api_key_here"

   # Optional: OpenAI API Key (if enabling secondary models)
   OPENAI_API_KEY=""

   # Optional: Supabase credentials for cloud database sync
   SUPABASE_URL="https://your-project.supabase.co"
   SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_key"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The dev server binds to `http://localhost:3000`.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Express backend and Vite development middleware via `tsx server.ts`.
- `npm run build` — Compiles the Vite frontend bundle and uses `esbuild` to produce a production CommonJS server bundle in `dist/server.cjs`.
- `npm start` — Runs the compiled production server (`node dist/server.cjs`).
- `npm run lint` — Validates TypeScript types across the entire codebase (`tsc --noEmit`).
- `npm run clean` — Cleans up previous build artifacts and the `dist/` directory.

---

## 📁 Project Structure

```
├── index.html                      # Entry HTML document with meta tags
├── metadata.json                   # App manifest and platform capabilities
├── package.json                    # Project dependencies and run scripts
├── server.ts                       # Express backend and Vite middleware integration
├── .env.example                    # Environment variable templates
├── src/
│   ├── main.tsx                    # React client entry point
│   ├── App.tsx                     # Main application shell & view router
│   ├── index.css                   # Global styles and Tailwind CSS imports
│   ├── types.ts                    # Global TypeScript interfaces & data models
│   ├── context/
│   │   └── AppContext.tsx          # Global state store (auth, courses, GPA, tasks)
│   ├── components/                 # View components & interactive modals
│   │   ├── StudentDashboard.tsx    # Primary student dashboard
│   │   ├── AIStudyCopilot.tsx      # Gemini-powered study assistant
│   │   ├── PastQuestionsCenter.tsx # CBT & past question engine
│   │   ├── GpaCgpaCalculator.tsx   # NUC/NBTE GPA and CGPA calculator
│   │   ├── MyCoursesCenter.tsx     # Enrolled courses and catalog search
│   │   ├── MyLibrary.tsx           # Student saved materials and collections
│   │   ├── CourseRepDashboard.tsx  # Course representative workflow
│   │   ├── LecturerDashboard.tsx   # Lecturer course & handout management
│   │   ├── AdminCommandCenter.tsx  # Platform administration
│   │   ├── InstitutionDirectory.tsx# Directory of Nigerian tertiary institutions
│   │   ├── CommunityForum.tsx      # Campus study groups & forums
│   │   ├── OnboardingModal.tsx     # Student profile & department setup
│   │   ├── SignUpPage.tsx          # Registration flow
│   │   └── LoginPage.tsx           # Authentication login page
│   ├── data/
│   │   ├── academicStructureData.ts# Nigerian institutional structure & curriculum
│   │   ├── allCoursesData.ts       # Comprehensive course catalog
│   │   ├── mockData.ts             # Initial fixtures & sample semester records
│   │   └── pastQuestionsData.ts    # Curated exam questions and CBT data
│   └── lib/
│       └── supabase.ts             # Supabase client integration
```

---

## 🔒 Security & Architecture Best Practices

- **Server-Side API Keys**: The Gemini API key is accessed exclusively on the server (`server.ts`), keeping all credentials secure from browser DevTools.
- **Graceful Offline Fallback**: In the absence of external database connections, state gracefully persists to browser LocalStorage.
- **Accurate Academic Data**: Course codes, titles, and credit units are mapped to standard Nigerian benchmarks (NUC BMAS/CCMAS, NBTE curriculums).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
