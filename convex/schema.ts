import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  groups: defineTable({
    title: v.string(),
    uid: v.id("users"),
    joinCode: v.string(),
  }),
});

export default schema;
