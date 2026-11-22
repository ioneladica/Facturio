import PlanForm from "../../../../components/admin/PlanForm";

export default function NewPlanPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Planuri de abonament</p>
          <h1>Plan nou</h1>
          <p className="muted">
            Configurează prețul, perioada și limita de facturi.
          </p>
        </div>
      </div>
      <PlanForm
        initialValues={{
          name: "",
          description: "",
          price: 0,
          billingPeriod: "MONTHLY",
          invoiceLimit: 0,
          isDefault: false,
          isActive: true,
        }}
      />
    </section>
  );
}
