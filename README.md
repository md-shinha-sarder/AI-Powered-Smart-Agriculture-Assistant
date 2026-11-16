# AI-Powered-Smart-Agriculture-Assistant

### Crop Disease Detection and Intelligent Farming Recommendation System

![React](https://img.shields.io/badge/Frontend-React%20%2F%20Next.js-20232A?logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-0F172A?logo=tailwindcss&logoColor=38BDF8)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-1B5E20?logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-1F3A7A?logo=postgresql&logoColor=white)
![AI](https://img.shields.io/badge/AI-OpenRouter%20%7C%20Gemini-6A3D9A)
![Course](https://img.shields.io/badge/CSE%204104-Software%20Development%20III-B36B00)

A web application that helps farmers identify possible plant-leaf diseases from a photo and get simple, practical crop-care guidance in a Bangla-friendly interface.

> **Important:** This tool gives early information only. It is not a replacement for a professional agricultural diagnosis. When an image is unclear or the confidence is low, the app advises users to consult a local agricultural extension officer, especially before using any pesticide.

---

## Table of Contents

1. [Project Information](#project-information)
2. [Team Info Box](#team-info-box)
3. [Overview](#overview)
4. [Features](#features)
5. [Technology Stack](#technology-stack)
6. [System Architecture](#system-architecture)
7. [How a Diagnosis Works](#how-a-diagnosis-works)
8. [Database Design (ER Diagram)](#database-design-er-diagram)
9. [User Roles and Use Cases](#user-roles-and-use-cases)
10. [Requirements Summary](#requirements-summary)
11. [Planned REST API](#planned-rest-api)
12. [Project Structure](#project-structure)
13. [Getting Started](#getting-started)
14. [Project Documents](#project-documents)
15. [Scope and Limitations](#scope-and-limitations)
16. [Project Plan](#project-plan)
17. [Similar Systems and Research](#similar-systems-and-research)
18. [References](#references)

---

## Project Information

| | |
|---|---|
| **Project Title** | AI-Powered Smart Agriculture Assistant: Crop Disease Detection and Intelligent Farming Recommendation System |
| **Team Name** | 7E-T11 |
| **Course** | CSE 4104 – Software Development III |
| **University** | Northern University of Business and Technology Khulna (NUBT) |
| **Section** | 7E |
| **Submitted To** | Md. Riaz Mahmud, Assistant Professor, Dept. of CSE |
| **Status** | Planning and design complete (SRS, architecture, ER and use case diagrams). Implementation in progress. |

---

## Team Info Box

| Photo | Name | Student ID | Role | GitHub |
|---|---|---|---|---|
| <img src="https://plain-apac-prod-public.komododecks.com/202611/16/ycVLTQggVgcgR1ygFYup/image.jpg" width="100" alt="Md Hanif Sheikh"/> | **Md Hanif Sheikh** | 11230321379 | Team Leader | [@hanif100391](https://github.com/hanif100391) |
| <img src="https://plain-apac-prod-public.komododecks.com/202611/16/wd2OiiKyWwJHzqct3nH9/image.webp" width="100" alt="Md Shinha Sarder"/> | **Md Shinha Sarder** | 11230321372 | Member | [@md-shinha-sarder](https://github.com/md-shinha-sarder) |
| <img src="https://plain-apac-prod-public.komododecks.com/202611/16/piNxvE007q3fC6GIcRAl/image.jpg" width="100" alt="Md Haris Sheikh"/> | **Md Haris Sheikh** | 11230321378 | Member | [@harisbd202-lang](https://github.com/harisbd202-lang) |

---

## Overview

Farmers often notice spots, discolouration or wilting on their crops but cannot tell quickly whether it is a disease, a pest or a nutrient problem. Many diseases look alike, and an agricultural expert is not always nearby. Some farmers end up guessing and spraying pesticides that were never needed.

The AI-Powered Smart Agriculture Assistant gives a quick first opinion. A user uploads or captures a photo of a leaf and selects the crop. The system analyses the image with a multimodal AI model and returns:

- a likely disease, or a healthy result
- a confidence level
- a short, plain-language explanation of the visible symptoms
- prevention and care tips from a curated Bangladeshi crop knowledge base

The app also offers fertilizer, watering and cultivation guidance, a farming chat assistant, and a saved diagnosis history for registered users. The first version focuses on a limited set of crops commonly grown in Bangladesh.

**Why AI?** Many crop diseases have similar visual symptoms, and leaf colour, spot patterns, lighting and backgrounds vary a lot. A fixed rule-based program struggles with this. A multimodal AI model can read the photo and explain what it sees. The app combines the AI result with a curated local knowledge base so the guidance stays relevant. Because AI can be wrong, every result shows a confidence level.

---

## Features

- **Leaf photo upload or camera capture** with crop selection
- **AI-based disease detection** (likely disease or healthy result)
- **Confidence level** shown with every result
- **Symptom explanation** in simple language
- **Prevention and care tips** from the knowledge base
- **Farming recommendations:** fertilizer, watering and cultivation guidance
- **Farming chat assistant** for common questions (Bangla or English)
- **Diagnosis history:** save, view and delete past diagnoses (registered users)
- **Bangla and English interface**
- **Low-confidence guidance:** advises seeing a local agricultural extension officer
- **Guest mode:** try a diagnosis without an account (results are not saved)
- **Admin area:** manage crops, diseases, tips and user accounts

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React (or Next.js), Tailwind CSS |
| Backend | Node.js, Express.js |
| Authentication | JWT, bcrypt |
| API | REST APIs (JSON over HTTPS) |
| Database | PostgreSQL |
| Image Storage | Supabase Storage or Cloudinary |
| AI and Image Analysis | OpenRouter API or Google Gemini API (multimodal) |
| Knowledge Base | Curated seed database of Bangladeshi crops and diseases |

> The frontend framework (React or Next.js), the image-storage service (Supabase Storage or Cloudinary) and the AI API (OpenRouter or Gemini) are alternatives still under consideration. The backend calls only one AI API at a time.

---

## System Architecture

The system has three layers: a web frontend, a Node.js/Express backend, and a data layer with external services.

```mermaid
flowchart TB
    subgraph Users
        G[Guest]
        U[Registered User - Farmer]
        A[Admin]
    end

    subgraph Frontend["Presentation Layer - React / Next.js + Tailwind CSS"]
        F1[Photo Upload / Camera]
        F2[Crop Selection]
        F3[Result View]
        F4[Farming Chat]
        F5[Diagnosis History]
        F6[Bangla / English UI]
        F7[Admin Panel]
    end

    subgraph Backend["Application Layer - Node.js + Express.js"]
        B1[Auth Service<br/>JWT, bcrypt]
        B2[Diagnosis Service]
        B3[Recommendation Service]
        B4[Chat Service]
        B5[History Service]
        B6[Admin Service]
    end

    subgraph Data["Data Layer and External Services"]
        D1[(PostgreSQL)]
        D2[Image Storage<br/>Supabase or Cloudinary]
        D3{{OpenRouter API<br/>or Gemini API}}
    end

    G --> Frontend
    U --> Frontend
    A --> Frontend
    Frontend <-->|HTTPS - REST API - JWT| Backend
    Backend <-->|SQL queries| D1
    Backend <-->|upload / fetch photos| D2
    Backend <-->|image + crop to result| D3
```

---

## How a Diagnosis Works

1. The user chooses a crop and uploads or captures a leaf photo.
2. The frontend sends the photo and crop name to the Express REST API over HTTPS (logged-in users also send their JWT).
3. The Diagnosis Service checks the file type and size, then stores the photo in image storage.
4. The service sends the photo and crop name to the AI API (OpenRouter or Gemini).
5. The AI model returns a likely disease or healthy result, a confidence level and a symptom description.
6. The Recommendation Service matches the result with the knowledge base in PostgreSQL and adds prevention and care tips. If confidence is low, it adds advice to see a local agricultural extension officer.
7. The backend returns the full result to the frontend.
8. If the user is registered and presses **Save**, the History Service stores the record in PostgreSQL.

---

## Database Design (ER Diagram)

The database is PostgreSQL with five tables.

```mermaid
erDiagram
    users ||--o{ diagnoses : saves
    crops ||--o{ diagnoses : "analysed for"
    crops ||--|{ diseases : has
    diseases |o--o{ diagnoses : "detected as"
    crops ||--o{ care_tips : "has general tips"
    diseases |o--o{ care_tips : "has tips"

    users {
        serial user_id PK
        varchar name
        varchar email UK
        varchar password_hash
        varchar role "user or admin"
        varchar preferred_language "bn or en"
        boolean is_active
        timestamp created_at
    }
    crops {
        serial crop_id PK
        varchar name_en
        varchar name_bn
        timestamp created_at
    }
    diseases {
        serial disease_id PK
        int crop_id FK
        varchar name_en
        varchar name_bn
        text symptoms_en
        text symptoms_bn
    }
    diagnoses {
        serial diagnosis_id PK
        int user_id FK
        int crop_id FK
        int disease_id FK "NULL when healthy"
        text image_url
        boolean is_healthy
        decimal confidence
        text symptom_summary
        timestamp created_at
    }
    care_tips {
        serial tip_id PK
        int crop_id FK
        int disease_id FK "NULL for general crop tips"
        varchar tip_type
        text content_en
        text content_bn
    }
```

**Notes**

- Guest diagnoses are not stored (FR-18), so only registered users have rows in `diagnoses`.
- `image_url` points to the photo in Supabase Storage or Cloudinary.
- `diagnoses.disease_id` is `NULL` when the plant is healthy.
- `care_tips.disease_id` is `NULL` for general crop tips (fertilizer, watering, cultivation, FR-19).
- Passwords are stored as bcrypt hashes (NFR-04).

---

## User Roles and Use Cases

| Role | What they can do |
|---|---|
| **Guest** | Switch language, view crop guidance, diagnose a leaf (not saved), ask the chat assistant, register |
| **Registered User (Farmer)** | Everything a guest can do, plus log in/out, manage profile, save diagnoses, view and delete diagnosis history |
| **Admin** | Log in, manage the knowledge base (crops, diseases, symptoms, tips), manage user accounts, view usage statistics |
| **AI Service** *(external system)* | OpenRouter / Gemini. Analyses leaf images and answers chat questions |

**Main use cases**

| ID | Use case | Actor |
|---|---|---|
| UC-01 | User Registration | Guest |
| UC-02 | User Login | Registered User, Admin |
| UC-03 | Diagnose a Leaf *(includes: select crop, upload/capture photo, validate image, analyze with AI, show result and care tips)* | Guest, Registered User |
| UC-04 | Handle a Low-Confidence Result *(extends Diagnose a Leaf)* | Guest, Registered User |
| UC-05 | Ask the Chat Assistant | Guest, Registered User |
| UC-06 | Save a Diagnosis | Registered User |
| UC-07 | View and Delete Diagnosis History | Registered User |
| UC-08 | Update the Knowledge Base | Admin |

---

## Requirements Summary

The full list is in the [SRS](docs/CSE4104-7E-T11_SRS.pdf). Here is a short summary.

### Functional requirements (FR-01 to FR-30)

| Area | Requirements |
|---|---|
| Account management | FR-01 to FR-05: register, validate, log in, log out, update profile |
| Leaf diagnosis | FR-06 to FR-18: upload or capture photo, choose crop, validate image, call AI, show disease or healthy result, confidence, symptoms, care tips, low-confidence advice, no chemical dosages, AI-down handling, guest diagnosis |
| Recommendations and chat | FR-19 to FR-22: fertilizer, watering and cultivation tips, chat assistant, replies in the user's language, expert referral |
| Diagnosis history | FR-23 to FR-26: save, list, open and delete diagnoses |
| Language | FR-27: switch between Bangla and English |
| Administration | FR-28 to FR-30: manage knowledge base, manage users, view usage numbers |

### Non-functional requirements (NFR-01 to NFR-18)

| Area | Targets |
|---|---|
| Performance | Pages load in 3 s or less; diagnosis returned within 15 s; photos shrunk in the browser before upload |
| Security and privacy | bcrypt password hashing, JWT sessions, HTTPS only, users see only their own diagnoses, API keys kept on the server |
| Usability | Responsive on phone and desktop, simple first-time use, full Bangla and English support, works in current Chrome, Firefox, Edge and Safari |
| Reliability and safety | Confidence level and "early information" reminder on every result; the rest of the app keeps working if the AI or storage service is down |
| Maintainability and scalability | Crops, diseases and tips live in the database, clear frontend / backend / data layers, design handles growing data |

---

## Planned REST API

> These endpoints are the planned design and may change during development.

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Create an account | Public |
| POST | `/api/auth/login` | Log in and receive a JWT | Public |
| GET / PUT | `/api/users/me` | View or update own profile | User |
| GET | `/api/crops` | List supported crops | Public |
| GET | `/api/crops/:id/tips` | Fertilizer, watering and cultivation tips | Public |
| POST | `/api/diagnoses/analyze` | Analyse a leaf photo (guests allowed) | Public |
| POST | `/api/diagnoses` | Save a diagnosis | User |
| GET | `/api/diagnoses` | List own saved diagnoses | User |
| GET | `/api/diagnoses/:id` | View one saved diagnosis | User |
| DELETE | `/api/diagnoses/:id` | Delete a saved diagnosis and its photo | User |
| POST | `/api/chat` | Ask the farming chat assistant | Public |
| CRUD | `/api/admin/crops`, `/diseases`, `/tips` | Manage the knowledge base | Admin |
| GET / PATCH | `/api/admin/users` | List users, deactivate an account | Admin |
| GET | `/api/admin/stats` | Basic usage numbers | Admin |

---

## Project Structure

> Planned layout. It will be updated as the code is added.

```text
AI-Powered-Smart-Agriculture-Assistant/
├── client/                 # React / Next.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── i18n/           # Bangla and English text
│   │   └── services/       # API calls
│   └── package.json
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/       # auth, diagnosis, recommendation, chat, history, admin
│   │   ├── middleware/     # JWT check, validation, upload
│   │   ├── db/             # schema, migrations, seed data
│   │   └── config/
│   └── package.json
├── docs/                   # SRS, architecture, ER and use case diagrams
└── README.md
```

---

## Getting Started

> Setup steps below are a template. Adjust folder names and commands to match the final code.

### Prerequisites

- Node.js 18 or newer
- PostgreSQL 14 or newer
- An API key for **OpenRouter** or **Google Gemini**
- A **Supabase** or **Cloudinary** account for image storage

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/md-shinha-sarder/AI-Powered-Smart-Agriculture-Assistant.git
cd AI-Powered-Smart-Agriculture-Assistant

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### Environment variables

Create a `.env` file in `server/` (never commit it):

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/agri_assistant
JWT_SECRET=change_this_to_a_long_random_string

# AI provider: "openrouter" or "gemini"
AI_PROVIDER=gemini
OPENROUTER_API_KEY=your_openrouter_key
GEMINI_API_KEY=your_gemini_key

# Image storage: use the one you choose
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CLOUDINARY_URL=cloudinary://key:secret@cloud_name
```

### Run the project

```bash
# Create tables and load the seed knowledge base
cd server
npm run db:migrate
npm run db:seed

# Start the backend
npm run dev

# In a second terminal, start the frontend
cd ../client
npm run dev
```

---

## Project Documents

| Document | File |
|---|---|
| Software Requirements Specification (SRS) | [docs/CSE4104-7E-T11_SRS.pdf](docs/CSE4104-7E-T11_SRS.pdf) |
| System Architecture Diagram | [docs/CSE4104-7E-T11_ArchitectureDiagram.pdf](docs/CSE4104-7E-T11_ArchitectureDiagram.pdf) |
| ER Diagram | [docs/CSE4104-7E-T11_ErDiagram.pdf](docs/CSE4104-7E-T11_ErDiagram.pdf) |
| Use Case Diagram | [docs/CSE4104-7E-T11_UseCaseDiagram.pdf](docs/CSE4104-7E-T11_UseCaseDiagram.pdf) |

---

## Scope and Limitations

- The first version supports a limited selection of crops and diseases.
- The application is an early-information and guidance tool. It does not replace professional agricultural diagnosis.
- It does **not** provide chemical or pesticide dosages.
- Unclear images or low-confidence results should be checked with a local agricultural extension officer.
- AI predictions can be wrong, and field photos with busy backgrounds or poor lighting can reduce accuracy.
- Not included in version 1: a native mobile app, online buying and selling, payments and weather forecasting.

---

## Project Plan

The project runs for 14 weeks.

| Weeks | Phase | Main deliverables |
|---|---|---|
| 1 - 2 | Planning and design | Proposal, UI designs, ER diagram, API list, GitHub repository |
| 3 - 4 | Foundation | Database schema, crop and disease seed data, authentication, page layout |
| 5 - 7 | Core features | Image upload, crop selection, image storage, diagnosis history |
| 8 - 11 | AI development and integration | AI API integration, result and confidence display, care tips, chat assistant, Bangla interface |
| 12 - 13 | Testing and deployment | Integration testing, accuracy checks, bug fixes, online deployment |
| 14 | Final delivery | Final report, presentation and live demo |

---

## Similar Systems and Research

| System / Research | What it does | Gap addressed by this project |
|---|---|---|
| Plantix | Photo-based crop diagnosis and treatment suggestions | Targets a smaller set of Bangladeshi crops and adds web-based diagnosis history and local learning content |
| YOLOv8 Bangladeshi crops study (Abid et al., 2024) | Detects diseases in five Bangladeshi crops | Adds a farmer-focused workflow, Bangla explanations and care tips |
| PlantVillage (Mohanty et al., 2016) | Public leaf-image dataset for training models | Builds an application with user accounts, diagnosis history and guidance |
| PlantDoc (Singh et al., 2020) | Dataset with real-world field backgrounds | Builds a usable web app and warns that field-photo conditions can reduce accuracy |
| GreenAid (2026) | Deep-learning detection with a dashboard and chatbot | Scoped prototype with local crops and a Bangladesh-focused knowledge base |

---

## References

1. Plantix. *Crop Diagnosis and Treatments*. https://plantix.net/en/
2. Abid, Z., et al. (2024). *Bangladeshi crops leaf disease detection using YOLOv8*. Heliyon, 10(18), e36694.
3. Mohanty, S. P., Hughes, D. P., & Salathé, M. (2016). *Using deep learning for image-based plant disease detection*. Frontiers in Plant Science, 7, 1419.
4. Singh, D., et al. (2020). *PlantDoc: A dataset for visual plant disease detection*. https://github.com/pratikkayal/PlantDoc-Dataset
5. *GreenAid: a confidence-weighted ensemble deep learning system for real-time plant disease detection and management*. Scientific Reports (2026).

---

<p align="center">
  Team <b>CSE4104-7E-T11</b> &nbsp;|&nbsp; CSE 4104 – Software Development III &nbsp;|&nbsp; Northern University of Business and Technology Khulna
</p>
