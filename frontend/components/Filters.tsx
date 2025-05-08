"use client";

import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { FilterOptions } from "@/types/Doctor";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
}

const FilterSection = ({
  title,
  isOpen,
  toggleOpen,
  children,
}: FilterSectionProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default function Filters() {
  const [isGenderOpen, setIsGenderOpen] = useState(true);
  const [isSpecializationOpen, setIsSpecializationOpen] = useState(true);
  const [isFeesOpen, setIsFeesOpen] = useState(true);
  const [isLanguageOpen, setIsLanguageOpen] = useState(true);
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    languages: [],
    specializations: [],
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filter state from URL params
  const [filters, setFilters] = useState({
    gender: searchParams.get("gender") || "",
    specialization: searchParams.get("specialization") || "",
    fees: searchParams.getAll("fees") || [],
    language: searchParams.get("language") || "",
    experience: searchParams.getAll("experience") || [],
  });

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      gender: searchParams.get("gender") || "",
      specialization: searchParams.get("specialization") || "",
      fees: searchParams.getAll("fees") || [],
      language: searchParams.get("language") || "",
      experience: searchParams.getAll("experience") || [],
    });
  }, [searchParams]);

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}`);
        setFilterOptions(response.data.filters);
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (
    key: string,
    value: string | string[],
    isArray = false
  ) => {
    let newFilters;

    if (isArray && Array.isArray(value)) {
      // Handle array values (checkboxes)
      newFilters = {
        ...filters,
        [key]: value,
      };
    } else if (isArray && typeof value === "string") {
      // Handle toggling individual array values
      const currentValues = filters[key as keyof typeof filters] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      newFilters = {
        ...filters,
        [key]: newValues,
      };
    } else {
      // Handle single values (radio buttons)
      newFilters = {
        ...filters,
        [key]: value,
      };
    }

    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters = filters) => {
    const params = new URLSearchParams();

    // Add non-empty filters to params
    if (currentFilters.gender) params.set("gender", currentFilters.gender);
    if (currentFilters.specialization)
      params.set("specialization", currentFilters.specialization);
    if (currentFilters.language)
      params.set("language", currentFilters.language);

    // Add array params (fees and experience)
    currentFilters.fees.forEach((fee) => {
      params.append("fees", fee);
    });

    currentFilters.experience.forEach((exp) => {
      params.append("experience", exp);
    });

    // Update the URL without reloading the page
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl, { scroll: false });

    // Close mobile filters if open
    setShowMobileFilters(false);
  };

  const resetFilters = () => {
    const emptyFilters = {
      gender: "",
      specialization: "",
      fees: [],
      language: "",
      experience: [],
    };

    setFilters(emptyFilters);
    router.push(window.location.pathname, { scroll: false });
    setShowMobileFilters(false);
  };

  const desktopFilters = (
    <div className="space-y-4">
      <FilterSection
        title="Gender"
        isOpen={isGenderOpen}
        toggleOpen={() => setIsGenderOpen(!isGenderOpen)}
      >
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={filters.gender === "male"}
              onChange={() => handleFilterChange("gender", "male")}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={filters.gender === "female"}
              onChange={() => handleFilterChange("gender", "female")}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">Female</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value=""
              checked={filters.gender === ""}
              onChange={() => handleFilterChange("gender", "")}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">All</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection
        title="Specialization"
        isOpen={isSpecializationOpen}
        toggleOpen={() => setIsSpecializationOpen(!isSpecializationOpen)}
      >
        <div className="space-y-2">
          {filterOptions.specializations.map((spec) => (
            <label key={spec} className="flex items-center">
              <input
                type="radio"
                name="specialization"
                value={spec}
                checked={filters.specialization === spec}
                onChange={() => handleFilterChange("specialization", spec)}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {spec.charAt(0).toUpperCase() + spec.slice(1).toLowerCase()}
              </span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="specialization"
              value=""
              checked={filters.specialization === ""}
              onChange={() => handleFilterChange("specialization", "")}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              All Specializations
            </span>
          </label>
        </div>
      </FilterSection>

      <FilterSection
        title="Consultation Fee"
        isOpen={isFeesOpen}
        toggleOpen={() => setIsFeesOpen(!isFeesOpen)}
      >
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.fees.includes("100-500")}
              onChange={() => handleFilterChange("fees", "100-500", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">₹100 - ₹500</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.fees.includes("500-1000")}
              onChange={() => handleFilterChange("fees", "500-1000", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">₹500 - ₹1,000</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.fees.includes("1000+")}
              onChange={() => handleFilterChange("fees", "1000+", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">₹1,000+</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection
        title="Experience"
        isOpen={isExperienceOpen}
        toggleOpen={() => setIsExperienceOpen(!isExperienceOpen)}
      >
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.experience.includes("0-5")}
              onChange={() => handleFilterChange("experience", "0-5", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">0-5 years</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.experience.includes("6-10")}
              onChange={() => handleFilterChange("experience", "6-10", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">6-10 years</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.experience.includes("10-15")}
              onChange={() => handleFilterChange("experience", "10-15", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">10-15 years</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.experience.includes("15+")}
              onChange={() => handleFilterChange("experience", "15+", true)}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">15+ years</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection
        title="Language"
        isOpen={isLanguageOpen}
        toggleOpen={() => setIsLanguageOpen(!isLanguageOpen)}
      >
        <div className="space-y-2">
          {filterOptions.languages.map((lang) => (
            <label key={lang} className="flex items-center">
              <input
                type="radio"
                name="language"
                value={lang}
                checked={filters.language === lang}
                onChange={() => handleFilterChange("language", lang)}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
              </span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="language"
              value=""
              checked={filters.language === ""}
              onChange={() => handleFilterChange("language", "")}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 text-sm text-gray-700">All Languages</span>
          </label>
        </div>
      </FilterSection>

      <div className="pt-4 space-y-2">
        <button
          onClick={resetFilters}
          className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Mobile filters */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {desktopFilters}
          </div>
        </div>
      )}

      {/* Desktop filters with fixed height and scrolling */}
      <div className="hidden lg:block sticky top-24">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
        <div className="max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
          {desktopFilters}
        </div>
      </div>
    </>
  );
}
