import type { Access, FieldAccess } from "payload";

export const isAdmin: Access = ({ req }) => req.user?.role === "admin";

export const isAdminFieldAccess: FieldAccess = ({ req }) => req.user?.role === "admin";

/** Any signed-in CMS user: the site has two roles and both edit content. */
export const isAdminOrEditor: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;

export const nobody: Access = () => false;

export const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false;
  if (req.user.role === "admin") return true;
  return { id: { equals: req.user.id } };
};
