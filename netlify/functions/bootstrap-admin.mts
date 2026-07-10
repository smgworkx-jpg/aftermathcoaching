import { admin } from "@netlify/identity";
import type { Context } from "@netlify/functions";

// One-time bootstrap for the very first admin account.
//
// Netlify Identity's first admin cannot be created from ordinary app code, so
// this server-only endpoint provisions it using the operator token that is
// automatically available inside Netlify Functions. It is intentionally safe to
// expose: it only acts while NO admin exists yet, and the password is read from
// the ADMIN_PASSWORD environment variable (never from the request), so a random
// visitor cannot set credentials they know or reset an existing admin.
//
// Configure ADMIN_PASSWORD (and optionally ADMIN_EMAIL) in
// Project configuration > Environment variables, then hit this endpoint once:
//   /.netlify/functions/bootstrap-admin
const DEFAULT_ADMIN_EMAIL = "Smgworkx@gmail.com";

function isAdmin(user: { roles?: string[]; role?: string }): boolean {
  return Boolean(user.roles?.includes("admin") || user.role === "admin");
}

export default async (_req: Request, _context: Context) => {
  const email = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return Response.json(
      { ok: false, message: "Set the ADMIN_PASSWORD environment variable, then reload this endpoint." },
      { status: 503 },
    );
  }

  let users;
  try {
    users = await admin.listUsers({ perPage: 200 });
  } catch {
    return Response.json(
      { ok: false, message: "Identity is not available yet. Ensure Identity is enabled on the deployed site." },
      { status: 503 },
    );
  }

  // Already bootstrapped — do nothing. This makes the endpoint idempotent and
  // removes any password-reset attack surface once an admin is live.
  if (users.some(isAdmin)) {
    return Response.json({ ok: true, message: "An admin already exists. Sign in at /login, then open /admin." });
  }

  const existing = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  try {
    if (existing) {
      // Promote and force-confirm an account that was signed up but never confirmed.
      await admin.updateUser(existing.id, {
        password,
        confirm: true,
        role: "admin",
        app_metadata: { ...(existing.appMetadata ?? {}), roles: ["admin"] },
      });
    } else {
      await admin.createUser({
        email,
        password,
        data: {
          role: "admin",
          app_metadata: { roles: ["admin"] },
          user_metadata: { full_name: "Administrator" },
        },
      });
    }
  } catch {
    return Response.json(
      { ok: false, message: "Could not provision the admin account. Check the function logs." },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    message: `Admin account ready for ${email}. Sign in at /login, then open /admin.`,
  });
};
