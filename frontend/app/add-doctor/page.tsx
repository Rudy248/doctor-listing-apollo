import type { Metadata } from "next";
import AddDoctorForm from "@/components/AddDoctorForm";

export const metadata: Metadata = {
  title: "Add New Doctor | Apollo 247 Clone",
  description:
    "Add a new doctor to our platform. Fill in the doctor details including specialization, experience, and fees.",
};

export default function AddDoctorPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Add New Doctor
        </h1>
        <AddDoctorForm />
      </div>
    </main>
  );
}
