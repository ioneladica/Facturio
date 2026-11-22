export type UserRole = "USER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  address: string;
  taxId: string;
};

export type UserInput = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  address: string;
  taxId: string;
  password?: string;
};
