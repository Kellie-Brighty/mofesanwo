import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Balance",
    value: "$12,450.80",
    change: "+2.5%",
    changeType: "positive",
  },
  {
    name: "Pending Invoices",
    value: "3",
    change: "2 new",
    changeType: "neutral",
  },
  {
    name: "Total Paid",
    value: "$48,925.40",
    change: "+18.2%",
    changeType: "positive",
  },
  {
    name: "Active Clients",
    value: "8",
    change: "+2",
    changeType: "positive",
  },
];

const recentInvoices = [
  {
    id: 1,
    client: "Acme Corp",
    amount: "$2,500.00",
    status: "Pending",
    date: "2024-02-15",
  },
  {
    id: 2,
    client: "Globex Inc",
    amount: "$1,800.00",
    status: "Paid",
    date: "2024-02-14",
  },
  {
    id: 3,
    client: "Stark Industries",
    amount: "$3,200.00",
    status: "Pending",
    date: "2024-02-13",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500">
                  {stat.name}
                </div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">
                  {stat.value}
                </div>
              </div>
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
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="mt-8">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900">Recent Invoices</h2>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {invoice.client}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.amount}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
