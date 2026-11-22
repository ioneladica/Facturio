import UserForm from "../../../../components/admin/UserForm";

export default function NewUserPage() {
  return (
    <section>
      <div className="page-header">
        <div><p className="muted">Administrare</p><h1>Utilizator nou</h1></div>
      </div>
      <UserForm initialValues={{
        name: "",
        email: "",
        role: "USER",
        status: "ACTIVE",
        phone: "",
        address: "",
        taxId: "",
      }} />
    </section>
  );
}
