/**
 * Layout of the public pages (landing, search, FAQ, support).
 * Header and Footer are placeholders owned by other tasks.
 */

import { Outlet } from "react-router-dom";

import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";

import "@/styles/public-pages.css";

export default function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background-page text-text-primary">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
