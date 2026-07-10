# Aftermath X — Blacklinez Coaching

Production-minded foundation for a premium online physique coaching platform built with Next.js App Router, TypeScript, Netlify Identity, Netlify Database, Drizzle ORM, Tailwind CSS, React Hook Form, and Zod.

## Architecture

- `app/(marketing)` contains public acquisition, pricing, and authentication routes.
- `app/(coach)` contains role-protected coach and admin operations.
- `app/(client)` contains the mobile-first athlete experience.
- `components` contains shared design-system, navigation, authentication, and dashboard primitives.
- `db/schema.ts` defines the durable PostgreSQL domain model; generated migrations live in `netlify/database/migrations`.
- `netlify/functions/identity.mts` assigns the safe default `client` role at signup.
- `netlify.toml` adds CDN-level role restrictions as defense in depth; layouts also enforce authorization server-side.

## Data Model

The schema separates reusable program templates from athlete-assigned program snapshots, preserves workout and check-in history, and explicitly models coaching relationships, subscriptions, progress data, habits, messages, and private notes.

## Route Map

Public: `/`, `/pricing`, `/login`, `/signup`

Coach/admin: `/dashboard`, `/clients`, `/clients/[id]`, `/programs`, `/programs/new`, `/programs/[id]`, `/check-ins`, `/messages`, `/exercise-library`, `/analytics`, `/billing`, `/settings`

Client: `/app`, `/app/workouts`, `/app/workouts/[id]`, `/app/check-ins`, `/app/progress`, `/app/habits`, `/app/messages`, `/app/settings`

## Local Development

Use `netlify dev --port 8889` so Identity and Netlify platform features are available locally. Create the first admin through the Netlify Identity dashboard and assign the `admin` role. New public signups receive the `client` role automatically.

## Configuration

Coaching is a single $100/month plan (`lib/stripe/config.ts`). The Stripe **publishable** key is committed there (it is public by design). To take live payments, set these server-only environment variables in the Netlify dashboard:

- `STRIPE_SECRET_KEY` — used by the checkout and webhook functions.
- `STRIPE_WEBHOOK_SECRET` — from the Stripe webhook endpoint pointed at `/.netlify/functions/stripe-webhook`.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — optional override for the committed publishable key.

Until `STRIPE_SECRET_KEY` is present the checkout gracefully reports that billing is not yet configured; nothing else breaks.

## Admin

Users with the `admin` role see an **Admin** entry in the coach console (`/admin`). It manages roles across all Identity users, suspends accounts, and reports platform revenue from the database.

## Implementation Order

1. Foundation: schema, migrations, Identity, authorization, layouts, public site.
2. Core operations: persisted dashboards, onboarding, profiles, and settings.
3. Training: exercise CRUD, program builder, assignment, and workout log writes.
4. Coaching loop: check-in submission/review, progress entries, and photo storage.
5. Engagement: habit writes and coach-client message threads.
6. Revenue: Stripe checkout, webhook synchronization, and subscription controls.
