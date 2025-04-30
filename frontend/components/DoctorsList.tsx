"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import type { Doctor } from "@/types/Doctor";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchParams = useSearchParams();

  const fetchDoctors = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      const gender = searchParams.get("gender") || "";
      const specialization = searchParams.get("specialization") || "";
      const feesMin = searchParams.get("fees_min") || "0";
      const feesMax = searchParams.get("fees_max") || "10000";
      const language = searchParams.get("language") || "";
      const experience = searchParams.getAll("experience") || [];
      const fees = searchParams.getAll("fees") || [];

      // Convert fees ranges to min-max values
      let minFee = 0;
      let maxFee = 10000;

      if (fees.length > 0) {
        fees.forEach((feeRange) => {
          if (feeRange === "100-500") {
            minFee = Math.max(minFee, 100);
            maxFee = Math.min(maxFee, 500);
          } else if (feeRange === "500-1000") {
            minFee = Math.max(minFee, 500);
            maxFee = Math.min(maxFee, 1000);
          } else if (feeRange === "1000+") {
            minFee = Math.max(minFee, 1000);
          }
        });
      }

      // Convert experience ranges to min-max values
      let minExp = 0;
      let maxExp = 100;

      if (experience.length > 0) {
        experience.forEach((expRange) => {
          if (expRange === "0-5") {
            maxExp = Math.min(maxExp, 5);
          } else if (expRange === "6-10") {
            minExp = Math.max(minExp, 6);
            maxExp = Math.min(maxExp, 10);
          } else if (expRange === "10-15") {
            minExp = Math.max(minExp, 10);
            maxExp = Math.min(maxExp, 15);
          } else if (expRange === "15+") {
            minExp = Math.max(minExp, 15);
          }
        });
      }

      const res = await axios.get(
        "http://localhost:8000/list-doctor-with-filter",
        {
          params: {
            page: pageNum,
            page_size: 9,
            gender,
            specialization,
            fees_min: minFee,
            fees_max: maxFee,
            language,
            experience_min: minExp,
            experience_max: maxExp,
          },
        }
      );

      if (pageNum === 1) {
        setDoctors(res.data.doctors);
      } else {
        setDoctors((prev) => [...prev, ...res.data.doctors]);
      }

      // If we received fewer results than requested, there are no more results
      setHasMore(res.data.doctors.length === 9);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
      setError("Failed to load doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchDoctors(1);
  }, [searchParams]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDoctors(nextPage);
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => fetchDoctors(1)}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {loading && page === 1 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">
            No doctors found matching your criteria.
          </p>
          <p className="text-gray-600 mt-2">Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </span>
                ) : (
                  "Load More Doctors"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
