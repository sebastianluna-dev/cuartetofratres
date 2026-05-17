import type { CollectionConfig } from "payload";
import { isAdmin, isAdminFieldAccess, isAdminOrSelf } from "@/lib/payload/access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: { singular: "Usuario", plural: "Usuarios" },
  admin: {
    useAsTitle: "email",
    group: "Administración",
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // Only an admin can change roles: an editor cannot promote themselves.
        update: isAdminFieldAccess,
      },
    },
  ],
};
