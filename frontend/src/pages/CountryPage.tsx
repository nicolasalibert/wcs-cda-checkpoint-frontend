import { useGetCountryQuery } from "@/lib/graphql/generated/graphql-types";
import { Link, useParams } from "react-router-dom";

export const CountryPage = () => {
  const { code } = useParams();
  const { data, loading, error } = useGetCountryQuery({
    variables: { code: code! },
  });
  const country = data?.country;

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
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Countries
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-center mb-8">
          <span className="text-6xl mr-4">{country?.emoji}</span>
          <h1 className="text-4xl font-bold text-gray-900">{country?.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-sm font-medium text-gray-500">
                Country Code
              </h2>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {country?.code}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-sm font-medium text-gray-500">Continent</h2>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {country?.continent?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg h-fit">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Quick Info
            </h2>
            <p className="text-gray-700">
              {country?.emoji} {country?.name} is a country located in{" "}
              {country?.continent?.name}. Its official country code is{" "}
              {country?.code}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
