import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { auth } from "../auth";
import { Doc } from "../_generated/dataModel";

const genJoinCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcedfghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
};

/**
 * 현재 로그인한 유저가 포함된 모든 그룹목록
 * @returns
 * groups : Doc<"groups">[]
 */
export const get = query({
  args: {},
  handler: async (context) => {
    // check auth
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }
    // find all belonging groups
    const members = await context.db
      .query("members")
      .withIndex("by_uid", (q) => q.eq("uid", uid))
      .collect();
    const groupIds = new Set(members.map((item) => item.groupId));

    // fetch groups by id
    const groups: Doc<"groups">[] = [];
    for (const groupId of groupIds) {
      const group = await context.db.get(groupId);
      if (group) {
        groups.push(group);
      }
    }
    return groups;
  },
});

/**
 * id를 사용해 그룹 조회
 * @args
 * groupId : Id<"groups">
 * @returns
 * group : Doc<"groups">
 */
export const getById = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (context, args) => {
    // check auth
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }
    // check whether Included in the Group
    const memebers = await context.db
      .query("members")
      .withIndex("by_uid_group", (q) =>
        q.eq("uid", uid).eq("groupId", args.groupId)
      )
      .unique();
    if (!memebers) {
      throw Error("can't access not included group");
    }
    return await context.db.get(args.groupId);
  },
});

/**
 * 그룹 생성하기
 * @args
 * title : string
 * @returns
 * groupId : Doc<"groups">
 */
export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (context, args) => {
    // check auth
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }

    // insert on groups table
    const groupId = await context.db.insert("groups", {
      ...args,
      uid,
      joinCode: genJoinCode(),
    });

    // insert on members table
    await context.db.insert("members", {
      uid,
      groupId,
      role: "host",
    });

    // return created group id
    return groupId;
  },
});

/**
 * 그룹명 수정하기
 * @args
 * title : string
 * @returns
 * groupId : Doc<"groups">
 */
export const edit = mutation({
  args: {
    groupId: v.id("groups"),
    title: v.string(),
  },
  handler: async (context, args) => {
    // check auth
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }

    // find on current user on members table
    const member = await context.db
      .query("members")
      .withIndex("by_uid_group", (q) =>
        q.eq("uid", uid).eq("groupId", args.groupId)
      )
      .unique();

    if (!member) {
      throw Error("no member founded");
    } else if (member.role !== "host") {
      throw Error("not granted");
    }

    // update
    await context.db.patch(args.groupId, {
      title: args.title,
    });

    return args.groupId;
  },
});

/**
 * 그룹 삭제하기
 * @args
 * title : string
 * @returns
 * groupId : Doc<"groups">
 */
export const remove = mutation({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (context, args) => {
    // check auth
    const uid = await auth.getUserId(context);
    if (!uid) {
      throw new Error("UnAthorized");
    }

    // find on current user on members table
    const member = await context.db
      .query("members")
      .withIndex("by_uid_group", (q) =>
        q.eq("uid", uid).eq("groupId", args.groupId)
      )
      .unique();

    if (!member) {
      throw Error("no member founded");
    } else if (member.role !== "host") {
      throw Error("not granted");
    }

    const [members] = await Promise.all([
      context.db
        .query("members")
        .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
        .collect(),
    ]);

    // delete members
    for (const item of members) {
      await context.db.delete(item._id);
    }

    // delete group
    await context.db.delete(args.groupId);

    return args.groupId;
  },
});
