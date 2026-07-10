import type { UserSignupEvent } from "@netlify/functions";

const identityHandlers = {
  userSignup(event: UserSignupEvent) {
    return {
      user: {
        ...event.user,
        appMetadata: {
          ...event.user.appMetadata,
          roles: ["client"],
        },
      },
    };
  },
};

export default identityHandlers;
