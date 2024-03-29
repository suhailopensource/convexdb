import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    profileUrl: v.optional(v.string()),
    about: v.optional(v.string()),
    email: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),

  groups: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
  })
    .index("by_name", ["name"])
    .index("by_ownerId", ["ownerId"]),

  userGroups: defineTable({
    userId: v.id("users"),
    groupId: v.id("groups"),
  })
    .index("by_userId", ["userId"])
    .index("by_groupId", ["groupId"]),
  files: defineTable({
    storageId: v.id("_storage"),
  }).index("by_file", ["storageId"]),
  userFiles: defineTable({
    userId: v.id("users"),
    fileId: v.id("files"),
  })
    .index("by_file", ["fileId"])
    .index("by_user_file", ["userId", "fileId"])
    .index("by_user", ["userId"]),
});
