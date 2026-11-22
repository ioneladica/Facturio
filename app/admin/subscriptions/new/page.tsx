"use client";

import SubscriptionForm from "../../../../components/admin/SubscriptionForm";

export default function NewSubscriptionPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Abonamente utilizatori</p>
          <h1>Abonament nou</h1>
          <p className="muted">
            Asociază un utilizator unui plan prin cheia străină planId.
          </p>
        </div>
      </div>
      <SubscriptionForm />
    </section>
  );
}
