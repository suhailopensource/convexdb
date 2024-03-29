import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGroup = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authenticated user");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      throw new Error("User not stored in database.");
    }

    const groupId = await ctx.db.insert("groups", {
      name: args.name!,
      ownerId: user._id!,
    });

    const userGroup = await ctx.db.insert("userGroups", {
      userId: user._id,
      groupId: groupId,
    });

    return groupId;
  },
});

export const listGroups = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authenticated user");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      throw new Error("User not stored in database.");
    }

    // now get all groups that this user belongs to
    const userGroups = await ctx.db
      .query("userGroups")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // now get all groups that this user belongs to
    const groups = userGroups.map(async (userGroup) => {
      const group = await ctx.db.get(userGroup.groupId);
      return group;
    });

    const resolvedGroups = await Promise.all(groups);
    const filteredGroups = resolvedGroups.filter(
      (group) => group !== null
    ) as Doc<"groups">[];

    return filteredGroups;
  },
});
