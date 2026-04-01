# 🚀 ResumePro - AI-Powered Professional Resume Builder

A modern, type-safe, full-stack web application designed to help users create, manage, and export professional resumes. Built with **Next.js 15**, **Drizzle ORM**, and integrated with **Google Gemini AI** for content optimization.

## ✨ Key Features

-   **🤖 AI Resume Optimization:** Leverage Google Gemini to enhance your resume content and suggest improvements.
-   **🔐 Secure Authentication:** Seamless login via **Better Auth** with GitHub social integration.
-   **💳 Premium Subscriptions:** Integrated with **Stripe** for handling pro plan upgrades and payments.
-   **⚡ Real-time Editor:** A dynamic interface for building resumes with live previews (Canva-inspired).
-   **📊 Dashboard:** Manage multiple resumes and track your progress.
-   **🎨 Modern UI:** Premium design using Tailwind CSS, Shadcn UI, and Base UI components.
-   **💾 Type-Safe Database:** Powered by Drizzle ORM for robust data management.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **AI:** [Google Gemini AI](https://deepmind.google/technologies/gemini/)
-   **Auth:** [Better Auth](https://www.better-auth.com/)
-   **Payments:** [Stripe](https://stripe.com/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Base UI](https://base-ui.com/)
-   **State Management:** React hooks and Zod for validation

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18 or higher)
-   **pnpm** (preferred)
-   **PostgreSQL** (Local or Containerized)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/uttombarmon/resume-builder.git
    cd resume-builder
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and fill in your credentials:
    ```bash
    cp .env.example .env.local
    ```
    Required keys:
    - `DATABASE_URL` (PostgreSQL connection string)
    - `BETTER_AUTH_SECRET` (Generate using `npx better-auth secret`)
    - `BETTER_AUTH_URL` (`http://localhost:3000`)
    - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` (For social login)
    - `GEMINI_API_KEY` (From Google AI Studio)
    - `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET` (For payments)

4.  **Database Setup:**
    Push the schema to your database:
    ```bash
    pnpm drizzle-kit push
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📂 Project Structure

```plaintext
├── app/                # Next.js App Router (Pages & API Routes)
│   ├── api/            # AI, Billing, and Auth endpoints
│   ├── dashboard/      # User dashboard pages
│   └── editor/         # Canva-style resume editor
├── components/         # Reusable UI components & Editor components
├── lib/                # Shared utilities
│   ├── auth/           # Better Auth configuration
│   ├── db/             # Drizzle schema & database client
│   └── stripe/         # Stripe payment integration
├── drizzle/            # Database migrations
└── drizzle.config.ts   # ORM configuration
```

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Uttom Barmon](https://github.com/uttombarmon)
