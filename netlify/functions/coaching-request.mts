import { db } from "../../db";
import { coachingRequests } from "../../db/schema";
import { getUser } from "@netlify/identity";

// Receives coaching applications from the public pricing page popup and stores
// them in the coaching_requests table. Fields other than goals are optional;
// signed-in visitors are linked to their Identity account when available.
type Payload = {
  name?: string;
  email?: string;
  age?: number;
  sex?: string;
  bodyweightKg?: number;
  goals?: string;
  identityId?: string;
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
  if (!goals) {
    return Response.json({ error: "Tell us your goals so the coach can review your application." }, { status: 400 });
  }

  const age = Number(payload.age);
  const bodyweight = Number(payload.bodyweightKg);
  const sex = payload.sex?.toLowerCase();
  const email = payload.email?.trim();

  if (payload.age !== undefined && (!Number.isFinite(age) || age < 13 || age > 100)) {
    return Response.json({ error: "Age must be between 13 and 100." }, { status: 400 });
  }
  if (payload.bodyweightKg !== undefined && (!Number.isFinite(bodyweight) || bodyweight <= 0 || bodyweight > 500)) {
    return Response.json({ error: "Bodyweight looks off. Enter it in kilograms." }, { status: 400 });
  }
  if (sex && !["male", "female"].includes(sex)) {
    return Response.json({ error: "Invalid selection." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  // Link the request to the visitor's Identity account when they happen to be
  // signed in; anonymous applications are fine too.
  const user = await getUser().catch(() => null);

  try {
    const [row] = await db
      .insert(coachingRequests)
      .values({
        name: payload.name?.trim() || user?.name || null,
        email: email || user?.email || null,
        age: payload.age !== undefined ? age : null,
        sex: sex || null,
        bodyweightKg: payload.bodyweightKg !== undefined ? bodyweight : null,
        goals,
        identityId: user?.id ?? null,
      })
      .returning({ id: coachingRequests.id });

    return Response.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("coaching-request insert failed:", err);
    return Response.json({ error: "Could not save the request. Please try again." }, { status: 500 });
  }
};

export default handler;
