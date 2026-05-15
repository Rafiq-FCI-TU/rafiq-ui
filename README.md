<p align="center">
  <img src="public/logo.png" alt="Rafiq Logo" width="80" />
</p>

<h1 align="center">Rafiq UI</h1>

<p align="center">
  A modern healthcare platform designed to support families of children with Down syndrome — connecting them with specialists, AI-powered assistance, therapeutic games, and a supportive community.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#api-integration">API Integration</a> •
  <a href="#license">License</a>
</p>

---

## Features

### 🏠 Landing Page
- **Welcome Section** — Hero section introducing the platform's mission.
- **Services** — Overview of available services (therapy sessions, AI assistant, community, etc.).
- **Activities** — Showcase of therapeutic activities and games.
- **Care Features** — Highlights of the care model and how Rafiq supports families.
- Responsive top navigation bar with smooth section transitions.

### 🔐 Authentication
- **Register** — Multi-step registration supporting two account types:
  - **Family** — Includes child details form, parent information, and password setup.
  - **Specialist** — Professional registration with credentials, specialty, and organization fields.
- **Login** — Email/password authentication.
- **Forgot Password** — OTP-based password reset flow with email verification.
- **Assessment Questionnaire** — Post-registration assessment for families to evaluate their child's needs.
- **JWT Token Management** — Access tokens with automatic silent refresh, refresh token revocation on logout, and session persistence via `localStorage`.

### 📊 Dashboard
- **Role-based dashboards** that adapt based on user type:
  - **Family Dashboard** — Welcome banner, assigned specialist details, progress chart, skills progress breakdown, milestones tracker, and recent activity feed.
  - **Specialist Dashboard** — Overview statistics, patient list summary, pending attempt reviews, and recent sessions.

### 👩‍⚕️ Specialists / 👶 Patients
- **Specialists Directory** (Family view) — Browse and view specialist profiles with ratings, experience, education, and specializations.
- **Patients Management** (Specialist view) — View assigned patients, patient details, date of birth, gender, assessment scores, and upcoming sessions.
- **Patient Detail Page** — Full patient profile with attempt history, progress tracking, and session participation.

### 🎥 Sessions
- **Role-based session views:**
  - **Patient Sessions** — Tab-based interface with "Upcoming Sessions" (assigned) and "Available Sessions" (allowed), plus clinical notes.
  - **Specialist Sessions** — Session management with ability to upload new sessions (title, description, video, thumbnail, notes).
- **Session Detail Page** — Video player (Video.js), session metadata, and attempt submission/review flow.
- **Session Attempts** — Patients can submit video attempts for specialist review; specialists can approve/reject with feedback and score.

### 🤖 AI Assistant
- Conversational chatbot interface powered by a custom Rafiq AI backend.
- **Suggested Topics** — Pre-built prompts for health and development questions.
- **Quick Actions** — "Summarize", "Explain More", "Give Examples" follow-up buttons.
- Message copy, thumbs up/down feedback, typing indicator, and auto-scroll.
- Disclaimer about AI accuracy.

### 💬 Real-Time Chat
- **SignalR WebSocket** connection for real-time messaging between families and specialists.
- **Conversations Sidebar** — List of active conversations with unread count badges and last message preview.
- **Chat Interface** — Full message history with pagination, read receipts, and formatted timestamps.
- **New Chat** — Start new conversations with assigned contacts (specialists for families, patient families for specialists).
- Automatic reconnection handling with status indicators.

### 🌐 Community
- **Social feed** — Create, edit, and delete posts with tag support.
- **Reactions system** — Six emoji reactions (👍 ❤️ 😂 😮 😢 😡) with toggle support on both posts and comments.
- **Comments** — Add, delete, and react to comments on posts.
- **Optimistic updates** — All mutations use optimistic UI updates for instant feedback, with automatic rollback on failure.
- Reaction breakdown display showing counts per reaction type.

### 📚 Resources
- **Resource library** — Browse, create, edit, and delete educational resources.
- Each resource includes title, link, description, and tags.
- Author-based editing/deletion permissions.
- Optimistic update pattern consistent with the community feature.

### 🎮 Games
- **Therapy-aligned activities** categorized by:
  - **Speech** — Language development games.
  - **Social** — Social interaction activities.
  - **Cognitive** — Cognitive skill-building exercises.
- **Difficulty Selection** — Easy, medium, and hard levels fetched from the API.
- **Question-based gameplay** — Interactive question games with scoring.
- **Progress tracking** — Stars earned, persisted locally and submitted to the backend per patient.

### 🔔 Notifications
- **Real-time notification polling** (30-second intervals).
- **Unread count badge** in the header with dropdown preview (up to 8 items).
- **Full notifications page** for browsing all notifications.
- **Mark as read / Mark all as read** functionality.
- **Deep linking** — Notifications link to relevant sessions or patient pages based on payload data.
- **Doctor feedback** display inline in notification items.

### ⚙️ Settings
- User profile and account settings management page.

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | [React](https://react.dev/) | 19.x |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.9 |
| **Build Tool** | [Vite](https://vite.dev/) | 7.x |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| **Routing** | [React Router](https://reactrouter.com/) | 7.x |
| **Server State** | [TanStack React Query](https://tanstack.com/query) | 5.x |
| **HTTP Client** | [Axios](https://axios-http.com/) + Fetch API | 1.x |
| **Forms** | [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) | 2.x / 1.x |
| **Real-Time** | [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/) | 10.x |
| **Auth** |  JWT | — |
| **Video** | [Video.js (React)](https://videojs.com/) | 10.x beta |
| **Icons** | [Lucide React](https://lucide.dev/) | 0.548 |
| **Date Utilities** | [date-fns](https://date-fns.org/) | 4.x |
| **JWT Decoding** | [jwt-decode](https://www.npmjs.com/package/jwt-decode) | 4.x |
| **Font** | Noto Sans Arabic (self-hosted) | — |
| **Linting** | ESLint + typescript-eslint | 9.x / 8.x |
| **Deployment** | [Netlify](https://netlify.com/) | — |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or equivalent package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/Rafiq-FCI-TU/rafiq-ui.git
cd rafiq-ui

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

> **Note:** In development mode, the Vite dev server proxies `/rafiq-ai-api` requests to the Azure AI backend to avoid CORS issues. See [`vite.config.ts`](vite.config.ts) for proxy configuration.

### Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_RAFIQ_AI_ASK_URL` | Override URL for the Rafiq AI `/ask` endpoint | Auto-detected (dev proxy or Azure URL) |

---

## Project Structure

```
rafiq-ui/
├── public/                         # Static assets (logo, favicon)
├── src/
│   ├── assets/
│   │   └── fonts/                  # Self-hosted Noto Sans Arabic font
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── AuthComponents/         # Auth forms and inputs (19 components)
│   │   │   ├── LoginForm.tsx             # Email/password login form
│   │   │   ├── FamilyRegistrationForm.tsx   # Multi-step family registration
│   │   │   ├── SpecialistRegistrationForm.tsx  # Specialist registration
│   │   │   ├── AssessmentQuestionnaire.tsx  # Post-signup assessment
│   │   │   ├── AccountTypeSelector.tsx     # Family vs Specialist selector
│   │   │   ├── OtpInput.tsx              # OTP verification input
│   │   │   ├── ProgressBar.tsx           # Registration progress indicator
│   │   │   └── ...                       # TextInput, EmailInput, DateInput, etc.
│   │   │
│   │   ├── ChatComponents/         # Real-time chat UI (7 components)
│   │   │   ├── Chat.tsx                  # Main chat window
│   │   │   ├── ConversationsSideBar.tsx  # Sidebar with conversation list
│   │   │   ├── ConversationItem.tsx      # Single conversation list item
│   │   │   ├── ContactItem.tsx           # Contact card for new chat
│   │   │   ├── Message.tsx               # Individual message bubble
│   │   │   ├── NewChat.tsx               # New conversation modal
│   │   │   └── UnSelectedChat.tsx        # Empty state placeholder
│   │   │
│   │   ├── CommunityComponents/    # Social feed components (10 components)
│   │   │   ├── Post.tsx                  # Post card with reactions
│   │   │   ├── PostsFeed.tsx             # Feed container
│   │   │   ├── CreatePostForm.tsx        # New post form with tags
│   │   │   ├── EditPostForm.tsx          # Inline post editor
│   │   │   ├── Comment.tsx               # Comment with reactions
│   │   │   ├── CommentInput.tsx          # Comment input field
│   │   │   ├── ReactionButton.tsx        # Emoji reaction picker
│   │   │   ├── ReactionsBreakdown.tsx    # Reaction count display
│   │   │   ├── CommentReactionsBreakdown.tsx  # Comment-specific breakdown
│   │   │   └── PostMenu.tsx              # Edit/delete dropdown menu
│   │   │
│   │   ├── DashboardComponents/    # Dashboard widgets
│   │   │   ├── FamilyDashboard.tsx       # Family dashboard layout
│   │   │   ├── FamilyDashboard/          # Family-specific widgets
│   │   │   │   ├── WelcomeBanner.tsx
│   │   │   │   ├── SpecialistDetailsCard.tsx
│   │   │   │   ├── ProgressChart.tsx
│   │   │   │   ├── SkillsProgress.tsx
│   │   │   │   ├── Milestones.tsx
│   │   │   │   └── RecentActivity.tsx
│   │   │   ├── SpecialistDashboard.tsx   # Specialist dashboard layout
│   │   │   └── SpecialistDashboard/      # Specialist-specific widgets
│   │   │       ├── WelcomeBanner.tsx
│   │   │       ├── Overview.tsx
│   │   │       ├── MyPatients.tsx
│   │   │       ├── PendingAttemptReviews.tsx
│   │   │       └── RecentSessions.tsx
│   │   │
│   │   ├── HomeComponents/         # Landing page sections (10 components)
│   │   │   ├── NavBar.tsx                # Landing page navigation
│   │   │   ├── WelcomeSection.tsx        # Hero section
│   │   │   ├── Services.tsx             # Services showcase
│   │   │   ├── Activities.tsx           # Activities highlight
│   │   │   ├── Care.tsx                 # Care model section
│   │   │   ├── GetStarted.tsx           # CTA section
│   │   │   └── ...                      # Service, Activity, CareFeature cards
│   │   │
│   │   ├── PatientComponents/      # Patient-related components
│   │   │   ├── PatientCard.tsx           # Patient summary card
│   │   │   ├── PatientAttempts.tsx       # Attempt history & review UI
│   │   │   └── UpcomingSessions.tsx      # Scheduled sessions display
│   │   │
│   │   ├── SpecialistComponents/   # Specialist-related components
│   │   │   └── SpecialistCard.tsx        # Specialist profile card
│   │   │
│   │   ├── SessionComponents/      # Session management
│   │   │   ├── PatientSessionComponents/    # Patient-facing session UI
│   │   │   │   ├── PatientSessions.tsx      # Session list with tabs
│   │   │   │   ├── PatientSessionCard.tsx   # Session card
│   │   │   │   ├── SessionAttempt.tsx       # Attempt submission form
│   │   │   │   ├── ActiveTab.tsx            # Tab indicator
│   │   │   │   └── TapButton.tsx            # Tab button
│   │   │   └── SpecialistSessionComponents/  # Specialist-facing session UI
│   │   │       ├── SpecialistSessions.tsx    # Session management
│   │   │       ├── SpecialistSessionCard.tsx # Session card
│   │   │       └── UploadSession.tsx        # New session upload form
│   │   │
│   │   ├── ResourceComponents/     # Resource library components
│   │   │   ├── ResourceCard.tsx          # Resource card display
│   │   │   ├── CreateResourceForm.tsx    # New resource form
│   │   │   └── EditResourceForm.tsx      # Resource editor
│   │   │
│   │   ├── games/                  # Therapeutic game components
│   │   │   ├── ActivityCard.tsx          # Game card with emoji thumbnail
│   │   │   ├── DifficultySelector.tsx    # Level/difficulty picker
│   │   │   └── ApiLevelQuestionGame.tsx  # Question-based game engine
│   │   │
│   │   ├── Player.tsx              # Video.js player wrapper
│   │   └── Toast.tsx               # Toast notification component
│   │
│   ├── contexts/                   # React Context providers
│   │   ├── AuthContext.tsx               # Authentication state & JWT management
│   │   ├── ConversationContext.tsx       # Active chat conversation state
│   │   └── ToastContext.tsx              # Toast notification system
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useSignalR.ts                # SignalR WebSocket connection
│   │   ├── useCommunity.ts              # Community posts CRUD + reactions
│   │   ├── useResources.ts              # Resources CRUD operations
│   │   ├── useNotifications.ts          # Notifications polling + actions
│   │   ├── useGames.ts                  # Games catalog fetching
│   │   ├── usePatientAttempts.ts        # Patient attempt management
│   │   ├── useConversation.ts           # Conversation context consumer
│   │   └── useToast.ts                  # Toast context consumer
│   │
│   ├── layouts/
│   │   └── AppLayout.tsx                # Authenticated app shell (sidebar + header)
│   │
│   ├── lib/                        # Utility functions & API helpers
│   │   ├── rafiqAiApi.ts                # Rafiq AI chat API client
│   │   ├── chatUtils.ts                 # Chat formatting utilities
│   │   └── communityUtils.ts            # Community helper functions
│   │
│   ├── pages/                      # Route-level page components
│   │   ├── Home.tsx                     # Landing page wrapper
│   │   ├── Login.tsx                    # Login page
│   │   ├── Register.tsx                 # Registration page
│   │   ├── ForgotPassword.tsx           # Password reset flow
│   │   ├── Assessment.tsx               # Assessment questionnaire page
│   │   ├── Dashboard.tsx                # Role-based dashboard
│   │   ├── Sessions.tsx                 # Sessions list page
│   │   ├── Session.tsx                  # Session detail page
│   │   ├── Specialists.tsx              # Specialists directory
│   │   ├── Specialist.tsx               # Specialist profile page
│   │   ├── Patients.tsx                 # Patients list page
│   │   ├── Patient.tsx                  # Patient detail page
│   │   ├── AIAssistant.tsx              # AI chatbot page
│   │   ├── Community.tsx                # Community feed page
│   │   ├── Chats.tsx                    # Real-time chat page
│   │   ├── Resources.tsx                # Resource library page
│   │   ├── Games.tsx                    # Therapeutic games page
│   │   ├── Notifications.tsx            # Notifications page
│   │   └── Settings.tsx                 # User settings page
│   │
│   ├── routes/                     # Route guards
│   │   ├── ProtectedRoute.tsx           # Auth-required route wrapper
│   │   └── PublicRoute.tsx              # Public-only route wrapper (auto-logout)
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── Chat.ts                      # Chat, Message, Conversation, Contact
│   │   ├── Community.ts                 # Post, Comment, Reaction, Author
│   │   ├── Patient.ts                   # Patient, PatientCard
│   │   ├── Specialist.ts               # Specialist, SpecialistCard, SpecialistDetails
│   │   ├── Session.ts                   # Session, Tab, SessionType
│   │   ├── Resources.ts                # ResourcesCard, FormValues
│   │   ├── HomeCards.ts                 # Feature, Care, Activity
│   │   └── PatientProgress.ts          # PatientCategoryProgress, PatientProgressData
│   │
│   ├── main.tsx                    # App entry point & router configuration
│   └── index.css                   # Global styles, Tailwind imports, animations
│
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration with proxy
├── vercel.json                     # Vercel SPA rewrite rules
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App-specific TS config
├── tsconfig.node.json              # Node-specific TS config
├── eslint.config.js                # ESLint configuration
├── package.json                    # Dependencies and scripts
└── LICENSE                         # MIT License
```

---

## Architecture

### Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├─────────────────────────────────────────────────────────────────┤
│  main.tsx                                                        │
│  ├── QueryClientProvider (TanStack React Query)                  │
│  ├── AuthProvider (JWT + User State)                             │
│  ├── ToastProvider (Notification Toasts)                         │
│  └── RouterProvider (React Router v7)                            │
│       ├── PublicRoute → Home, Login, Register, ForgotPassword    │
│       └── ProtectedRoute → AppLayout                             │
│            ├── Sidebar Navigation                                │
│            ├── Top Header (Breadcrumb + Notifications)           │
│            └── <Outlet /> → Page Components                      │
└─────────────────────────────────────────────────────────────────┘
```

### State Management

| Layer | Tool | Purpose |
|---|---|---|
| **Server State** | TanStack React Query | API data fetching, caching, polling, mutations with optimistic updates |
| **Auth State** | React Context (`AuthContext`) | User session, JWT tokens, login/logout, silent token refresh |
| **Conversation State** | React Context (`ConversationContext`) | Currently active chat conversation |
| **Toast State** | React Context (`ToastContext`) | Success/error toast notifications with auto-dismiss |
| **Local State** | React `useState` | Component-level UI state (modals, forms, toggles) |

### Authentication Flow

```
Login/Register
      │
      ▼
  API returns { token, refreshToken, expiresOn, refreshTokenExpiration, user data }
      │
      ▼
  AuthContext.login() → stores tokens in localStorage → sets user state
      │
      ▼
  Auto-refresh timer set (expiresOn - 60s buffer)
      │
      ▼
  On timer fire → POST /api/Auth/refresh-token → new tokens
      │
      ▼
  On logout → POST /api/Auth/revoke-token → clear localStorage → redirect
```

### Route Guard Strategy

- **`ProtectedRoute`** — Checks `user.isAuthenticated`; redirects to `/login` if unauthenticated, shows a loading spinner during session verification.
- **`PublicRoute`** — Automatically calls `logout()` when landing on public pages (login, register, home), ensuring clean session state.

---

## API Integration

### Backend Services

The application connects to two primary backend services:

#### 1. Rafiq Main API (Azure Container Apps)

**Base URL:** `https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/api`

| Endpoint Group | Operations |
|---|---|
| `/Auth` | Login, Register, Refresh Token, Revoke Token |
| `/community/posts` | CRUD posts, toggle reactions, CRUD comments |
| `/community/comments` | Delete comments, toggle comment reactions |
| `/resources` | CRUD educational resources |
| `/Notifications` | List notifications, unread count, mark read |
| `/PatientAttempts` | Pending attempts, patient attempts, review submission |
| `/games` | Game catalog by category |
| `/patient-progress` | Submit game progress |
| `/sessions` | Session management |
| `/specialists` | Specialist profiles |
| `/patients` | Patient management |

#### 2. Rafiq AI API (Azure Web App)

**Base URL:** `https://rafiq-ai-app-gugrccaxbfhydvhr.germanywestcentral-01.azurewebsites.net`

| Endpoint | Method | Description |
|---|---|---|
| `/ask` | POST | Send a message and receive an AI-generated response |

> In development, the `/ask` endpoint is proxied through Vite at `/rafiq-ai-api/ask` to avoid CORS issues.

#### 3. SignalR Hub (WebSocket)

**URL:** `https://rafiq-container-server.wittyhill-43579268.germanywestcentral.azurecontainerapps.io/hub`

| Event | Direction | Description |
|---|---|---|
| `newmessage` | Server → Client | Receive real-time chat messages |

- Uses WebSocket transport with `skipNegotiation: true`.
- Authenticates via query string `?access_token=<JWT>`.
- Automatic reconnection built-in.

### Data Fetching Patterns

All data hooks follow a consistent pattern using TanStack React Query:

```typescript
// Query pattern (reads)
const { data, isPending, error } = useQuery({
  queryKey: ["ResourceKey"],
  queryFn: async () => { /* fetch from API */ },
  staleTime: 0, // or custom interval
});

// Mutation pattern (writes) with optimistic updates
const mutation = useMutation({
  mutationFn: async (payload) => { /* API call */ },
  onMutate: async (vars) => {
    // Cancel in-flight queries
    // Snapshot previous data
    // Optimistically update cache
    return { previousData };
  },
  onError: (_err, _vars, context) => {
    // Rollback on failure
    queryClient.setQueryData(["Key"], context.previousData);
    showToast("Error message", "error");
  },
  onSuccess: () => {
    showToast("Success message", "success");
  },
});
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-primary-dark` | `#0a5a2f` | Primary dark green, sidebar active states, headers |
| `--color-primary` | `#0d6b38` | Main brand green |
| `--color-primary-light` | `#148445` | Primary light green, gradients, hover states |

### Typography

- **Font Family:** Noto Sans Arabic (self-hosted TTF)
- Loaded via `@font-face` in `index.css` and applied globally to `body`.

### Custom Animations

| Animation | Description |
|---|---|
| `fade-in` | Opacity 0→1 + translateY 10→0px (0.5s) |
| `slide-up` | Opacity 0→1 + translateY 20→0px (0.4s) |
| `shimmer` | Loading skeleton gradient sweep effect |
| `loading-bar` | Horizontal loading bar translation |

---

## Deployment

The project is configured for deployment on **Vercel**:

- **`vercel.json`** — SPA fallback rewrite: all routes serve `index.html`.
- **Build command:** `tsc -b && vite build`
- **Output directory:** `dist/`

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Vite dev server with HMR |
| `build` | `npm run build` | Type-check + production build |
| `lint` | `npm run lint` | Run ESLint across the project |
| `preview` | `npm run preview` | Preview the production build locally |

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Copyright © 2025 Rafiq
