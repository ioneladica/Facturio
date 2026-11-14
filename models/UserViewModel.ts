import type { User } from "@prisma/client";

export const USER_ROLES = ["USER", "ADMIN"] as const;
export const USER_STATUSES = ["ACTIVE", "INACTIVE"] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];

export type UserViewModel = {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  address: string;
  taxId: string;
};

export type UserErrors = Partial<Record<keyof UserViewModel, string>>;

export function validateUser(values: UserViewModel): UserErrors {
  const errors: UserErrors = {};
  if (!values.name.trim()) errors.name = "Numele este obligatoriu.";
  if (!values.email.trim() || !values.email.includes("@")) {
    errors.email = "Introdu o adresă de email validă.";
  }
  if (!USER_ROLES.includes(values.role)) errors.role = "Rol invalid.";
  if (!USER_STATUSES.includes(values.status)) errors.status = "Status invalid.";
  return errors;
}

export function userToViewModel(user: User): UserViewModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as UserRole,
    status: user.status as UserStatus,
    phone: user.phone ?? "",
    address: user.address ?? "",
    taxId: user.taxId ?? "",
  };
}
