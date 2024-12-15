import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  groups: defineTable({
    title: v.string(),
    uid: v.id("users"), // created by
    joinCode: v.string(),
  }).index("by_uid", ["uid"]),
  members: defineTable({
    uid: v.id("users"), // created by
    groupId: v.id("groups"),
    role: v.union(v.literal("host"), v.literal("guest")),
  })
    .index("by_uid", ["uid"])
    .index("by_group", ["groupId"])
    .index("by_uid_group", ["uid", "groupId"]),
});

export default schema;
