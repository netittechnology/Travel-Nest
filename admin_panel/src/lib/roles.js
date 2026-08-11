export const UserRole = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
});

// Admin role checks
export const isAnyAdmin = (role) =>
  role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;

export const isSuperAdmin = (role) => role === UserRole.SUPER_ADMIN;
export const isAdmin = (role) => role === UserRole.ADMIN;

// Destination route helper for Admin Panel
export const getHomePathByRole = (role) => {
  if (isAnyAdmin(role)) return "/admin/dashboard";
  return "/login";
};
