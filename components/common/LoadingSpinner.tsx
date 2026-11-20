"use client";

type LoadingSpinnerProps = {
  label?: string;
};

export default function LoadingSpinner({
  label = "Se încarcă...",
}: LoadingSpinnerProps) {
  return (
    <span className="muted" role="status" aria-live="polite">
      {label}
    </span>
  );
}
