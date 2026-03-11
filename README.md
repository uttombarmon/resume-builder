# 🚀 Professional Resume Builder

A modern, type-safe, full-stack web application designed to help users create, manage, and export professional resumes. Built with a focus on performance, developer experience, and seamless database management using **Next.js** and **Drizzle ORM**.



## ✨ Key Features

- **Live Preview:** Real-time visual feedback as you build your resume.
- **Type-Safe Database:** Powered by Drizzle ORM for robust data management.
- **Containerized Environment:** Reliable PostgreSQL setup using Podman.
- **Responsive UI:** Built with Tailwind CSS for a smooth experience across all devices.
- **Modern Tech Stack:** Leveraging the latest Next.js 15 App Router features.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Running in Podman)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Development Environment:** Fedora Workstation 43

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (preferred) or npm
- **Podman** (for containerized database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/resume-builder.git](https://github.com/your-username/resume-builder.git)
   cd resume-builder
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up environment variables:**
Create a .env.local file in the root directory:

    ```bash
    DATABASE_URL="postgresql://user_dev:password_dev@localhost:5432/project_db"
    ```
4. **Start the Database (Podman):**
    ```bash
    podman-compose up -d
    ```
5. **Push the Schema:**

    ```bash
    npx drizzle-kit push
    ```
6. **Run the development server:**

    ```Bash
    pnpm dev
    ```
Open http://localhost:3000 with your browser to see the result.

## 📂 Project Structure
```Plaintext
├── src/
│   ├── app/            # Next.js App Router (Pages & API)
│   ├── components/     # Reusable UI components
│   ├── db/             # Drizzle Schema & Connection
│   └── lib/            # Utility functions
├── drizzle/            # Database migrations
├── pgdata/             # Local DB storage (Ignored by Git)
├── docker-compose.yml  # Container configuration
└── drizzle.config.ts   # ORM configuration
```
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

Built by **Uttom Barmon**