import { Fragment, useState } from "react";
import { ArrowUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { QRCodeSVG } from "qrcode.react";
import ViewInvoiceModal from "../components/ViewInvoiceModal";
import { Link } from "react-router-dom";

const stats = [
  {
    name: "Total Payments",
    value: "$48,925.40",
    change: "+18.2%",
  },
  {
    name: "Active Employers",
    value: "8",
    change: "+2",
  },
  {
    name: "Pending Invoices",
    value: "3",
    change: "2 new",
  },
  {
    name: "Verification Status",
    value: "Verified",
    change: "Complete",
  },
];

// Sample employers data
const employers = [
  { id: 1, name: "John Smith", company: "Tech Corp" },
  { id: 2, name: "Sarah Johnson", company: "Digital Solutions" },
  { id: 3, name: "Mike Wilson", company: "Innovation Labs" },
];

interface InvoiceFormData {
  employerId: number;
  description: string;
  hours: number;
  rate: number;
  date: string;
  additionalNotes?: string;
}

const recentInvoices = [
  {
    id: 1,
    employer: "Tech Corp",
    amount: 2500,
    status: "Pending",
    date: "2024-02-15",
    qrCode: "qr-123",
    description: "Frontend Development - March Sprint 1",
    hours: 40,
  },
  {
    id: 2,
    employer: "Digital Solutions",
    amount: 1800,
    status: "Paid",
    date: "2024-02-14",
    qrCode: "qr-124",
    description: "UI/UX Design - Dashboard Revamp",
    hours: 30,
  },
  {
    id: 3,
    employer: "Innovation Labs",
    amount: 3200,
    status: "Pending",
    date: "2024-02-13",
    qrCode: "qr-125",
    description: "Backend API Development",
    hours: 45,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function WorkerDashboard() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [step, setStep] = useState<"form" | "review">("form");
  const [formData, setFormData] = useState<InvoiceFormData>({
    employerId: 0,
    description: "",
    hours: 0,
    rate: 0,
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof recentInvoices)[0] | null
  >(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("review");
  };

  const handleConfirm = async () => {
    // Here you would typically send the data to your backend
    setCreateModalOpen(false);
    setStep("form");
    // Reset form data
    setFormData({
      employerId: 0,
      description: "",
      hours: 0,
      rate: 0,
      date: new Date().toISOString().split("T")[0],
    });
  };

  const selectedEmployer = employers.find(
    (emp) => emp.id === formData.employerId
  );
  const totalAmount = formData.hours * formData.rate;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Worker Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your invoices and track payments from your employers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-gray-400 rounded-md p-1">
                <span className="h-4 w-4 text-white" aria-hidden="true">
                  {stat.name === "Total Payments"
                    ? "💵"
                    : stat.name === "Active Employers"
                    ? "👥"
                    : stat.name === "Pending Invoices"
                    ? "⏳"
                    : "✓"}
                </span>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                <ArrowUpIcon
                  className="h-4 w-4 flex-shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
                {stat.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  {stat.name === "Total Payments"
                    ? "Year to date earnings"
                    : stat.name === "Active Employers"
                    ? "Current employer relationships"
                    : stat.name === "Pending Invoices"
                    ? "Awaiting approval or payment"
                    : "Account verification complete"}
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="mt-8">
        <div className="card">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Invoices
              </h2>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link to="/worker/my-invoices" className="btn btn-primary">
                View All
              </Link>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {invoice.employer}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={classNames(
                              invoice.status === "Paid"
                                ? "bg-green-50 text-green-600"
                                : "bg-yellow-50 text-yellow-600",
                              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                            )}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.date}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                            className="text-primary-600 hover:text-primary-900"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setViewModalOpen(true);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      <Transition.Root show={createModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setCreateModalOpen}>
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
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {step === "form"
                          ? "Create New Invoice"
                          : "Review Invoice"}
                      </Dialog.Title>

                      <div className="mt-4">
                        {step === "review" ? (
                          <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Employer
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {selectedEmployer?.company}
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Description
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {formData.description}
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Hours Worked
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {formData.hours}
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Hourly Rate
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  ${formData.rate}
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Total Amount
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  ${totalAmount}
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Date
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  {formData.date}
                                </dd>
                              </div>
                              {formData.additionalNotes && (
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Additional Notes
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {formData.additionalNotes}
                                  </dd>
                                </div>
                              )}
                            </dl>

                            <div className="mt-6">
                              <div className="flex justify-center">
                                <QRCodeSVG
                                  value={JSON.stringify({
                                    invoiceId: Date.now(),
                                    employer: selectedEmployer?.company,
                                    amount: totalAmount,
                                    date: formData.date,
                                  })}
                                  size={200}
                                  level="H"
                                />
                              </div>
                              <p className="mt-2 text-sm text-gray-500 text-center">
                                This QR code contains your invoice details and
                                will be used for payment verification
                              </p>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                                onClick={() => setStep("form")}
                              >
                                Back to Edit
                              </button>
                              <button
                                type="button"
                                onClick={handleConfirm}
                                className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto"
                              >
                                Submit Invoice
                              </button>
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit} className="mt-4">
                            <div className="space-y-6">
                              <div>
                                <label
                                  htmlFor="employer"
                                  className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                  Select Employer
                                </label>
                                <select
                                  id="employer"
                                  name="employer"
                                  className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                  value={formData.employerId}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      employerId: Number(e.target.value),
                                    })
                                  }
                                  required
                                >
                                  <option value="">Select an employer</option>
                                  {employers.map((employer) => (
                                    <option
                                      key={employer.id}
                                      value={employer.id}
                                    >
                                      {employer.company}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                  Work Description
                                </label>
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                  value={formData.description}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      description: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="hours"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Hours Worked
                                  </label>
                                  <input
                                    type="number"
                                    name="hours"
                                    id="hours"
                                    min="0"
                                    step="0.5"
                                    className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                    value={formData.hours || ""}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        hours: Number(e.target.value),
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="rate"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                  >
                                    Hourly Rate ($)
                                  </label>
                                  <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                      <span className="text-gray-500 sm:text-sm">
                                        $
                                      </span>
                                    </div>
                                    <input
                                      type="number"
                                      name="rate"
                                      id="rate"
                                      min="0"
                                      step="0.01"
                                      className="block w-full rounded-md border-0 py-3 pl-8 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                      value={formData.rate || ""}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          rate: Number(e.target.value),
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="date"
                                  className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                  Invoice Date
                                </label>
                                <input
                                  type="date"
                                  name="date"
                                  id="date"
                                  className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                  value={formData.date}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      date: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="notes"
                                  className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                  Additional Notes (Optional)
                                </label>
                                <textarea
                                  id="notes"
                                  name="notes"
                                  rows={2}
                                  className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm"
                                  value={formData.additionalNotes}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      additionalNotes: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                              <button
                                type="button"
                                onClick={() => setCreateModalOpen(false)}
                                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto"
                              >
                                Review Invoice
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* View Invoice Modal */}
      <ViewInvoiceModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        invoice={selectedInvoice}
      />
    </div>
  );
}
