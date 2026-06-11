import { APIError, type CollectionBeforeDeleteHook, type CollectionSlug } from "payload";

/**
 * `beforeDelete` hook that refuses to delete a document while another
 * collection still points at it through `field`. The database would either
 * cascade or null the relation quietly; here the editor gets told what to
 * reassign first.
 */
export function preventDeleteInUse(
  by: CollectionSlug,
  field: string,
  message: (count: number) => string,
): CollectionBeforeDeleteHook {
  return async ({ id, req }) => {
    const { totalDocs } = await req.payload.count({ collection: by, where: { [field]: { equals: id } }, req });
    if (totalDocs > 0) throw new APIError(message(totalDocs), 400);
  };
}
