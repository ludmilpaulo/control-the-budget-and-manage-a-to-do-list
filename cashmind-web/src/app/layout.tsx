import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloProviderWrapper } from "@/lib/apollo-provider";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashMind - Budget & Task Manager",
  description: "Manage your budget and tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProviderWrapper>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Navigation />
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
          </div>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
