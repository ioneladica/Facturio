import CreditPackForm from "../../../../components/admin/CreditPackForm";

export default function NewCreditPackPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Administrare</p>
          <h1>Pachet de credite nou</h1>
          <p className="muted">
            Configurează creditele și prețul pachetului.
          </p>
        </div>
      </div>
      <CreditPackForm
        initialValues={{
          name: "",
          description: "",
          credits: 0,
          price: 0,
          isActive: true,
        }}
      />
    </section>
  );
}
