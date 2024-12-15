import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { auth } from "../auth";

export const get = query({
  args: {},
  handler: async (context) => {
    return await context.db.query("groups").collect();
  },
});

export const getById = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (context, args) => {
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }
    // TODO : 해당 유저가 그룹 내에 속한 사람인지 검사하기
    return await context.db.get(args.groupId);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (context, args) => {
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }
    // TODO : 참여코드 만들기
    const joinCode = "test";
    return await context.db.insert("groups", {
      ...args,
      uid,
      joinCode,
    });
  },
});
