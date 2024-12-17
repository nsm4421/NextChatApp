import { v } from "convex/values";
import { query } from "../_generated/server";
import { auth } from "../auth";

/**
 * 채널 목록 조회하기
 * @args
 * groupId : Id<"groups">
 * @returns
 * channels : Doc<"channels">
 */
export const get = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (context, args) => {
    const uid = await auth.getUserId(context);
    if (!uid) {
      return [];
    }
    const member = await context.db
      .query("members")
      .withIndex("by_uid_group", (q) =>
        q.eq("uid", uid).eq("groupId", args.groupId)
      )
      .unique();
    if (!member) {
      return [];
    }
    return await context.db
      .query("channels")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();
  },
});
