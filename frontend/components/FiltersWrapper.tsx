"use client";

import dynamic from "next/dynamic";

const Filters = dynamic(() => import("./Filters"), {
  ssr: false,
  loading: () => <p>Loading filters...</p>,
});

export default function FiltersWrapper() {
  return <Filters />;
}
