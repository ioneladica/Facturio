"use client";

type DeleteButtonProps = {
  action: () => Promise<void>;
};

export default function DeleteButton({ action }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Sigur vrei să ștergi acest element?")) {
          event.preventDefault();
        }
      }}
    >
      <button className="delete-button" type="submit">Șterge</button>
    </form>
  );
}
