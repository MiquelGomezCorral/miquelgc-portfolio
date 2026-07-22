import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice | MiquelGC Banking",
  description: "Privacy notice for MiquelGC Banking.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl">
      <article className="space-y-10 leading-7 text-miquel-white-500">
        <header className="space-y-3 border-b border-miquel-white-500-a pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-miquel-blue-200">MiquelGC Banking</p>
          <h1 className="text-4xl font-semibold tracking-tight text-miquel-white-200 sm:text-5xl">Privacy Notice</h1>
          <p>Last updated: July 22, 2026</p>
        </header>

        <p>This is a private, non-commercial application used exclusively by its owner for personal financial tracking.</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">Data processed</h2>
          <p>The application may retrieve:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Bank account identifiers</li>
            <li>Account balances</li>
            <li>Transaction history</li>
            <li>Bank connection and consent metadata</li>
          </ul>
          <p>Data is retrieved only from accounts explicitly authorised by the account owner through Enable Banking and the relevant bank.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">Purpose</h2>
          <p>The data is used exclusively for personal expense, income and account tracking.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">Sharing</h2>
          <p>Financial data is not sold or shared with unrelated third parties. Enable Banking and the relevant banks process data where necessary to provide the account-information connection.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">Storage</h2>
          <p>Data is stored on a private self-hosted server. The application is not available to the public.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">Retention and deletion</h2>
          <p>Data is retained while the application is in use and may be deleted by its owner at any time.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">Contact</h2>
          <p>For privacy-related matters: <a className="text-miquel-blue-200 underline underline-offset-4" href="mailto:privacy@miquelgc.net">privacy@miquelgc.net</a></p>
        </section>
      </article>
    </main>
  );
}
