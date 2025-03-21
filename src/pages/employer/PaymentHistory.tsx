import { useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

const payments = [
  {
    id: 1,
    worker: "John Doe",
    amount: 2500,
    invoiceDate: "2024-03-15",
    paymentDate: "2024-03-16",
    invoiceId: "INV-2024-001",
    description: "Frontend Development - March Sprint 1",
    bankDetails: {
      accountName: "John Doe",
      accountNumber: "****3456",
      bankName: "Chase Bank",
      routingNumber: "****4567",
    },
    status: "completed",
  },
  {
    id: 2,
    worker: "Jane Smith",
    amount: 1800,
    invoiceDate: "2024-03-14",
    paymentDate: null,
    invoiceId: "INV-2024-002",
    description: "UI/UX Design Workshop",
    bankDetails: {
      accountName: "Jane Smith",
      accountNumber: "****7890",
      bankName: "Bank of America",
      routingNumber: "****2345",
    },
    status: "pending_confirmation",
  },
  {
    id: 3,
    worker: "Mike Johnson",
    amount: 3200,
    invoiceDate: "2024-03-13",
    paymentDate: "2024-03-14",
    invoiceId: "INV-2024-003",
    description: "Backend API Development",
    bankDetails: {
      accountName: "Mike Johnson",
      accountNumber: "****1234",
      bankName: "Wells Fargo",
      routingNumber: "****7890",
    },
    status: "completed",
  },
];

export default function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bankDetails.bankName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || payment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Payment History
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your payments and confirm them by scanning QR codes after bank
            transfer.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0">
          <div className="text-sm font-medium text-gray-900">
            Total Amount: ${totalAmount.toLocaleString()}
          </div>
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
            <option value="completed">Completed</option>
            <option value="pending_confirmation">Pending Confirmation</option>
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
                      Invoice ID
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
                      Account Number
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
                      Dates
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {payment.worker}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {payment.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {payment.invoiceId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {payment.bankDetails.accountNumber}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({payment.bankDetails.bankName})
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center">
                          {payment.status === "completed" ? (
                            <CheckCircleIcon className="mr-1.5 h-5 w-5 text-green-500" />
                          ) : (
                            <ClockIcon className="mr-1.5 h-5 w-5 text-yellow-500" />
                          )}
                          <span
                            className={`${
                              payment.status === "completed"
                                ? "text-green-700"
                                : "text-yellow-700"
                            }`}
                          >
                            {payment.status === "completed"
                              ? "Completed"
                              : "Pending Confirmation"}
                          </span>
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col gap-1">
                          <div>
                            <span className="text-xs text-gray-400">
                              Invoice:
                            </span>{" "}
                            {payment.invoiceDate}
                          </div>
                          {payment.paymentDate && (
                            <div>
                              <span className="text-xs text-gray-400">
                                Paid:
                              </span>{" "}
                              {payment.paymentDate}
                            </div>
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
  );
}
