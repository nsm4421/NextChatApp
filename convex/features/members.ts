import { v } from "convex/values";
import { query } from "../_generated/server";
import { auth } from "../auth";

/**
 * group id를 사용해 로그인 유저의 member 레코드 조회
 * @args
 * groupId : Id<"groups">
 * @returns
 * members : Doc<"members">
 */
export const getCurrentMember = query({
  args: { groupId: v.id("groups") },
  handler: async (context, args) => {
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw Error("UnAuthorized");
    }
    const members = await context.db
      .query("members")
      .withIndex("by_uid_group", (q) =>
        q.eq("uid", uid).eq("groupId", args.groupId)
      )
      .unique();
    return members;
  },
});
