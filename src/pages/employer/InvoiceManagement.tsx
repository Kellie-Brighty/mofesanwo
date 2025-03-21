import { useState, Fragment, useRef } from "react";
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
import { Dialog, Transition } from "@headlessui/react";

// Utility function for conditional class names
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
  worker: string;
  amount: number;
  date: string;
  status: string;
  description: string;
  hours: number;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    swiftCode: string;
  };
  paymentStatus:
    | "awaiting_approval"
    | "awaiting_payment"
    | "payment_submitted"
    | "payment_verified"
    | "payment_declined";
  paymentProof: string | null;
  workerQrCode: string | null;
  paymentDeclineReason?: string;
  paymentSubmittedAt?: string;
  paymentVerifiedAt?: string;
}

const invoices: Invoice[] = [
  {
    id: 1,
    worker: "John Doe",
    amount: 2500,
    date: "2024-03-15",
    status: "pending",
    paymentStatus: "awaiting_approval",
    description: "Frontend Development - March Sprint 1",
    hours: 40,
    bankDetails: {
      bankName: "Chase Bank",
      accountName: "John Doe",
      accountNumber: "XXXX-XXXX-1234",
      routingNumber: "021000021",
      swiftCode: "CHASUS33",
    },
    workerQrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    paymentProof: null,
  },
  {
    id: 2,
    worker: "Jane Smith",
    amount: 1800,
    date: "2024-03-14",
    status: "approved",
    paymentStatus: "payment_submitted",
    description: "UI/UX Design - Dashboard Revamp",
    hours: 30,
    bankDetails: {
      bankName: "Bank of America",
      accountName: "Jane Smith",
      accountNumber: "XXXX-XXXX-5678",
      routingNumber: "026009593",
      swiftCode: "BOFAUS3N",
    },
    workerQrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    paymentProof: "payment_proof_url.jpg",
    paymentSubmittedAt: "2024-03-14 15:30:00",
  },
  {
    id: 3,
    worker: "Mike Johnson",
    amount: 3200,
    date: "2024-03-13",
    status: "rejected",
    description: "Backend API Development",
    hours: 45,
    bankDetails: {
      bankName: "Wells Fargo",
      accountName: "Mike Johnson",
      accountNumber: "XXXX-XXXX-9012",
      routingNumber: "121000248",
      swiftCode: "WFBIUS6S",
    },
    paymentStatus: "payment_declined",
    workerQrCode: null,
    paymentProof: null,
  },
  {
    id: 4,
    worker: "Sarah Wilson",
    amount: 2800,
    date: "2024-03-16",
    status: "approved",
    paymentStatus: "awaiting_payment",
    description: "Mobile App Development - Sprint 2",
    hours: 35,
    bankDetails: {
      bankName: "Citibank",
      accountName: "Sarah Wilson",
      accountNumber: "XXXX-XXXX-3456",
      routingNumber: "021000089",
      swiftCode: "CITIUS33",
    },
    workerQrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    paymentProof: null,
  },
  {
    id: 5,
    worker: "Alex Brown",
    amount: 4200,
    date: "2024-03-16",
    status: "pending",
    paymentStatus: "awaiting_approval",
    description: "DevOps Infrastructure Setup",
    hours: 50,
    bankDetails: {
      bankName: "TD Bank",
      accountName: "Alex Brown",
      accountNumber: "XXXX-XXXX-7890",
      routingNumber: "054001725",
      swiftCode: "NRTHUS33",
    },
    workerQrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    paymentProof: null,
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  awaiting_payment: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const statusIcons = {
  pending: ClockIcon,
  approved: CheckCircleIcon,
  rejected: XCircleIcon,
};

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  invoice: (typeof invoices)[0] | null;
  type: "view" | "approve" | "reject" | "confirm_payment";
  onConfirm?: () => void;
  setConfirmPaymentModalOpen?: (open: boolean) => void;
}

function ActionModal({
  open,
  setOpen,
  invoice,
  type,
  onConfirm,
  setConfirmPaymentModalOpen,
}: ModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPaymentProof(event.target.files[0]);
    }
  };

  const handleConfirmPayment = () => {
    if (!paymentProof) return;
    setShowQrCode(true);
  };

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
                        : type === "approve"
                        ? "bg-green-100"
                        : type === "confirm_payment"
                        ? "bg-blue-100"
                        : "bg-red-100",
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                    )}
                  >
                    {type === "view" ? (
                      <EyeIcon
                        className="h-6 w-6 text-gray-600"
                        aria-hidden="true"
                      />
                    ) : type === "approve" ? (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    ) : type === "confirm_payment" ? (
                      <DocumentArrowUpIcon
                        className="h-6 w-6 text-blue-600"
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
                        : type === "approve"
                        ? "Approve Invoice"
                        : type === "confirm_payment"
                        ? "Confirm Payment"
                        : "Reject Invoice"}
                    </Dialog.Title>
                    <div className="mt-4">
                      {type === "confirm_payment" ? (
                        <div className="text-left">
                          {!showQrCode ? (
                            <div>
                              <p className="text-sm text-gray-500 mb-4">
                                Please upload proof of payment (image or PDF) to
                                proceed with payment confirmation.
                              </p>
                              <div className="mt-4">
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  accept="image/*,.pdf"
                                  onChange={handleFileChange}
                                />
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                >
                                  <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                  <span className="mt-2 block text-sm font-semibold text-gray-900">
                                    {paymentProof
                                      ? paymentProof.name
                                      : "Upload payment proof"}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="rounded-lg bg-blue-50 p-4 mb-6">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <svg
                                      className="h-5 w-5 text-blue-400"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                      Desktop Device Detected
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                      <p>
                                        For the best experience, please use your
                                        mobile device to scan this QR code. You
                                        can:
                                      </p>
                                      <ul className="list-disc list-inside mt-2">
                                        <li>
                                          Visit this page on your mobile device
                                        </li>
                                        <li>
                                          Or use your mobile phone's camera to
                                          scan this QR code
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500 mb-4">
                                Scan the QR code below using your mobile device
                                to confirm the payment has been made.
                              </p>
                              <div className="mt-4 flex flex-col items-center justify-center">
                                <QrCodeImage src={invoice?.workerQrCode} />
                                <p className="mt-4 text-xs text-gray-500">
                                  Invoice #{invoice?.id} • {invoice?.worker} • $
                                  {invoice?.amount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : type === "view" ? (
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
                                Description
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {invoice?.description}
                              </dd>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Hours
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {invoice?.hours}
                              </dd>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Amount
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                ${invoice?.amount.toLocaleString()}
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
                                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    statusColors[
                                      (invoice?.status ||
                                        "pending") as keyof typeof statusColors
                                    ]
                                  }`}
                                >
                                  {(invoice?.status || "pending")
                                    .charAt(0)
                                    .toUpperCase() +
                                    (invoice?.status || "pending").slice(1)}
                                </span>
                              </dd>
                            </div>

                            {/* Bank Details Section */}
                            <div className="pt-6">
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                                <dt className="text-sm font-medium text-gray-900 col-span-3">
                                  Payment Details
                                </dt>
                              </div>
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Bank Name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {invoice?.bankDetails.bankName}
                                </dd>
                              </div>
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Account Name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {invoice?.bankDetails.accountName}
                                </dd>
                              </div>
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Account Number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {invoice?.bankDetails.accountNumber}
                                </dd>
                              </div>
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Routing Number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {invoice?.bankDetails.routingNumber}
                                </dd>
                              </div>
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
                                <dt className="text-sm font-medium text-gray-500">
                                  Swift Code
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                  {invoice?.bankDetails.swiftCode}
                                </dd>
                              </div>
                            </div>
                          </dl>
                          {invoice?.status === "approved" &&
                            invoice?.paymentStatus === "awaiting_payment" && (
                              <div className="mt-6 flex justify-end">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                  onClick={() => {
                                    setOpen(false);
                                    setConfirmPaymentModalOpen?.(true);
                                  }}
                                >
                                  <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                                  Confirm Payment
                                </button>
                              </div>
                            )}
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500">
                          {type === "approve"
                            ? `Are you sure you want to approve the invoice from ${
                                invoice?.worker
                              } for $${invoice?.amount.toLocaleString()}?`
                            : `Are you sure you want to reject the invoice from ${invoice?.worker}?`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {type === "confirm_payment" && !showQrCode ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                      onClick={handleConfirmPayment}
                      disabled={!paymentProof}
                    >
                      Proceed to QR Code
                    </button>
                  ) : (
                    type !== "view" &&
                    !showQrCode && (
                      <button
                        type="button"
                        className={classNames(
                          type === "approve"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700",
                          "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:col-start-2"
                        )}
                        onClick={() => {
                          onConfirm?.();
                          setOpen(false);
                        }}
                      >
                        {type === "approve"
                          ? "Approve Invoice"
                          : "Reject Invoice"}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      setOpen(false);
                      setPaymentProof(null);
                      setShowQrCode(false);
                    }}
                  >
                    {showQrCode ? "Done" : type === "view" ? "Close" : "Cancel"}
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

// Fix the TypeScript error for the QR code image
const QrCodeImage = ({ src }: { src: string | null | undefined }) => {
  if (!src) return null;
  return (
    <img src={src} alt="Payment confirmation QR code" className="h-64 w-64" />
  );
};

export default function InvoiceManagement() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof invoices)[0] | null
  >(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [confirmPaymentModalOpen, setConfirmPaymentModalOpen] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesStatus =
      filterStatus === "all" || invoice.status === filterStatus;
    const matchesSearch =
      invoice.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (
    invoiceId: number,
    newStatus: "approved" | "rejected"
  ) => {
    // Find and update the invoice in our local state
    // const updatedInvoices = invoices.map((invoice) => {
    //   if (invoice.id === invoiceId) {
    //     return {
    //       ...invoice,
    //       status: newStatus,
    //       paymentStatus:
    //         newStatus === "approved" ? "awaiting_payment" : "payment_declined",
    //     };
    //   }
    //   return invoice;
    // });

    // Update the selected invoice if it's the one being modified
    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice({
        ...selectedInvoice,
        status: newStatus,
        paymentStatus:
          newStatus === "approved" ? "awaiting_payment" : "payment_declined",
      });
    }

    // If approved, automatically open the payment confirmation modal
    if (newStatus === "approved") {
      setTimeout(() => {
        setConfirmPaymentModalOpen(true);
      }, 500);
    }
  };

  const handlePaymentConfirmation = async (invoiceId: number) => {
    // Update the invoice payment status
    // const updatedInvoices = invoices.map((invoice) => {
    //   if (invoice.id === invoiceId) {
    //     return {
    //       ...invoice,
    //       paymentStatus: "payment_submitted",
    //       paymentSubmittedAt: new Date().toISOString(),
    //     };
    //   }
    //   return invoice;
    // });

    // Update the selected invoice if it's the one being modified
    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice({
        ...selectedInvoice,
        paymentStatus: "payment_submitted",
        paymentSubmittedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Invoice Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage invoices submitted by your workers.
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
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
                      Worker
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
                      Status
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
                    const StatusIcon =
                      statusIcons[invoice.status as keyof typeof statusIcons];
                    const PaymentStatusIcon =
                      paymentStatusIcons[invoice.paymentStatus];
                    return (
                      <tr key={invoice.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {invoice.worker}
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
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              statusColors[
                                invoice.status as keyof typeof statusColors
                              ]
                            }`}
                          >
                            <StatusIcon className="mr-1 h-4 w-4" />
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              paymentStatusColors[invoice.paymentStatus]
                            }`}
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
                            {invoice.status === "pending" && (
                              <>
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-semibold text-green-700 shadow-sm ring-1 ring-inset ring-green-700/10 hover:bg-green-100"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setApproveModalOpen(true);
                                  }}
                                >
                                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                                  Approve
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
                            {invoice.status === "approved" &&
                              invoice.paymentStatus === "awaiting_payment" && (
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-sm font-semibold text-primary-700 shadow-sm ring-1 ring-inset ring-primary-700/10 hover:bg-primary-100"
                                  onClick={() => {
                                    setSelectedInvoice(invoice);
                                    setConfirmPaymentModalOpen(true);
                                  }}
                                >
                                  <DocumentArrowUpIcon className="h-4 w-4 mr-1" />
                                  Confirm Payment
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

      {/* Modals */}
      <ActionModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        invoice={selectedInvoice}
        type="view"
        setConfirmPaymentModalOpen={setConfirmPaymentModalOpen}
      />
      <ActionModal
        open={approveModalOpen}
        setOpen={setApproveModalOpen}
        invoice={selectedInvoice}
        type="approve"
        onConfirm={() =>
          selectedInvoice && handleStatusChange(selectedInvoice.id, "approved")
        }
      />
      <ActionModal
        open={rejectModalOpen}
        setOpen={setRejectModalOpen}
        invoice={selectedInvoice}
        type="reject"
        onConfirm={() =>
          selectedInvoice && handleStatusChange(selectedInvoice.id, "rejected")
        }
      />
      <ActionModal
        open={confirmPaymentModalOpen}
        setOpen={setConfirmPaymentModalOpen}
        invoice={selectedInvoice}
        type="confirm_payment"
        onConfirm={() =>
          selectedInvoice && handlePaymentConfirmation(selectedInvoice.id)
        }
      />
    </div>
  );
}
