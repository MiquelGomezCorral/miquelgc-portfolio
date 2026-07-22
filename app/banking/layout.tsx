import type { ReactNode } from "react";
import "@/styles/globals.css";

export default function BankingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-miquel-background px-6 py-12 font-sans text-miquel-white-200 sm:px-10 sm:py-20">
        {children}
      </body>
    </html>
  );
}
