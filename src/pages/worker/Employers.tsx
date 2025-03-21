import { useState } from "react";
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import ViewEmployerModal from "../../components/ViewEmployerModal";

// Sample employers data
const employers = [
  {
    id: 1,
    name: "Tech Corp",
    logo: "TC",
    industry: "Technology",
    location: "San Francisco, CA",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    totalPayments: 25000,
    lastPayment: "2024-03-15",
    projectCount: 5,
  },
  {
    id: 2,
    name: "Digital Solutions",
    logo: "DS",
    industry: "Software Development",
    location: "New York, NY",
    email: "hr@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    totalPayments: 18000,
    lastPayment: "2024-03-14",
    projectCount: 3,
  },
  {
    id: 3,
    name: "Creative Agency",
    logo: "CA",
    industry: "Design",
    location: "Los Angeles, CA",
    email: "info@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    totalPayments: 12000,
    lastPayment: "2024-02-28",
    projectCount: 2,
  },
];

const statusColors = {
  active: "bg-green-50 text-green-700 ring-green-600/20",
  inactive: "bg-gray-50 text-gray-600 ring-gray-500/10",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Employers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState<
    (typeof employers)[0] | null
  >(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const filteredEmployers = employers.filter((employer) =>
    employer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Employers</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your employer relationships and view payment history
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-lg mb-8">
        <label htmlFor="search" className="sr-only">
          Search employers
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <BuildingOfficeIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Search employers..."
          />
        </div>
      </div>

      {/* Employers Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployers.map((employer) => (
          <div
            key={employer.id}
            className="relative flex flex-col bg-white shadow rounded-lg"
          >
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {employer.logo}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {employer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{employer.industry}</p>
                </div>
              </div>

              <div className="mt-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Total Payments
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${employer.totalPayments.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Last Payment
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {employer.lastPayment}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Projects
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {employer.projectCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1">
                      <span
                        className={classNames(
                          statusColors[
                            employer.status as keyof typeof statusColors
                          ],
                          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        {employer.status.charAt(0).toUpperCase() +
                          employer.status.slice(1)}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  {employer.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  {employer.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  {employer.phone}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
              <button
                type="button"
                className="w-full text-center text-sm font-semibold text-primary-600 hover:text-primary-500"
                onClick={() => {
                  setSelectedEmployer(employer);
                  setViewModalOpen(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Employer Modal */}
      <ViewEmployerModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        employer={selectedEmployer}
      />
    </div>
  );
}
