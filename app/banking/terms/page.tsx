import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | MiquelGC Banking",
  description: "Terms of use for MiquelGC Banking.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl">
      <article className="space-y-10 leading-7 text-miquel-white-500">
        <header className="space-y-3 border-b border-miquel-white-500-a pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-miquel-blue-200">MiquelGC Banking</p>
          <h1 className="text-4xl font-semibold tracking-tight text-miquel-white-200 sm:text-5xl">Terms of Use</h1>
          <p>Last updated: July 22, 2026</p>
        </header>

        <p>MiquelGC Banking is a private, non-commercial application intended exclusively for use by its owner.</p>

        <p>The application provides read-only access to account information explicitly authorised through Enable Banking.</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-miquel-white-200">The application</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Is not offered as a public service</li>
            <li>Does not initiate or execute payments</li>
            <li>Does not provide financial advice</li>
            <li>May be modified, interrupted or discontinued at any time</li>
            <li>Is provided without guarantees of uninterrupted bank connectivity</li>
          </ul>
        </section>

        <p>Access by other users is not permitted.</p>

        <p>This is a terms-of-use page, not an open-source software licence.</p>
      </article>
    </main>
  );
}
