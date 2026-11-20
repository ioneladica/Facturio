import { CreditPackAccessor } from "../accessors/CreditPackAccessor";
import {
  creditPackToPrismaData,
  creditPackToViewModel,
  validateCreditPack,
} from "../models/CreditPackViewModel";
import type {
  CreditPackErrors,
  CreditPackViewModel,
} from "../models/CreditPackViewModel";

export type CreditPackPostResult = {
  ok: boolean;
  errors: CreditPackErrors;
  values: CreditPackViewModel;
};

function readFormValues(formData: FormData): CreditPackViewModel {
  const readString = (name: string) => String(formData.get(name) ?? "");
  const readNumber = (name: string) => Number(readString(name));

  return {
    name: readString("name"),
    description: readString("description"),
    credits: readNumber("credits"),
    price: readNumber("price"),
    isActive: formData.get("isActive") === "on",
  };
}

export class CreditPacksController {
  private readonly accessor = new CreditPackAccessor();

  async index(): Promise<CreditPackViewModel[]> {
    const packs = await this.accessor.getAll();
    return packs.map(creditPackToViewModel);
  }

  async details(id: string): Promise<CreditPackViewModel | null> {
    const pack = await this.accessor.getById(id);
    return pack ? creditPackToViewModel(pack) : null;
  }

  createGet(): CreditPackViewModel {
    return {
      name: "",
      description: "",
      credits: 0,
      price: 0,
      isActive: true,
    };
  }

  async createPost(formData: FormData): Promise<CreditPackPostResult> {
    const values = readFormValues(formData);
    const errors = validateCreditPack(values);
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, values };
    }

    await this.accessor.add(creditPackToPrismaData(values));
    return { ok: true, errors: {}, values };
  }

  async editGet(id: string): Promise<CreditPackViewModel | null> {
    return this.details(id);
  }

  async editPost(
    id: string,
    formData: FormData,
  ): Promise<CreditPackPostResult> {
    const values = readFormValues(formData);
    const errors = validateCreditPack(values);
    if (Object.keys(errors).length > 0) {
      return { ok: false, errors, values };
    }

    await this.accessor.update(id, creditPackToPrismaData(values));
    return { ok: true, errors: {}, values };
  }

  async delete(id: string): Promise<void> {
    await this.accessor.remove(id);
  }
}
