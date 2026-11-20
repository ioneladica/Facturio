"use client";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="field-error" role="alert">
      {message}
    </p>
  );
}
