"use client";

type FieldErrorProps = {
  error?: string;
};

export default function FieldError({ error }: FieldErrorProps) {
  return error ? <p className="field-error">{error}</p> : null;
}
