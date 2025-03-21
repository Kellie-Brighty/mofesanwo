import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

interface Employer {
  id: number;
  name: string;
  logo: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  totalPayments: number;
  lastPayment: string;
  projectCount: number;
}

interface ViewEmployerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  employer: Employer | null;
}

const statusColors = {
  active: "bg-green-50 text-green-700 ring-green-600/20",
  inactive: "bg-gray-50 text-gray-600 ring-gray-500/10",
};

export default function ViewEmployerModal({
  open,
  setOpen,
  employer,
}: ViewEmployerModalProps) {
  if (!employer) return null;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:my-8 sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <BuildingOfficeIcon
                      className="h-6 w-6 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Employer Details
                    </Dialog.Title>
                    <div className="mt-4">
                      <div className="text-left px-4 sm:px-0">
                        <dl className="divide-y divide-gray-100">
                          {/* Company Info Section */}
                          <div className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {employer.logo}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-base font-semibold text-gray-900">
                                  {employer.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {employer.industry}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="py-4 space-y-3">
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

                          {/* Statistics */}
                          <div className="py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  Total Payments
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">
                                  ${employer.totalPayments.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  Last Payment
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">
                                  {employer.lastPayment}
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  Projects
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">
                                  {employer.projectCount}
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  Status
                                </div>
                                <p className="mt-1">
                                  <span
                                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                      statusColors[
                                        employer.status as keyof typeof statusColors
                                      ]
                                    }`}
                                  >
                                    {employer.status.charAt(0).toUpperCase() +
                                      employer.status.slice(1)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
