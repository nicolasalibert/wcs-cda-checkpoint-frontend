import { useGetCountriesQuery } from "@/lib/graphql/generated/graphql-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddCountry } from "@/components/AddCountry";

export function CountryList() {
  const { data, loading, error } = useGetCountriesQuery();
  const [open, setOpen] = useState(false);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600">Error: {error.message}</p>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Countries
        </h1>
        <AddCountry open={open} onOpenChange={setOpen} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.countries.map((country) => (
          <Link
            key={country.code}
            to={`/country/${country.code}`}
            className="block group"
          >
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-500">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{country.emoji}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    {country.name}
                  </h2>
                  <p className="text-sm text-gray-500">{country.code}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
