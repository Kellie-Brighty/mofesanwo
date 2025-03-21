import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  DocumentArrowUpIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import ViewInvoiceModal from "../../components/ViewInvoiceModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const paymentStatusColors = {
  awaiting_approval: "bg-yellow-100 text-yellow-800",
  awaiting_payment: "bg-blue-100 text-blue-800",
  payment_submitted: "bg-purple-100 text-purple-800",
  payment_verified: "bg-green-100 text-green-800",
  payment_declined: "bg-red-100 text-red-800",
};

const paymentStatusIcons = {
  awaiting_approval: ClockIcon,
  awaiting_payment: DocumentArrowUpIcon,
  payment_submitted: QrCodeIcon,
  payment_verified: CheckCircleIcon,
  payment_declined: XCircleIcon,
};

interface Invoice {
  id: number;
  employer: string;
  amount: number;
  date: string;
  status: string;
  description: string;
  hours: number;
  paymentStatus:
    | "awaiting_approval"
    | "awaiting_payment"
    | "payment_submitted"
    | "payment_verified"
    | "payment_declined";
  qrCode: string | null;
  paymentDeclineReason?: string;
  paymentSubmittedAt?: string;
  paymentVerifiedAt?: string;
}

const invoices: Invoice[] = [
  {
    id: 1,
    employer: "Tech Corp",
    amount: 2500,
    date: "2024-03-15",
    status: "pending",
    paymentStatus: "awaiting_approval",
    description: "Frontend Development - March Sprint 1",
    hours: 40,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
  },
  {
    id: 2,
    employer: "Digital Solutions",
    amount: 1800,
    date: "2024-03-14",
    status: "approved",
    paymentStatus: "payment_submitted",
    description: "UI/UX Design - Dashboard Revamp",
    hours: 30,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    paymentSubmittedAt: "2024-03-14 15:30:00",
  },
  {
    id: 3,
    employer: "Innovation Labs",
    amount: 3200,
    date: "2024-03-13",
    status: "rejected",
    description: "Backend API Development",
    hours: 45,
    paymentStatus: "payment_declined",
    qrCode: null,
    paymentDeclineReason: "Hours exceed project budget",
  },
  {
    id: 4,
    employer: "Tech Corp",
    amount: 2800,
    date: "2024-03-16",
    status: "approved",
    paymentStatus: "payment_verified",
    description: "Mobile App Development - Sprint 2",
    hours: 35,
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    paymentVerifiedAt: "2024-03-16 10:15:00",
  },
];

export default function MyInvoices() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus =
      filterStatus === "all" || invoice.paymentStatus === filterStatus;
    const matchesSearch =
      invoice.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">My Invoices</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all your invoices and payment statuses.
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
            placeholder="Search invoices..."
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
            <option value="awaiting_approval">Awaiting Approval</option>
            <option value="awaiting_payment">Awaiting Payment</option>
            <option value="payment_submitted">Payment Submitted</option>
            <option value="payment_verified">Payment Verified</option>
            <option value="payment_declined">Payment Declined</option>
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
                      Employer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Hours
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
                      Payment Status
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
                  {filteredInvoices.map((invoice) => {
                    const PaymentStatusIcon =
                      paymentStatusIcons[invoice.paymentStatus];
                    return (
                      <tr key={invoice.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {invoice.employer}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.hours}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.date}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={classNames(
                              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                              paymentStatusColors[invoice.paymentStatus]
                            )}
                          >
                            <PaymentStatusIcon className="mr-1 h-4 w-4" />
                            {invoice.paymentStatus
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </span>
                          {invoice.paymentStatus === "payment_declined" && (
                            <span className="block mt-1 text-xs text-red-600">
                              {invoice.paymentDeclineReason}
                            </span>
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
                            {invoice.paymentStatus === "awaiting_payment" && (
                              <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-sm font-semibold text-primary-700 shadow-sm ring-1 ring-inset ring-primary-700/10 hover:bg-primary-100"
                              >
                                <QrCodeIcon className="h-4 w-4 mr-1" />
                                Show QR
                              </button>
                            )}
                          </div>
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

      <ViewInvoiceModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        invoice={selectedInvoice}
      />
    </div>
  );
}
