import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ToastContainer } from "@/app/[locale]/(utils)/(components)/Toast";
import StyledComponentsRegistry from "@/app/lib/styled-components-registry";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Miquel Gómez Corral | Portfolio",
  description:
    "Personal web portfolio of Miquel Gómez Corral showcasing projects, skills, and experience.",
  keywords: [
    "Portfolio",
    "CV",
    "Miquel Gómez Corral",
    "Miquel",
    "Miquel Gómez",
    "Web Developer",
    "Software Engineer",
    "Aritficial intelligence",
    "Machine learning",
  ],
  authors: [{ name: "Miquel Gómez Corral" }],
  openGraph: {
    title: "Miquel Gómez Corral | Portfolio",
    description:
      "Personal web portfolio of Miquel Gómez Corral showcasing projects, skills, and experience.",
    url: "https://miquelgc-portfolio.vercel.app/", // Replace with your actual URL
    siteName: "Miquel Gómez Corral Portfolio",
    type: "website",
    images: [
      {
        url: "https://miquelgc-portfolio.vercel.app/assets/projects/Portfolio (6).webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Miquel Gómez Corral Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miquel Gómez Corral | Portfolio",
    description:
      "Personal web portfolio of Miquel Gómez Corral showcasing projects, skills, and experience.",
    images: ["https://miquelgc-portfolio.vercel.app/assets/projects/Portfolio (6).webp"],
  },
  icons: {
    icon: "/assets/Yo_circle_ico.ico",
    shortcut: "/assets/Yo_circle_ico.ico",
  },
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full pt-32 gap-20 flex flex-col justify-center items-center bg-miquel-background text-miquel-white-200`}
      >
        <StyledComponentsRegistry>
          {children}
          <ToastContainer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}