import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gómez Corral, Miquel Porfolio web",
  description: "Personal web portfolio",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <html lang="en">
      <link rel="icon" type="image/ico" href="/assets/Tortuga_durisima_logo.ico" />
      <meta name="descripcion" content="Desripción de la página " />
      <title>Miquel Gómez Corral</title>
      <body className={inter.className +
        `h-screen w-full pt-32 gap-20 flex flex-col justify-center items-center 
      bg-miquel-background text-miquel-white-200`
      }>
        {children}
      </body>
    </html>
  );
}
