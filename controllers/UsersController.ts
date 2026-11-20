import { hashPassword } from "../lib/auth";
import { UserAccessor, UserData } from "../accessors/UserAccessor";
import {
  UserErrors,
  UserViewModel,
  userToViewModel,
  validateUser,
} from "../models/UserViewModel";

export type UserPostResult = {
  ok: boolean;
  errors: UserErrors;
  values: UserViewModel;
};

function readFormValues(formData: FormData): UserViewModel {
  const read = (name: string) => String(formData.get(name) ?? "");
  return {
    name: read("name"),
    email: read("email"),
    role: read("role") as UserViewModel["role"],
    status: read("status") as UserViewModel["status"],
    phone: read("phone"),
    address: read("address"),
    taxId: read("taxId"),
    password: read("password"),
  };
}

function toUserData(values: UserViewModel): UserData {
  return {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    role: values.role,
    status: values.status,
    phone: values.phone.trim() || null,
    address: values.address.trim() || null,
    taxId: values.taxId.trim() || null,
  };
}

function withoutPassword(values: UserViewModel): UserViewModel {
  const { password: _password, ...publicValues } = values;
  return publicValues;
}

export class UsersController {
  private readonly accessor = new UserAccessor();

  async index(): Promise<UserViewModel[]> {
    const users = await this.accessor.getAll();
    return users.map(userToViewModel);
  }

  async details(id: string): Promise<UserViewModel | null> {
    const user = await this.accessor.getById(id);
    return user ? userToViewModel(user) : null;
  }

  createGet(): UserViewModel {
    return {
      name: "",
      email: "",
      role: "USER",
      status: "ACTIVE",
      phone: "",
      address: "",
      taxId: "",
      password: "",
    };
  }

  async createPost(formData: FormData): Promise<UserPostResult> {
    const values = readFormValues(formData);
    const errors = validateUser(values, { requirePassword: true });
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, values: withoutPassword(values) };
    }

    await this.accessor.add({
      ...toUserData(values),
      passwordHash: await hashPassword(values.password ?? ""),
    });
    return { ok: true, errors: {}, values: withoutPassword(values) };
  }

  async editGet(id: string): Promise<UserViewModel | null> {
    return this.details(id);
  }

  async editPost(id: string, formData: FormData): Promise<UserPostResult> {
    const values = readFormValues(formData);
    const errors = validateUser(values);
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, values: withoutPassword(values) };
    }

    const data = toUserData(values);
    if (values.password) {
      data.passwordHash = await hashPassword(values.password);
    }
    await this.accessor.update(id, data);
    return { ok: true, errors: {}, values: withoutPassword(values) };
  }

  async delete(id: string): Promise<void> {
    await this.accessor.remove(id);
  }
}
