import type { Metadata } from "next";
import { NavTabs } from "@/app/ui/nav-tabs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hurve-en",
  description: "Projects by Hurve-en.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-neutral-200 px-16">
          <NavTabs />
        </header>
        {children}
      </body>
    </html>
  );
}
