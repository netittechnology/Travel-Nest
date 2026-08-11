export const UserRole = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
});

export const isAdmin = (role) =>
  role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;

export const isUser = (role) => role === UserRole.USER;

export const getHomePathByRole = (role) => {
  if (isAdmin(role)) return "/admin/dashboard";
  if (isUser(role)) return "/";
  return "/";
};
