import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  BanknotesIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

const stats = [
  {
    name: "Total Payments",
    value: "$48,925.40",
    change: "+18.2%",
    changeType: "positive",
    icon: BanknotesIcon,
  },
  {
    name: "Active Workers",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: UserGroupIcon,
  },
  {
    name: "Pending Invoices",
    value: "3",
    change: "2 new",
    changeType: "neutral",
    icon: ClockIcon,
  },
  {
    name: "Verification Status",
    value: "Verified",
    change: "Complete",
    changeType: "positive",
    icon: ShieldCheckIcon,
  },
];

const recentInvoices = [
  {
    id: 1,
    worker: "John Doe",
    amount: "$2,500.00",
    status: "Pending",
    date: "2024-02-15",
  },
  {
    id: 2,
    worker: "Jane Smith",
    amount: "$1,800.00",
    status: "Paid",
    date: "2024-02-14",
  },
  {
    id: 3,
    worker: "Mike Johnson",
    amount: "$3,200.00",
    status: "Pending",
    date: "2024-02-13",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  invoice: (typeof recentInvoices)[0] | null;
  type: "view" | "confirm" | "reject";
}

function ActionModal({ open, setOpen, invoice, type }: ModalProps) {
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
                  <div
                    className={classNames(
                      type === "view"
                        ? "bg-gray-100"
                        : type === "confirm"
                        ? "bg-green-100"
                        : "bg-red-100",
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                    )}
                  >
                    {type === "view" ? (
                      <EyeIcon
                        className="h-6 w-6 text-gray-600"
                        aria-hidden="true"
                      />
                    ) : type === "confirm" ? (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {type === "view"
                        ? "Invoice Details"
                        : type === "confirm"
                        ? "Confirm Payment"
                        : "Reject Invoice"}
                    </Dialog.Title>
                    <div className="mt-4">
                      {type === "view" ? (
                        <div className="text-left px-4 sm:px-0">
                          <dl className="space-y-4 sm:space-y-0 sm:divide-y sm:divide-gray-100">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Worker
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {invoice?.worker}
                              </dd>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Amount
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {invoice?.amount}
                              </dd>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Date
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {invoice?.date}
                              </dd>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Status
                              </dt>
                              <dd className="mt-1 sm:col-span-2 sm:mt-0">
                                <span
                                  className={classNames(
                                    invoice?.status === "Paid"
                                      ? "bg-green-50 text-green-600"
                                      : "bg-yellow-50 text-yellow-600",
                                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                  )}
                                >
                                  {invoice?.status}
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500">
                          {type === "confirm"
                            ? `Are you sure you want to confirm payment of ${invoice?.amount} to ${invoice?.worker}?`
                            : `Are you sure you want to reject the invoice from ${invoice?.worker}?`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {type !== "view" && (
                    <button
                      type="button"
                      className={classNames(
                        type === "confirm"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700",
                        "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:col-start-2"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {type === "confirm"
                        ? "Confirm Payment"
                        : "Reject Invoice"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                  >
                    {type === "view" ? "Close" : "Cancel"}
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

export default function EmployerDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof recentInvoices)[0] | null
  >(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Employer Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your remote workers and handle payments efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div
                  className={classNames(
                    stat.changeType === "positive"
                      ? "bg-green-50"
                      : stat.changeType === "negative"
                      ? "bg-red-50"
                      : "bg-gray-50",
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                  )}
                >
                  {stat.changeType === "positive" ? (
                    <ArrowUpIcon
                      className="h-3 w-3 text-green-600"
                      aria-hidden="true"
                    />
                  ) : stat.changeType === "negative" ? (
                    <ArrowDownIcon
                      className="h-3 w-3 text-red-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span
                    className={classNames(
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600",
                      "ml-1"
                    )}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Invoices
            </h2>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link to="/dashboard/employer/invoices" className="btn btn-primary">
              View All
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Worker
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
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {invoice.worker}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                          {invoice.amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-sm">
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
                        <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                          {invoice.date}
                        </td>
                        <td className="relative whitespace-nowrap py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setViewModalOpen(true);
                              }}
                            >
                              <EyeIcon className="h-4 w-4 mr-1" />
                              View
                            </button>
                            {invoice.status === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-semibold text-green-700 shadow-sm ring-1 ring-inset ring-green-700/10 hover:bg-green-100"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setConfirmModalOpen(true);
                                  }}
                                >
                                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-700/10 hover:bg-red-100"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setRejectModalOpen(true);
                                  }}
                                >
                                  <XCircleIcon className="h-4 w-4 mr-1" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
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

      {/* Modals */}
      <ActionModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        invoice={selectedInvoice}
        type="view"
      />
      <ActionModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        invoice={selectedInvoice}
        type="confirm"
      />
      <ActionModal
        open={rejectModalOpen}
        setOpen={setRejectModalOpen}
        invoice={selectedInvoice}
        type="reject"
      />
    </div>
  );
}
