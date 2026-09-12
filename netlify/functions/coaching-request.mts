import { db } from "../../db";
import { coachingRequests } from "../../db/schema";
import { getUser, admin, AuthError } from "@netlify/identity";

// Receives coaching applications from the public pricing page popup, stores
// them in the coaching_requests table, and provisions a Netlify Identity
// account (default `client` role via the identity event function) so the
// applicant can sign in immediately. If the email already has an account, the
// application is still saved and linked to that existing user — no error is
// shown for duplicates, and no information about account existence leaks.
type Payload = {
  name?: string;
  email: string;
  password: string;
  age?: number;
  sex?: string;
  bodyweightKg?: number;
  goals: string;
};

const handler = async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const goals = payload.goals?.trim();
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password;

  if (!goals) {
    return Response.json({ error: "Tell us your goals so the coach can review your application." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return Response.json({ error: "A password of at least 8 characters is required." }, { status: 400 });
  }

  const age = Number(payload.age);
  const bodyweight = Number(payload.bodyweightKg);
  const sex = payload.sex?.toLowerCase();

  if (payload.age !== undefined && (!Number.isFinite(age) || age < 13 || age > 100)) {
    return Response.json({ error: "Age must be between 13 and 100." }, { status: 400 });
  }
  if (payload.bodyweightKg !== undefined && (!Number.isFinite(bodyweight) || bodyweight <= 0 || bodyweight > 500)) {
    return Response.json({ error: "Bodyweight looks off. Enter it in kilograms." }, { status: 400 });
  }
  if (sex && !["male", "female"].includes(sex)) {
    return Response.json({ error: "Invalid selection." }, { status: 400 });
  }

  // Link the request to the visitor's existing Identity account when they
  // happen to be signed in.
  const user = await getUser().catch(() => null);

  let applicationSaved = false;

  try {
    await db.insert(coachingRequests).values({
      name: payload.name?.trim() || user?.name || null,
      email: email || user?.email || null,
      age: payload.age !== undefined ? age : null,
      sex: sex || null,
      bodyweightKg: payload.bodyweightKg !== undefined ? bodyweight : null,
      goals,
      identityId: user?.id ?? null,
    });
    applicationSaved = true;
  } catch (err) {
    console.error("coaching-request insert failed:", err);
    return Response.json({ error: "Could not save the request. Please try again." }, { status: 500 });
  }

  // Provision the account. An existing account for the same email is treated as
  // success: the applicant simply signs in with their existing password.
  let accountCreated = false;
  try {
    const created = await admin.createUser({
      email,
      password,
      data: {
        user_metadata: payload.name?.trim() ? { full_name: payload.name.trim() } : undefined,
      },
    });
    accountCreated = Boolean(created?.id);
  } catch (err) {
    const duplicate =
      err instanceof AuthError && (err.status === 422 || /already registered/i.test(err.message));
    if (!duplicate) {
      console.error("identity account creation failed:", err);
      // The application itself was saved; don't fail the whole submission over
      // account provisioning. The coach can resolve accounts manually.
      return Response.json({
        ok: true,
        accountCreated: false,
        warning: "Application received, but the account could not be created automatically.",
      });
    }
  }

  return Response.json({ ok: applicationSaved, accountCreated });
};

export default handler;
