import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  UserGroupIcon,
  QrCodeIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const employerNavigation = [
  { name: "Dashboard", href: "/dashboard/employer", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/employer/invoices",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Payment History",
    href: "/dashboard/employer/payments",
    icon: ClockIcon,
  },
  { name: "Team", href: "/dashboard/employer/workers", icon: UserGroupIcon },
  { name: "QR Scanner", href: "/dashboard/employer/scanner", icon: QrCodeIcon },
];

const workerNavigation = [
  { name: "Dashboard", href: "/worker/dashboard", icon: HomeIcon },
  {
    name: "My Invoices",
    href: "/worker/my-invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Wallet", href: "/worker/wallet", icon: BanknotesIcon },
  { name: "Employers", href: "/worker/employers", icon: BuildingOfficeIcon },
  // { name: "Settings", href: "/worker/settings", icon: Cog6ToothIcon },
  // { name: "My QR Code", href: "/worker/qr-code", icon: QrCodeIcon },
];

const adminNavigation = [
  {
    name: "Payment Verification",
    href: "/admin/payment-verification",
    icon: ShieldCheckIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const location = useLocation();
  const isEmployer = location.pathname.includes("/dashboard/employer");
  const isAdmin = location.pathname.includes("/admin");
  const navigation = isAdmin
    ? adminNavigation
    : isEmployer
    ? employerNavigation
    : workerNavigation;

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link to="/" className="heading-gradient text-2xl">
          Sanwo
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-50 text-primary-600"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        location.pathname === item.href
                          ? "text-primary-600"
                          : "text-gray-400 group-hover:text-primary-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
