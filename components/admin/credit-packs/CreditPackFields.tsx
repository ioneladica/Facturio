"use client";

import type { CreditPackInput } from "../../../types/admin/creditPacks";
import FieldError from "../../common/FieldError";

export type CreditPackErrors = Partial<
  Record<keyof CreditPackInput, string>
>;

type CreditPackFieldsProps = {
  values: CreditPackInput;
  errors: CreditPackErrors;
  setField: <K extends keyof CreditPackInput>(
    field: K,
    value: CreditPackInput[K],
  ) => void;
};

export default function CreditPackFields({
  values,
  errors,
  setField,
}: CreditPackFieldsProps) {
  return (
    <>
      <label>
        Nume
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => setField("name", event.target.value)}
        />
        <FieldError error={errors.name} />
      </label>
      <label>
        Descriere
        <textarea
          name="description"
          value={values.description}
          onChange={(event) => setField("description", event.target.value)}
        />
        <FieldError error={errors.description} />
      </label>
      <label>
        Credite
        <input
          name="credits"
          type="number"
          step="1"
          min="1"
          value={values.credits}
          onChange={(event) => setField("credits", Number(event.target.value))}
        />
        <FieldError error={errors.credits} />
      </label>
      <label>
        Preț (RON)
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={values.price}
          onChange={(event) => setField("price", Number(event.target.value))}
        />
        <FieldError error={errors.price} />
      </label>
      <label className="checkbox-label">
        <input
          name="isActive"
          type="checkbox"
          checked={values.isActive}
          onChange={(event) => setField("isActive", event.target.checked)}
        />
        Activ
      </label>
    </>
  );
}
