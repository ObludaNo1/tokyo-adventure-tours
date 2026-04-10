# Tokyo Adventure Tours – Copilot Instructions

## Project Overview
This is a full-stack web application for a tour company in Tokyo.

The goal is to replace a Squarespace website with a custom-built system optimized for:
- SEO performance
- Fast static content delivery
- Simple booking inquiry system (no payments in MVP)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form (for booking forms)

### Backend
- Rust
- Axum framework
- Tokio async runtime
- Serde for serialization

### Email
- Resend (preferred) or SendGrid

### Infrastructure (later phase)
- Vercel (frontend deployment)
- Fly.io or Railway (backend deployment)

---

## Architecture Principles

- Monorepo structure is required
- Frontend and backend are fully separated apps
- Shared types should live in `/packages/shared`
- Backend is API-only (no rendering)
- Frontend handles all UI and SEO rendering

---

## Monorepo Structure

Expected structure:
/apps
  /web → Next.js frontend
  /api → Rust Axum backend

/packages
  /shared → shared types, schemas, utilities

/infra → deployment configs (optional)


---

## Core Product Rules

### Booking System (MVP)
- Booking is a REQUEST system only
- No payments in MVP
- No real-time availability checking
- Users submit a form requesting a tour date

### Booking Flow
1. User selects a tour page
2. User fills booking form:
   - name
   - email
   - date
   - number of people
   - optional message
3. Backend sends email notification to admin
4. Optional confirmation email to user

---

## Backend Rules (Rust / Axum)

- Keep backend minimal and focused
- No business logic in frontend
- Validate all incoming requests strictly
- Do not introduce database in MVP phase
- Only required endpoint:

POST /api/bookings

Future endpoints (not in MVP):
- GET /api/bookings (admin)
- POST /api/tours
- authentication endpoints

---

## Frontend Rules (Next.js)

### SEO is a top priority

- Every tour must have its own page:
  `/tours/[slug]`
- Pages must be server-rendered or statically generated
- Metadata must be defined per page (title, description)
- Avoid client-side-only rendering for SEO pages

### Content requirements per tour page:
- Clear title optimized for search engines
- Long-form descriptive text
- Images optimized for performance
- Booking form embedded directly in page

---

## SEO Guidelines

- Prefer static generation wherever possible
- Use clean URL structure:
  - `/tours/asakusa-walking-tour`
  - `/tours/shibuya-night-tour`
- Ensure metadata is always present
- Avoid duplicate content across tour pages
- Include structured, human-readable descriptions

---

## API Contract Rules

- Frontend must NOT contain backend logic
- Backend defines the source of truth for booking schema
- Shared types must be used when possible

Example booking payload:

```json
{
  "tour_id": "string",
  "name": "string",
  "email": "string",
  "date": "YYYY-MM-DD",
  "people": number,
  "message": "string (optional)"
}