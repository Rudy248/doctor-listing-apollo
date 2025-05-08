"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  gender: string;
  specialization: string;
  experience: number;
  location: string;
  image_url: string;
  fees: number;
  language: string;
};

export default function AddDoctorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      // Automatically set image_url based on gender
      let imageUrl = "";
      if (data.gender === "male") {
        imageUrl =
          "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-1532.jpg";
      } else if (data.gender === "female") {
        imageUrl =
          "https://img.freepik.com/free-photo/portrait-smiling-female-doctor_171337-1532.jpg";
      }

      const finalData = {
        ...data,
        image_url: imageUrl,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-doctor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add doctor");
      }

      setSubmitSuccess(true);
      reset();

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setSubmitError("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          Doctor added successfully! Redirecting to home page...
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor Name*
            </label>
            <input
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Dr. John Doe"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender*
            </label>
            <select
              id="gender"
              {...register("gender", {
                required: "Gender is required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm">{errors.gender.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Specialization*
            </label>
            <input
              id="specialization"
              {...register("specialization", {
                required: "Specialization is required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="e.g. Internal Medicine, Cardiologist"
            />
            {errors.specialization && (
              <p className="text-red-600 text-sm">
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience (years)*
            </label>
            <input
              id="experience"
              type="number"
              {...register("experience", {
                required: "Experience is required",
                min: {
                  value: 0,
                  message: "Experience cannot be negative",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="10"
            />
            {errors.experience && (
              <p className="text-red-600 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location*
            </label>
            <input
              id="location"
              {...register("location", {
                required: "Location is required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Mumbai, Maharashtra"
            />
            {errors.location && (
              <p className="text-red-600 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="fees"
              className="block text-sm font-medium text-gray-700"
            >
              Consultation Fee (₹)*
            </label>
            <input
              id="fees"
              type="number"
              {...register("fees", {
                required: "Fee is required",
                min: {
                  value: 0,
                  message: "Fee cannot be negative",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="500"
            />
            {errors.fees && (
              <p className="text-red-600 text-sm">{errors.fees.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Languages*
            </label>
            <input
              id="language"
              {...register("language", {
                required: "Languages are required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="English, Hindi, Marathi"
            />
            {errors.language && (
              <p className="text-red-600 text-sm">{errors.language.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Submitting...
              </span>
            ) : (
              "Add Doctor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
