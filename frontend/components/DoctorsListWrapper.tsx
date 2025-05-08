"use client";

import dynamic from "next/dynamic";

const DoctorsList = dynamic(() => import("./DoctorsList"), {
  ssr: false,
  loading: () => <p>Loading doctors...</p>,
});

export default function DoctorsListWrapper() {
  return <DoctorsList />;
}
