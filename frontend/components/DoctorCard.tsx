import type { Doctor } from "@/types/Doctor";
import { Mars, Venus, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

type DoctorCardProps = Doctor;

export default function DoctorCard({
  name,
  specialization,
  experience,
  location,
  image_url,
  fees,
  language,
  gender,
}: DoctorCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="p-4">
        <div className="flex items-start space-x-4">
          <div className="relative h-20 w-20  overflow-hidden bg-gray-100 flex-shrink-0">
            {image_url ? (
              <Image
                src={image_url || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 text-xl font-bold">
                {name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">
              Dr. {name}
            </h2>
            <p className="text-sm text-gray-600">{specialization}</p>

            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex mt-1 ">
              {gender === "male" ? (
                <Mars className="h-4 w-4 text-blue-500" />
              ) : (
                <Venus className="h-4 w-4 text-pink-500" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-2   border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <span>{experience} years exp</span>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <p>
              Languages:{" "}
              {language
                .split(",")
                .map((lang) => lang.trim())
                .map(
                  (lang) =>
                    lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
                )
                .join(", ")}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Fees</span>
              <p className="font-semibold text-gray-900">₹{fees}</p>
            </div>

            <div className="flex space-x-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: name,
            medicalSpecialty: specialization,
            gender: gender,
            workLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: location,
              },
            },
            priceRange: `₹${fees}`,
            availableLanguage: language,
          }),
        }}
      />
    </article>
  );
}
