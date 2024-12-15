import { auth } from "../auth";
import { query } from "../_generated/server";

export const current = query({
  args: {},
  handler: async (context) => {
    const uid = await auth.getUserId(context);
    return uid == null ? null : await context.db.get(uid);
  },
});
