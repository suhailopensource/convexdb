import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// export const saveImageStorageId = mutation({
//   args: {
//     storageId: v.id("_storage"),
//     id: v.id("files"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new ConvexError("Unauthorized");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) {
//       throw new ConvexError("User not found.");
//     }

//     // Save the storageId to the database using `update`

//     return await ctx.db.patch(args.id, {
//       image: args.imageStorageId,
//     });
//   },
// });

export const saveStorageId = mutation({
  // You can customize these as you like
  args: {
    storageId: v.id("_storage"),
    // other args...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called selectGPT without authenticated user");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    // Save the storageId to the database using `insert`

    if (user === null) {
      throw new Error("User not stored in database.");
    }

    const file_id = await ctx.db.insert("files", {
      storageId: args.storageId,
    });

    ctx.db.insert("userFiles", {
      fileId: file_id,
      userId: user._id,
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const files = await ctx.db.query("files").collect();

    return Promise.all(
      files.map(async (file) => {
        let imageUrl: string | null = null;
        imageUrl = await ctx.storage.getUrl(file.storageId);
        return {
          imageUrl,
        };
      })
    );
  },
});
