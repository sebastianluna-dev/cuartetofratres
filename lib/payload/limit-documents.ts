import { APIError, type CollectionBeforeValidateHook, type CollectionSlug } from "payload";

/**
 * `beforeValidate` hook that refuses to create a document once a collection
 * holds `max` of them. The layout of some sections only fits so many items
 * (the repertoire tabs), and a hook is where the CMS can say so in words
 * instead of letting the page break quietly. Updates always pass.
 */
export function limitDocuments(collection: CollectionSlug, max: number, message: string): CollectionBeforeValidateHook {
  return async ({ operation, req }) => {
    if (operation !== "create") return;
    const { totalDocs } = await req.payload.count({ collection, req });
    if (totalDocs >= max) throw new APIError(message, 400);
  };
}
