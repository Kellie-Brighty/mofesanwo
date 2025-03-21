import { useState } from "react";
import {
  BanknotesIcon,
  ArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Sample transaction data
const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 2500.0,
    description: "Payment from Tech Corp",
    date: "2024-03-15",
    status: "completed",
    reference: "TRX-123456",
  },
  {
    id: 2,
    type: "debit",
    amount: 1000.0,
    description: "Withdrawal to Local Bank",
    date: "2024-03-14",
    status: "completed",
    reference: "TRX-123457",
  },
  {
    id: 3,
    type: "credit",
    amount: 1800.0,
    description: "Payment from Digital Solutions",
    date: "2024-03-13",
    status: "pending",
    reference: "TRX-123458",
  },
];

const statusColors = {
  completed: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  failed: "bg-red-50 text-red-700",
};

const statusIcons = {
  completed: CheckCircleIcon,
  pending: ClockIcon,
  failed: XCircleIcon,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Wallet() {
  const [balance] = useState(3300.0);
  const [accountNumber] = useState("1234567890");
  const [bankName] = useState("Providus Bank");
  const [accountName] = useState("John Doe");
  const [swiftCode] = useState("PRVUNGL");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Wallet Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Virtual Wallet</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your USD virtual account and track your transactions
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Available Balance
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${balance.toLocaleString()}
            </p>
          </div>
          <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
            <BanknotesIcon className="h-6 w-6 text-primary-600" />
          </div>
        </div>

        {/* Account Details */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <dl className="divide-y divide-gray-100">
            <div className="py-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
              <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
              <dd className="text-sm text-gray-900 sm:text-right">
                {bankName}
              </dd>
            </div>
            <div className="py-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
              <dt className="text-sm font-medium text-gray-500">
                Account Name
              </dt>
              <dd className="text-sm text-gray-900 sm:text-right">
                {accountName}
              </dd>
            </div>
            <div className="py-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
              <dt className="text-sm font-medium text-gray-500">
                Account Number
              </dt>
              <dd className="text-sm text-gray-900 sm:text-right">
                <div className="flex items-center justify-end space-x-2">
                  <span>{accountNumber}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(accountNumber)}
                    className="text-primary-600 hover:text-primary-500 text-xs"
                  >
                    Copy
                  </button>
                </div>
              </dd>
            </div>
            <div className="py-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
              <dt className="text-sm font-medium text-gray-500">Swift Code</dt>
              <dd className="text-sm text-gray-900 sm:text-right">
                {swiftCode}
              </dd>
            </div>
          </dl>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <ArrowUpIcon className="h-4 w-4 mr-2" />
            Withdraw Funds
          </button>
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <ArrowDownIcon className="h-4 w-4 mr-2" />
            Add Funds
          </button> */}
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Transaction History
        </h2>
        <div className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Description
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
                  Reference
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactions.map((transaction) => {
                const StatusIcon =
                  statusIcons[transaction.status as keyof typeof statusIcons];
                return (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                      {transaction.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={
                          transaction.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.type === "credit" ? "+" : "-"}$
                        {transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={classNames(
                          statusColors[
                            transaction.status as keyof typeof statusColors
                          ],
                          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                        )}
                      >
                        <StatusIcon className="mr-1 h-4 w-4" />
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {transaction.reference}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
