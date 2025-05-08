import FiltersWrapper from "@/components/FiltersWrapper";
import DoctorsListWrapper from "@/components/DoctorsListWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "General Physicians & Internal Medicine Specialists | Apollo 247 Clone",
  description:
    "Consult with the best General Physicians and Internal Medicine specialists. Book appointments online or in-person.",
};

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <section className="mb-8">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            General Physician & Internal Medicine
          </h1>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FiltersWrapper />
        </div>
        <div className="lg:col-span-3">
          <DoctorsListWrapper />
        </div>
      </div>
    </main>
  );
}
