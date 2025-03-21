import { useState, Fragment } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const paymentStatusColors = {
  awaiting_verification: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

const paymentStatusIcons = {
  awaiting_verification: ClockIcon,
  verified: CheckCircleIcon,
  declined: XCircleIcon,
};

interface Payment {
  id: number;
  invoiceId: number;
  worker: string;
  employer: string;
  amount: number;
  date: string;
  paymentProof: string;
  status: "awaiting_verification" | "verified" | "declined";
  submittedAt: string;
  verifiedAt?: string;
  declineReason?: string;
}

// Sample payments data
const payments: Payment[] = [
  {
    id: 1,
    invoiceId: 123,
    worker: "John Doe",
    employer: "Tech Corp",
    amount: 2500,
    date: "2024-03-15",
    paymentProof: "proof_url_1.jpg",
    status: "awaiting_verification",
    submittedAt: "2024-03-15 10:30:00",
  },
  {
    id: 2,
    invoiceId: 124,
    worker: "Jane Smith",
    employer: "Digital Solutions",
    amount: 1800,
    date: "2024-03-14",
    paymentProof: "proof_url_2.jpg",
    status: "verified",
    submittedAt: "2024-03-14 15:30:00",
    verifiedAt: "2024-03-14 16:45:00",
  },
  {
    id: 3,
    invoiceId: 125,
    worker: "Mike Johnson",
    employer: "Creative Agency",
    amount: 3200,
    date: "2024-03-13",
    paymentProof: "proof_url_3.jpg",
    status: "declined",
    submittedAt: "2024-03-13 09:15:00",
    declineReason: "Invalid payment proof provided",
  },
];

interface ViewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  payment: Payment | null;
}

function ViewPaymentModal({ open, setOpen, payment }: ViewModalProps) {
  if (!payment) return null;

  const PaymentStatusIcon = paymentStatusIcons[payment.status];

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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <PaymentStatusIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Payment Details
                    </Dialog.Title>
                    <div className="mt-4">
                      <div className="text-left px-4 sm:px-0">
                        <dl className="divide-y divide-gray-100">
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Invoice ID
                              </dt>
                              <dd className="col-span-2 text-sm text-gray-900">
                                #{payment.invoiceId}
                              </dd>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Worker
                              </dt>
                              <dd className="col-span-2 text-sm text-gray-900">
                                {payment.worker}
                              </dd>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Employer
                              </dt>
                              <dd className="col-span-2 text-sm text-gray-900">
                                {payment.employer}
                              </dd>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Amount
                              </dt>
                              <dd className="col-span-2 text-sm text-gray-900">
                                ${payment.amount.toLocaleString()}
                              </dd>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Date
                              </dt>
                              <dd className="col-span-2 text-sm text-gray-900">
                                {payment.date}
                              </dd>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Status
                              </dt>
                              <dd className="col-span-2">
                                <span
                                  className={classNames(
                                    paymentStatusColors[payment.status],
                                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                                  )}
                                >
                                  <PaymentStatusIcon className="mr-1 h-4 w-4" />
                                  {payment.status
                                    .split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}
                                </span>
                              </dd>
                            </div>
                          </div>
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Submitted At
                              </dt>
                              <dd className="col-span-2 text-sm text-gray-900">
                                {payment.submittedAt}
                              </dd>
                            </div>
                          </div>
                          {payment.verifiedAt && (
                            <div className="py-4">
                              <div className="grid grid-cols-3 gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Verified At
                                </dt>
                                <dd className="col-span-2 text-sm text-gray-900">
                                  {payment.verifiedAt}
                                </dd>
                              </div>
                            </div>
                          )}
                          {payment.declineReason && (
                            <div className="py-4">
                              <div className="grid grid-cols-3 gap-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Decline Reason
                                </dt>
                                <dd className="col-span-2 text-sm text-red-600">
                                  {payment.declineReason}
                                </dd>
                              </div>
                            </div>
                          )}
                          <div className="py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Payment Proof
                              </dt>
                              <dd className="col-span-2">
                                <img
                                  src={payment.paymentProof}
                                  alt="Payment proof"
                                  className="h-48 w-full object-cover rounded-lg"
                                />
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {payment.status === "awaiting_verification" && (
                    <>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:col-start-2"
                        onClick={() => setOpen(false)}
                      >
                        Verify Payment
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpen(false)}
                      >
                        Decline Payment
                      </button>
                    </>
                  )}
                  {payment.status !== "awaiting_verification" && (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:col-span-2"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function PaymentVerification() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const filteredPayments = payments.filter((payment) => {
    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;
    const matchesSearch =
      payment.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.employer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Payment Verification
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Verify and manage payment submissions from employers
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <select
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="awaiting_verification">Awaiting Verification</option>
            <option value="verified">Verified</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Invoice ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Worker
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Employer
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
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
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
                  {filteredPayments.map((payment) => {
                    const StatusIcon = paymentStatusIcons[payment.status];
                    return (
                      <tr key={payment.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          #{payment.invoiceId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {payment.worker}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {payment.employer}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${payment.amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {payment.date}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={classNames(
                              paymentStatusColors[payment.status],
                              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                            )}
                          >
                            <StatusIcon className="mr-1 h-4 w-4" />
                            {payment.status
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setViewModalOpen(true);
                            }}
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ViewPaymentModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        payment={selectedPayment}
      />
    </div>
  );
}
